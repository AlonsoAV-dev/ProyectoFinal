import base from './base.js';

const endpoint = 'carrito';

const findAll = async () => await base.get(endpoint);
const findOne = async (id) => await base.get(`${endpoint}/${id}`);
const findByUsuario = async (idUsuario) => await base.get(`${endpoint}/usuario/${idUsuario}`);
const create = async (payload) => await base.post(endpoint, payload);
const update = async (payload) => await base.put(endpoint, payload);
const remove = async (id) => await base.remove(`${endpoint}/${id}`);

const carritoApi = { findAll, findOne, findByUsuario, create, update, remove };

export default carritoApi;