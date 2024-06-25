import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../assets/styles/Edit.css';
import '../../assets/styles/Mensajes.css';

import { fetchInquilinos, fetchPropiedades, fetchReservaPorId } from '../../utils/api';

const EditReservaPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [reserva, setReserva] = useState(null);
  const [inquilinos, setInquilinos] = useState([]);
  const [propiedades, setPropiedades] = useState([]);
  const [mostrarError, setMostrarError] = useState(false);
  const [mostrarExito, setMostrarExito] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(null);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const reservaData = await fetchReservaPorId(id);
        setReserva(reservaData);

        const inquilinosData = await fetchInquilinos();
        setInquilinos(inquilinosData);

        const propiedadesData = await fetchPropiedades();
        setPropiedades(propiedadesData);
      } catch (error) {
        console.log(error);
      }
    };

    cargarDatos();
  }, [id]);

  function mostrarErrorOn() {
    setMostrarError(true);
    setTimeout(() => {
      setMostrarError(false);
      setError(null);
      setExito(null);
    }, 5000);
  }

  function mostrarExitoOn() {
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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const inquilinoId = formData.get('inquilino_id');
    const propiedadId = formData.get('propiedad_id');
    const cantidadNoches = formData.get('cantidad_noches');
    const fechaDesde = formData.get('fecha_desde');
    const valorTotal = formData.get('valor_total');

    // Validaciones
    if (inquilinoId === '') {
      setError('Debes seleccionar un inquilino.');
      mostrarErrorOn();
      return;
    }

    if (propiedadId === '') {
      setError('Debes seleccionar una propiedad.');
      mostrarErrorOn();
      return;
    }

    if (cantidadNoches.trim() === '') {
      setError('La cantidad de noches no puede estar vacío.');
      mostrarErrorOn();
      return;
    } else if (!/^\d+$/.test(cantidadNoches)) {
      setError('La cantidad de noches debe ser un número entero.');
      mostrarErrorOn();
      return;
    }

    if (fechaDesde.trim() === '') {
      setError('La fecha de inicio de la reserva es obligatoria.');
      mostrarErrorOn();
      return;
    }

    if (valorTotal.trim() === '') {
      setError('El valor total no puede estar vacío.');
      mostrarErrorOn();
      return;
    } else if (!/^\d+$/.test(valorTotal)) {
      setError('El valor total debe ser un número entero.');
      mostrarErrorOn();
      return;
    }

    try {
      
      const dataToSend = {
        inquilino_id: inquilinoId,
        propiedad_id: propiedadId,
        cantidad_noches: cantidadNoches,
        fecha_desde: fechaDesde,
        valor_total: valorTotal,
      };

      const response = await fetch(`http://localhost/reservas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const data = await response.json();

      if (!response.ok) {
          setError(devolverMensajeError(data.message.error));
          throw new Error('Error en la respuesta de la API');
      }

      setExito(data.message);
      mostrarExitoOn();
      setReserva(await fetchReservaPorId(id));

    } catch (error) {
      console.log(error);
      mostrarErrorOn();
    }
  };

  return (
    <div className='edit-page'>
      <h1>Editar Reserva</h1>
      {error && mostrarError && (
        <p className="mensaje-error">Error: {error}</p>
      )}
      {mostrarExito && (
        <p className="mensaje-exito">
          {exito}
        </p>
      )}
            {reserva? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='inquilino_id'>Inquilino:</label>
            <select id='inquilino_id' name='inquilino_id' defaultValue={reserva.inquilino_id}>
              {inquilinos.map((inquilino) => (
                <option key={inquilino.id} value={inquilino.id}>
                  {inquilino.nombre} {inquilino.apellido}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='propiedad_id'>Propiedad:</label>
            <select id='propiedad_id' name='propiedad_id' defaultValue={reserva.propiedad_id}>
              {propiedades.map((propiedad) => (
                <option key={propiedad.id} value={propiedad.id}>
                  {propiedad.domicilio}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='cantidad_noches'>Cantidad de Noches:</label>
            <input type='number' id='cantidad_noches' name='cantidad_noches' defaultValue={reserva.cantidad_noches} />
          </div>

          <div>
            <label htmlFor='fecha_desde'>Fecha Desde:</label>
            <input type='date' id='fecha_desde' name='fecha_desde' defaultValue={reserva.fecha_desde} />
          </div>

          <div>
            <label htmlFor='valor_total'>Valor Total:</label>
            <input type='number' id='valor_total' name='valor_total' defaultValue={reserva.valor_total} />
          </div>

          <button type='submit'>Guardar</button>
          <button type="button" onClick={() => navigate(-1)}>Volver</button>
        </form>
      ) : (
        <p>Cargando reserva...</p>
      )}

    </div>
  );
};

export default EditReservaPage;