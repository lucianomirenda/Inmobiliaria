import React, {useState,useEffect} from 'react';
import './LocalidadPage.css'; // Importar estilos


const LocalidadPage = () => {

    const [localidad, setLocalidad] = useState([]);
    
    useEffect(( ) => {
        const fetchLocalidad = async () => {
            const response = await fetch('http://localhost/localidades');
            
            const data = await response.json();

            setLocalidad(data.data);
        };

        fetchLocalidad();
    },[]);

    return (
        <div className='localidad-page'>
            <h1>Localidades</h1>
            <ul className='localidad-list'>
                {localidad.map(local => (
                    <li key ={local.id}>{local.nombre}</li>
                ))}
            </ul>

        </div>
    );

};

export default LocalidadPage;