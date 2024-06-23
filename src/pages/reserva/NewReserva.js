import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/New.css';
import { fetchPropiedades } from '../../utils/api';
import { fetchInquilinos } from '../../utils/api';
import '../../assets/styles/Mensajes.css';

const NewReserva = () => {
    
    const navigate = useNavigate();
    const [propiedades, setPropiedades] = useState([]);
    const [inquilinos, setInquilinos] = useState([]);
    const [propiedadId, setPropiedadId] = useState('');
    const [inquilinoId, setInquilinoId] = useState('');
    const [fechaDesde, setFechaDesde] = useState('');
    const [cantidadNoches, setCantidadNoches] = useState('');
    const [valorNoche, setValorNoche] = useState('');
    const [exito, setExito] = useState(false);
    const [error, setError] = useState(null);
    const [mostrarError, setMostrarError] = useState(false); 
    const [mostrarExito, setMostrarExito] = useState(false);
  
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

    useEffect(() => {
            const cargarPropiedades = async () => {
              try {
                const propiedadesData = await fetchPropiedades();
                setPropiedades(propiedadesData);
              } catch (error) {
                console.error('Error al cargar propiedades:', error);
              }
            };
        
      
            const cargarInquilinos = async () => {
              try {
                const inquilinosData = await fetchInquilinos();
                setInquilinos(inquilinosData);
              } catch (error) {
                console.error('Error al cargar inquilinos:', error);
              }
            };
      
        cargarPropiedades();
        cargarInquilinos();
    }, []);

    function devolverMensajeError(errores){
        let mensajesError = ''; 
        for (const campo in errores) {
            const mensajeError = errores[campo];
            mensajesError += `${mensajeError}.\n`; 
        }
        return mensajesError;
    }
      
    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!propiedadId || !inquilinoId || !fechaDesde || !cantidadNoches || !valorNoche) {
            setError('Todos los campos son obligatorios.');
            mostrarErrorOn();
            return;
        }

        try {
            
            const datosReserva = {
                propiedad_id: propiedadId,
                inquilino_id: inquilinoId,
                fecha_desde: fechaDesde,
                cantidad_noches: cantidadNoches,
                valor_noche: valorNoche,
            };

            const response = await fetch('http://localhost/reservas', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(datosReserva),
            });

            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }

            const data = await response.json();

            if (data.status === 'success') {
                console.log(data.data)
                setExito(data.message);
                mostrarExitoOn()
                setPropiedadId('');
                setInquilinoId('');
                setFechaDesde('');
                setCantidadNoches('');
                setValorNoche('');
            } else {
                setError(devolverMensajeError(data.message.error) || 'Error desconocido en la API');
                mostrarErrorOn()
            }
        } catch (error) {
            console.error('Error al crear la reserva:', error);
            setError('Error al crear la reserva.');
            mostrarErrorOn();
        }
    };

    return (
        <div className="new-page">
            <h1>Crear una Nueva Reserva</h1>
            {error && mostrarError && (
                <p className="mensaje-error">Error: {error}</p>
            )}
            {exito && mostrarExito && (
                <p className="mensaje-exito">
                    {exito}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="propiedadId">Propiedad:</label>
                    <select
                        id="propiedadId"
                        value={propiedadId}
                        onChange={(e) => setPropiedadId(e.target.value)}
                    >
                        <option value="">Selecciona una propiedad</option>
                        {propiedades.map((propiedad) => (
                            <option key={propiedad.id} value={propiedad.id}>
                                {propiedad.domicilio}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="inquilinoId">Inquilino:</label>
                    <select
                        id="inquilinoId"
                        value={inquilinoId}
                        onChange={(e) => setInquilinoId(e.target.value)}
                    >
                        <option value="">Selecciona un inquilino</option>
                        {inquilinos.map(inquilino => (
                            <option key={inquilino.id} value={inquilino.id}>{inquilino.nombre}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="fechaDesde">Fecha desde:</label>
                    <input
                        type="date"
                        id="fechaDesde"
                        value={fechaDesde}
                        onChange={(e) => setFechaDesde(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="cantidadNoches">Cantidad de noches:</label>
                    <input
                        type="number"
                        id="cantidadNoches"
                        value={cantidadNoches}
                        onChange={(e) => setCantidadNoches(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="valorNoche">Valor por noche:</label>
                    <input
                        type="number"
                        id="valorNoche"
                        value={valorNoche}
                        onChange={(e) => setValorNoche(e.target.value)}
                    />
                </div>

                <button type="submit">Crear Reserva</button>
                <button type="button" onClick={() => navigate(-1)}>Volver</button>
            </form>
        </div>
    );
};

export default NewReserva;