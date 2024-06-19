import React, {useState,useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import './PropiedadEditPage.css'; // Asegúrate de tener este archivo CSS

import { fetchLocalidades, fetchTiposPropiedad } from 'D:/PHP/inmobiliaria/src/utils/api.js';


const NewPropiedadPage = () => {

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
        
        const domicilio = formData.get('domicilio');
        const localidadId = formData.get('localidad_id');
        const cantidadHabitaciones = formData.get('cantidad_habitaciones');
        const cantidadBanios = formData.get('cantidad_banios');
        const cantidadHuespedes = formData.get('cantidad_huespedes');
        const fechaInicioDisponibilidad = formData.get('fecha_inicio_disponibilidad');
        const cantidadDias = formData.get('cantidad_dias');
        const valorNoche = formData.get('valor_noche');


        if (domicilio.trim() === '') { // trim() elimina espacios en blanco al principio y al final
            setError('El domicilio es obligatorio.');
            mostrarErrorOn();
            return; // Detener el envío del formulario si la validación falla
        }

        if (localidadId === '') { // Verifica si se ha seleccionado una localidad (el valor no es una cadena vacía)
            setError('Debes seleccionar una localidad.');
            mostrarErrorOn();
            return; // Detener el envío del formulario si la validación falla
        }

        if (cantidadHabitaciones.trim() === ''){
            setError('La cantidad de habitaciones no puede estar vacío.');
            mostrarErrorOn();
            return;
        } else if(!/^\d+$/.test(cantidadHabitaciones)) {
            setError('La cantidad de huéspedes debe ser un número entero.');
            mostrarErrorOn();
            return;
        }
        if (cantidadBanios.trim() === ''){
            setError('La cantidad de baños no puede estar vacío.');
            mostrarErrorOn();
            return;
        } else if(!/^\d+$/.test(cantidadBanios)) {
            setError('La cantidad de baños debe ser un número entero.');
            mostrarErrorOn();
            return;
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
        
          // Validación de valor_noche
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

            const dataToSend = formDataToObject(formData);
            const response = await fetch(`http://localhost/propiedades`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
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
            setError(error);
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
                <button type='submit'>guardar</button>
                <button type="button" onClick={() => navigate(-1)}>Volver</button>
            </form>

        </div>
    );
};

export default NewPropiedadPage;