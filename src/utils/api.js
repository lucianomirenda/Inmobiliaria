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