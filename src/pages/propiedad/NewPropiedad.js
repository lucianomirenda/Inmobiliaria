import React, {useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/styles/EditPropiedades.css'; 
import '../../assets/styles/Mensajes.css';
import { fetchLocalidades, fetchTiposPropiedad } from '../../utils/api';


const NewPropiedad = () => {

const navigate = useNavigate();
const { id } = useParams();
const [localidades,setLocalidades] = useState([]);
const [tiposPropiedad,setTipoPropiedad] = useState([]);
const [localidadId,setLocalidadId] = useState('');
const [tipoPropiedadId,setTipoPropiedadId] = useState('');
const [mostrarError, setMostrarError] = useState(false);
const [mostrarExito, setMostrarExito] = useState(false);
const [exito, setExito] = useState(false);
const [error, setError] = useState(null);


useEffect(()=>{
    const cargarDatos = async () => {
        try {
            const localidadesData = await fetchLocalidades();
            setLocalidades(localidadesData);

            const tiposPropiedadData = await fetchTiposPropiedad();
            setTipoPropiedad(tiposPropiedadData)

        } catch (error){
            console.log(error);
        }
    };

    cargarDatos();

},[id]);

function mostrarErrorOn() {
    setMostrarError(true);
    setTimeout(() => {
        setMostrarError(false);
        setError(null);
        setExito(null);
    }, 5000);
}

function mostrarExitoOn(){
    setMostrarExito(true);
    setTimeout(() => {
        setMostrarExito(false);
        setError(null);
        setExito(null);
    }, 5000);
}

function devolverMensajeError(errores){
    let mensajesError = ''; 
    for (const campo in errores) {
        const mensajeError = errores[campo];
        mensajesError += `${mensajeError}.\n`; 
    }
    return mensajesError;
}

const handleSubmit = async(event) => {

    const formDataToObject = (formData) => {
        const obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    };

    event.preventDefault();

    const formData = new FormData(event.target);
    const dataToSend = formDataToObject(formData);
    dataToSend.localidad_id = localidadId; 
    dataToSend.tipo_propiedad_id = tipoPropiedadId;
    const domicilio = formData.get('domicilio');
    const cantidadHabitaciones = formData.get('cantidad_habitaciones');
    const cantidadBanios = formData.get('cantidad_banios');
    const cantidadHuespedes = formData.get('cantidad_huespedes');
    const fechaInicioDisponibilidad = formData.get('fecha_inicio_disponibilidad');
    const cantidadDias = formData.get('cantidad_dias');
    const valorNoche = formData.get('valor_noche');
    const imagen = formData.get('imagen');
    
    if (imagen.name != "") {
        const nombreImagen = imagen.name.split('.')[0];
        const extensionImagen = imagen.name.split('.').pop(); 

        dataToSend.imagen = nombreImagen;
        dataToSend.tipo_imagen = extensionImagen;
    } else {
        delete dataToSend.imagen;
        delete dataToSend.tipo_imagen;
    }


    if (domicilio.trim() === '') { 
        setError('El domicilio es obligatorio.');
        mostrarErrorOn();
        return; 
    }

    if (localidadId === '') { 
        setError('Debes seleccionar una localidad.');
        mostrarErrorOn();
        return; 
    }

    if (tipoPropiedadId === '') { 
        setError('Debes seleccionar un tipo de propiedad.');
        mostrarErrorOn();
        return; 
    }

    if (cantidadHabitaciones !== ''){
        if(!/^\d+$/.test(cantidadHabitaciones)) {
            setError('La cantidad de huéspedes debe ser un número entero.');
            mostrarErrorOn();
            return;
        }
    } else {
        delete dataToSend.cantidad_habitaciones;
    }

    if (cantidadHuespedes.trim() === ''){
        setError('La cantidad de huéspedes no puede estar vacío.');
        mostrarErrorOn();
        return;
    } else if(!/^\d+$/.test(cantidadHuespedes)) {
        setError('La cantidad de huéspedes debe ser un número entero.');
        mostrarErrorOn();
        return;
    }


    if (cantidadBanios !==  ''){
        if(!/^\d+$/.test(cantidadBanios)) {
        setError('La cantidad de baños debe ser un número entero.');
        mostrarErrorOn();
        return;
        }
    } else {
        delete dataToSend.cantidad_banios;
    }
    
    if (fechaInicioDisponibilidad.trim() === '') {
        setError('La fecha de inicio de disponibilidad es obligatoria.');
        mostrarErrorOn();
        return;
    }

    if (cantidadDias.trim() === '') {
        setError('La cantidad de días no puede estar vacío.');
        mostrarErrorOn();
        return;
        } else if (!/^\d+$/.test(cantidadDias)) {
        setError('La cantidad de días debe ser un número entero.');
        mostrarErrorOn();
        return;
        }
    
    if (valorNoche.trim() === '') {
        setError('El valor por noche no puede estar vacío.');
        mostrarErrorOn();
        return;
    } else if (!/^\d+$/.test(valorNoche)) {
        setError('El valor por noche debe ser un número entero.');
        mostrarErrorOn();
        return;
    }

    try {

        const response = await fetch (`http://localhost/propiedades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend)
    });

        const data = await response.json();

        if (!response.ok) {
          setError(devolverMensajeError(data.message.error))
          console.log(data.message.error);
          throw new Error('Error en la respuesta de la API');
        }

        setExito(data.message);
        mostrarExitoOn();

    } catch(error){
        console.log('error ', error);
        mostrarErrorOn();
    }
}


return (
    <div className='edit-propiedad-page'>
        <h1>Crear una Nueva Propiedad</h1>
        {error && mostrarError && (
            <p className="mensaje-error">Error: {error}</p>
        )}
        
        {mostrarExito && (
            <p className="mensaje-exito">
                {exito}
            </p>
        )} 

        <form onSubmit={handleSubmit} encType="multipart/form-data">

            <div>
                <label htmlFor='domicilio'>Domicilio: </label>
                <input type="text" id="domicilio" name="domicilio" defaultValue={''}></input>
            </div>
            
            <div>
                <label htmlFor='localidad_id'>Localidad: </label>
                <select id ="localidad_id" value={localidadId}  onChange={(e) => setLocalidadId(e.target.value)}>
                 <option value="">Selecciona una localidad</option>
                    {localidades.map(localidad => (
                        <option key={localidad.id} value={localidad.id}>
                            {localidad.nombre}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor='cantidad_habitaciones'>Cantidad de Habitaciones:</label>
                <input type="number" id="cantidad_habitaciones"
                name="cantidad_habitaciones" />
            </div>

            <div>
                <label htmlFor='cantidad_banios'>Cantidad de baños:</label>
                <input type="number" id="cantidad_banios" name="cantidad_banios"/>
            </div>
            
            <div>
                <label htmlFor='cochera'>Cochera:</label>
                <input type='checkbox' htmlFor="cochera" id='cochera' name='cochera' />
            </div>
            
            <div>
                <label htmlFor="cantidad_huespedes">Cantidad de huéspedes:</label>
                <input type="number" id="cantidad_huespedes" name="cantidad_huespedes" />
            </div>

            <div>
                <label htmlFor="fecha_inicio_disponibilidad">Fecha de inicio de disponibilidad:</label>
                <input type="date" id="fecha_inicio_disponibilidad" name="fecha_inicio_disponibilidad"/>
            </div>

            <div>
                <label htmlFor="cantidad_dias">Cantidad de días:</label>
                <input type="number" id="cantidad_dias" name="cantidad_dias"  />
            </div>

            <div>
                <label htmlFor="disponible">Disponible:</label>
                <input type="checkbox" id="disponible" name="disponible" defaultChecked={true} />
            </div>

            <div>
                <label htmlFor="valor_noche">Valor por noche:</label>
                <input type="number" id="valor_noche" name="valor_noche"  />
            </div>

            
            <div>
                <label htmlFor="tipo_propiedad_id">Tipo de propiedad:</label>
                <select id="tipo_propiedad_id" value={tipoPropiedadId}   onChange={(e) => setTipoPropiedadId(e.target.value)} >
                <option value="">Selecciona un tipo de propiedad</option>
                    {tiposPropiedad.map(tipo => (
                    <option key={tipo.id} value={tipo.id}>
                        {tipo.nombre}
                    </option>
                    ))}
                </select>
            </div>
            
            <div>
                <div>
                    <label htmlFor="imagen">Ingrese una imagen:</label> {/* Etiqueta para el campo de imagen */}
                    <input type="file" name="imagen" id="imagen" /> 
                </div>
            </div>
            <button type='submit'>Guardar</button>
            <button type="button" onClick={() => navigate(-1)}>Volver</button>
        </form>

    </div>
);
};

export default NewPropiedad;