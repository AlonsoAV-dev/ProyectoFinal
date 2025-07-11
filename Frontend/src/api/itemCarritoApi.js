import base from './base.js';
const endpoint = 'itemCarrito';

const findAll = async () => await base.get(endpoint);
const findByCarrito = async (idCarrito) => await base.get(`${endpoint}/carrito/${idCarrito}`);
const create = async (payload) => await base.post(endpoint, payload);   
const update = async (payload) => await base.put(endpoint, payload);
const remove = async (id) => await base.remove(`${endpoint}/${id}`);
const api = { findAll, findByCarrito, create, update, remove }; 
export default api;