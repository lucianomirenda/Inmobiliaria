import React, {useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './PropiedadEditPage.css'; 

import { fetchLocalidades, fetchTiposPropiedad } from 'D:/PHP/inmobiliaria/src/utils/api.js';


const NewPropiedadPage = () => {

    const [filtros, setFiltros] = useState({
        disponible: true,
        localidad_id: '',
        fecha_inicio_disponibilidad: '',
        cantidad_huespedes: '',
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const [propiedad, setPropiedad] = useState(null);
    const [localidades,setLocalidades] = useState([]);
    const [tiposPropiedad,setTipoPropiedad] = useState([]);
    
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

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

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

        const domicilio = formData.get('domicilio');
        const localidadId = formData.get('localidad_id');
        const cantidadHabitaciones = formData.get('cantidad_habitaciones');
        const cantidadBanios = formData.get('cantidad_banios');
        const cantidadHuespedes = formData.get('cantidad_huespedes');
        const fechaInicioDisponibilidad = formData.get('fecha_inicio_disponibilidad');
        const cantidadDias = formData.get('cantidad_dias');
        const valorNoche = formData.get('valor_noche');
        const imagen = formData.get('imagen')


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

        if (cantidadHabitaciones != ''){
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


        if (cantidadBanios !=  ''){
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

            const imagenBase64 = await toBase64(imagen); // Convertir a Base64

            const response = await fetch(`http://localhost/propiedades`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend, {imagen: imagenBase64}),
              });

            if(response.ok){
                const data = await response.json();
                if(data.status ===  'success'){
                    console.log('success');
                    setExito(data.message);
                    mostrarExitoOn();
                } else {
                    console.log('error: no success ',data.message);
                    setError(data.message);
                    mostrarErrorOn();
                }
            } else {
                console.log('error en la api');
                mostrarErrorOn();
            }

        } catch(error){
            console.log('error ', error);
            setError(error.message);
            mostrarErrorOn();
        }
    }

 
    return (
        <div className='edit-propiedad-page'>
            <h1>Crear una Nueva Propiedad</h1>
            {error && mostrarError && (
                <p className="error-message mostrar">Error: {error}</p>
            )}
            
            {mostrarExito && (
                <p className="mensaje-exito mostrar">
                    {exito}
                </p>
            )} 

            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='domicilio'>Domicilio: </label>
                    <input type="text" id="domicilio" name="domicilio" defaultValue={''}></input>
                </div>
                
                <div>
                    <label htmlFor='localidad_id'>Localidad: </label>
                    <select id ="localidad_id" name="localidad_id">
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
                    <input type="checkbox" id="disponible" name="disponible" />
                </div>

                <div>
                    <label htmlFor="valor_noche">Valor por noche:</label>
                    <input type="number" id="valor_noche" name="valor_noche"  />
                </div>

                <div>
                    <label htmlFor="tipo_propiedad_id">Tipo de propiedad:</label>
                    <select id="tipo_propiedad_id" name="tipo_propiedad_id" >
                        {tiposPropiedad.map(tipo => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.nombre}
                        </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="imagen">Ingrese una imagen</label>
                    <div>
                    <label htmlFor="imagen">Ingrese una imagen</label>
                    {tiposPropiedad.imagen ? ( 
                        <img src={tiposPropiedad.imagen} alt="Vista previa" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    ) : (
                        <img src="https://www.purina.com.ar/sites/default/files/styles/webp/public/2022-10/Que_debes_saber_antes_de_adoptar_un_gatito.jpg.webp?itok=9zgitaBO" alt="Imagen por defecto" style={{ maxWidth: '200px', marginTop: '10px' }} />
                    )}
                    </div>
                    <input type="file" className="imagen" name="imagen" id="imagen"></input>
                </div>
                <button type='submit'>guardar</button>
                <button type="button" onClick={() => navigate(-1)}>Volver</button>
            </form>

        </div>
    );
};

export default NewPropiedadPage;