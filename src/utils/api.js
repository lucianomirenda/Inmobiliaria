export const fetchLocalidades = async () => {
    try {
      const response = await fetch('http://localhost/localidades');
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
  
      if (data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message || 'Error desconocido al cargar las localidades');
      }
    } catch (error) {
      console.error('Error al cargar las localidades:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
  };
  

  export const fetchPropiedades = async () => {
    try {
      const response = await fetch('http://localhost/propiedades');
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
  
      if (data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message || 'Error desconocido al cargar las propiedades');
      }
    } catch (error) {
      console.error('Error al cargar las propiedades:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
  };


  export const fetchDomicilio = async (propiedadId) => {
    try {
      const response = await fetch(`http://localhost/propiedades/${propiedadId}`);
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      return data.data.domicilio; // Suponiendo que el objeto de respuesta tiene un campo data con los datos de la propiedad y dentro de ellos el domicilio
    } catch (error) {
        throw new Error(`Error al obtener el domicilio: ${error.message}`);
    }
  };




  export const fetchInquilinos = async () => {
    try {
      const response = await fetch('http://localhost/inquilinos');
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      
  
      if (data.status === 'success') {
        return data.data;
      } else {
        throw new Error(data.message || 'Error desconocido al cargar los inquilinos');
      }
    } catch (error) {
      console.error('Error al cargar los inquilinos:', error);
      throw error; // Re-lanzar el error para que pueda ser manejado en el componente
    }
  };


  export const fetchInquilinoPorId = async (inquilinoId) => {
    try {
      const response = await fetch(`http://localhost/inquilinos/${inquilinoId}`);
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
        }
      const data = await response.json();
        return data.data; // Suponiendo que el objeto de respuesta tiene un campo data con los datos del inquilino
      } catch (error) {
        throw new Error(`Error al obtener el inquilino: ${error.message}`);
      }
  };

  export const fetchReservas = async () => {
    try {
      const response = await fetch('http://localhost/reservas');
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
      
      return data.data;
      
    } catch (error) {
      console.error('Error al cargar las reservas:', error);
      throw error; 
    }
  };


  export const fetchTiposPropiedad = async () => {
    try {
      const response = await fetch('http://localhost/tipos_propiedad'); // Tu endpoint de tipos de propiedad
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
  
      if (data.status === 'success') {
        return data.data; // Devolver los tipos de propiedad
      } else {
        throw new Error(data.message || 'Error desconocido al cargar los tipos de propiedad');
      }
    } catch (error) {
      console.error('Error al cargar los tipos de propiedad:', error);
      throw error; // Re-lanzar el error para manejarlo en el componente
    }
  };


  export const fetchPropiedadPorId = async (propiedadId) => {
    try {
      const response = await fetch(`http://localhost/propiedades/${propiedadId}`);
  
      if (!response.ok) {
        throw new Error('Error en la respuesta de la API');
      }
  
      const data = await response.json();
  
      if (data.status === 'success') {
        return data.data[0]; // Devolver la propiedad
      } else {
        throw new Error(data.message || 'Error desconocido al cargar la propiedad');
      }
    } catch (error) {
      console.error('Error al cargar la propiedad:', error);
      throw error; // Re-lanzar el error
    }
  };
  
  // fetchReservaPorId.js

 export const fetchReservaPorId = async (id) => {
    try {
      const response = await fetch(`http://localhost/reservas`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      console.log('Respuesta de la API:', data); // Verificar la respuesta completa de la API
  
      const reservas = data.data;
      console.log('Reservas:', reservas); // Verificar las reservas
  
      const reserva = reservas.find((reserva) => reserva.id === parseInt(id, 10));
      if (!reserva) {
        console.log(`No se encontró la reserva con id ${id}`); // Verificar si la reserva existe
        throw new Error(`Reserva no encontrada con id ${id}`);
      }
  
      return reserva;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
