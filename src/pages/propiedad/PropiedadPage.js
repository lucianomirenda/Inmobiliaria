import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/PagePropiedad.css'; 
import '../../assets/styles/Mensajes.css';
import { fetchLocalidades } from '../../utils/api';

const PropiedadPage = () => {

  const [propiedades, setPropiedades] = useState([]);
  const [filtros, setFiltros] = useState({
    disponible: true,
    localidad_id: '',
    fecha_inicio_disponibilidad: '',
    cantidad_huespedes: '',
  });


  const [exito, setExito] = useState(false);
  const [error, setError] = useState(null);
  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [localidades, setLocalidades] = useState([]); 

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

    const fetchPropiedades = async () => {
      try {
        const queryParams = new URLSearchParams(
          Object.entries(filtros).reduce((params, [key, value]) => {
            if (key === 'disponible') {
              params[key] = value ? '1' : '0'; 
            } else if (value !== '') {
              params[key] = value;
            }
            return params;
          }, {})
        ).toString();
  
        const response = await fetch(`http://localhost/propiedades${queryParams ? '?' + queryParams : ''}`);
  
        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }
  
        const data = await response.json();
        if (data.status === 'success') {
          setPropiedades(data.data);
        } else {
          throw new Error(data.message || 'Error desconocido en la API');
        }
      } catch (error) {
        console.error('Error al obtener las propiedades:', error);
        setError(error.message);
        mostrarErrorOn() 
      }
    };

    fetchPropiedades();
  }, [filtros]); 

  useEffect(() => {
    const cargarLocalidades = async () => {
      try {
        const localidadesData = await fetchLocalidades();
        setLocalidades(localidadesData);
      } catch (error) {
        setError(error.message);
      }
    };

    cargarLocalidades();
  }, []);


  const handleFiltroChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFiltros(prevFiltros => ({
      ...prevFiltros,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleEliminarPropiedad = async (propiedadId) => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar esta propiedad?`)) {
      try {
        const response = await fetch(`http://localhost/propiedades/${propiedadId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setPropiedades(propiedades.filter(propiedad => propiedad.id !== propiedadId));
          setExito(data.message);
          mostrarExitoOn()
        } else {
          setError(data.message || 'Error desconocido en la API');
          mostrarErrorOn()
        }
      } catch (error) {
        console.error('Error al eliminar la propiedad:', error);
        setError('Error al eliminar la propiedad');
        mostrarErrorOn()
      }
    }
  };

  return (
    
    <div className="tipo-propiedad-page">
      <h1>Propiedades</h1>
  
      {error && mostrarError && (
        <p className="mensaje-error">Error: {error}</p>
      )}
      
      {exito && mostrarExito && (
        <p className="mensaje-exito">
          {exito}
        </p>
      )} 
  
      <div className="contenido-principal">
      <form>
        <div className="filtros-container">
          <div className="filtro">
                <label htmlFor="disponible">Disponible:</label>
                <div className="checkbox-container"> 
                <input
                    type="checkbox"
                    id="disponible"
                    name="disponible"
                    checked={filtros.disponible}
                    onChange={handleFiltroChange}
                />
                <span className="checkbox-label"></span> 
                </div>
            </div>
            <div className="filtro">
                <label htmlFor="localidad_id">Localidad:</label>
                <select
                id="localidad_id"
                name="localidad_id"
                value={filtros.localidad_id}
                onChange={handleFiltroChange}
                >
                <option value="">Todas</option>
                {localidades.map(localidad => (
                    <option key={localidad.id} value={localidad.id}>
                    {localidad.nombre}
                    </option>
                ))}
                </select>
            </div>
            <div className="filtro">
                <label htmlFor="fecha_inicio_disponibilidad">Fecha de inicio:</label>
                <input
                type="date"
                id="fecha_inicio_disponibilidad"
                name="fecha_inicio_disponibilidad"
                value={filtros.fecha_inicio_disponibilidad}
                onChange={handleFiltroChange}
                />
            </div>

            <div className="filtro">
                <label htmlFor="cantidad_huespedes">Cantidad de huéspedes:</label>
                <input
                type="number"
                id="cantidad_huespedes"
                name="cantidad_huespedes"
                value={filtros.cantidad_huespedes}
                onChange={handleFiltroChange}
                />
            </div>
            <Link to="/propiedad/nuevo" className="btn btn-primary">
               Nueva propiedad
            </Link>
          </div>

        </form>

        <div className="listado-propiedades">
          {Array.isArray(propiedades) && ( 
            <div className="propiedad-list">
              {propiedades.length > 0 ? (
                propiedades.map(propiedad => (
                  <li key={propiedad.id} className="propiedad-card">
                    <h2>{propiedad.domicilio}</h2>
                    <p>Localidad: {propiedad.localidad}</p>
                    <p>Tipo: {propiedad.tipo_de_propiedad}</p>
                    <p>Disponible desde la fecha: {propiedad.fecha_inicio_disponibilidad}</p>
                    <p>Cantidad de huespedes: {propiedad.cantidad_huespedes}</p>
                    <p>Costo por noche: {propiedad.valor_noche}</p>
                    <div className="card-actions">
                      <Link to={`/propiedad/${propiedad.id}`}>Ver detalle</Link>
                      <Link to={`/propiedad/editar/${propiedad.id}`}>Editar</Link>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminarPropiedad(propiedad.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))
              ) : (
                <p>No hay propiedades disponibles.</p>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  );
  
};

export default PropiedadPage;