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
        return data.data[0]; 
      } else {
        throw new Error(data.message || 'Error desconocido al cargar la propiedad');
      }
    } catch (error) {
      console.error('Error al cargar la propiedad:', error);
      throw error; 
    }
  };
  