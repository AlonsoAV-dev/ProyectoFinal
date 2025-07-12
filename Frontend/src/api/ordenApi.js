// API para manejar órdenes - conecta con el backend real
const API_BASE_URL = 'http://localhost:3001';

const ordenApi = {
  // Obtener todas las órdenes
  obtenerOrdenes: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener órdenes:', error);
      throw error;
    }
  },

  // Obtener una orden específica por ID
  obtenerOrden: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/${id}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al obtener orden ${id}:`, error);
      throw error;
    }
  },

  // Crear una nueva orden
  crearOrden: async (ordenData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordenData),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear orden:', error);
      throw error;
    }
  },

  // Actualizar una orden existente
  actualizarOrden: async (id, ordenData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordenData),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al actualizar orden ${id}:`, error);
      throw error;
    }
  },

  // Actualizar estado de una orden
  actualizarEstado: async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/${id}/estado`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al actualizar estado de orden ${id}:`, error);
      throw error;
    }
  },

  // Eliminar una orden
  eliminarOrden: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al eliminar orden ${id}:`, error);
      throw error;
    }
  },

  // Obtener estadísticas de órdenes
  obtenerEstadisticas: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/estadisticas`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener estadísticas:', error);
      throw error;
    }
  },

  // Obtener órdenes por usuario
  obtenerOrdenesPorUsuario: async (idUsuario) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/usuario/${idUsuario}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al obtener órdenes del usuario ${idUsuario}:`, error);
      throw error;
    }
  },

  // Crear orden desde carrito
  crearOrdenDesdeCarrito: async (idUsuario, ordenData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/carrito/${idUsuario}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ordenData),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al crear orden desde carrito:', error);
      throw error;
    }
  },

  // MÉTODOS ALIAS PARA COMPATIBILIDAD CON COMPONENTES EXISTENTES
  
  // Alias para obtenerOrdenes() - usado por ListaOrd, DashListaOrdenes, DashboardAdmin
  findAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error al obtener órdenes (findAll):', error);
      throw error;
    }
  },

  // Alias para obtener orden con detalles - usado por ListaOrd
  findOneWithDetails: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/detalle/${id}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error al obtener detalles de orden ${id}:`, error);
      throw error;
    }
  },

  // Alias para cambiar estado - usado por ListaOrd
  cambiarEstadoOrden: async (id, nuevoEstado) => {
    try {
      const response = await fetch(`${API_BASE_URL}/orden/estado/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      return { success: true, ...result };
    } catch (error) {
      console.error(`Error al cambiar estado de orden ${id}:`, error);
      return { success: false, message: error.message };
    }
  }
};

export default ordenApi;