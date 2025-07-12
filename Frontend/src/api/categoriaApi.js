import base from './base.js'

const endpoint = 'categorias'

// CRUD básico
const findAll = async () => await base.get(endpoint);
const create = async (payload) => await base.post(endpoint, payload);
const update = async (payload) => await base.put(endpoint, payload);
const remove = async (id) => await base.remove(`${endpoint}/${id}`);  // Método remove corregido
const findOne = async (id) => await base.get(`${endpoint}/${id}`);



const obtenerCategorias = async () => {
    try {
        const categorias = await findAll();
        // El backend puede devolver { value: [...] } como otros endpoints
        return categorias?.value || categorias || [];
    } catch (error) {
        console.error('Error al obtener categorías:', error);
        return [];
    }
};

const obtenerCategoriasActivas = async () => {
    try {
        const todasCategorias = await obtenerCategorias();
        return todasCategorias.filter(categoria => categoria.estado === 'Activo');
    } catch (error) {
        console.error('Error al obtener categorías activas:', error);
        return [];
    }
};

const crearCategoria = async (categoriaData) => {
    try {
        const nuevaCategoria = await create(categoriaData);
        return nuevaCategoria;
    } catch (error) {
        console.error('Error al crear categoría:', error);
        throw error;
    }
};

const actualizarCategoria = async (categoriaData) => {
    try {
        const categoriaActualizada = await update(categoriaData);
        return categoriaActualizada;
    } catch (error) {
        console.error('Error al actualizar categoría:', error);
        throw error;
    }
};

const eliminarCategoria = async (id) => {
    try {
        const resultado = await remove(id);
        return resultado;
    } catch (error) {
        console.error('Error al eliminar categoría:', error);
        throw error;
    }
};

const obtenerCategoriaPorId = async (id) => {
    try {
        const categoria = await findOne(id);
        return categoria;
    } catch (error) {
        console.error('Error al obtener categoría por ID:', error);
        throw error;
    }
};

const api = { 
    findAll, 
    create, 
    update, 
    remove,  // Ahora incluido en la exportación
    findOne,
    obtenerCategorias,
    obtenerCategoriasActivas,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria,
    obtenerCategoriaPorId
};

export default api;
