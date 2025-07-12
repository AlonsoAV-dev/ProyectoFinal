import repository from "../repositories/users.js";

const findAll = async (req, res) => {
    const result = await repository.findAll();
    
    return sendResults(result,res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);

    return sendResults(result,res);
}

const create = async (req, res) => {
    const payload = req.body;
    
    
    if (!payload.nombreDeUsuario) {
        const baseUsername = `${payload.nombre}${payload.apellido}`.toLowerCase().replace(/\s+/g, '');
        const timestamp = Date.now().toString().slice(-4); 
        payload.nombreDeUsuario = `${baseUsername}${timestamp}`;
    }
    
    
    if (!payload.fechaRegistro) {
        payload.fechaRegistro = new Date().toISOString().split('T')[0];
    }
    
    const result = await repository.create(payload);

    return sendResults(result,res)
}

const update = async (req, res) => {
    const payload = req.body;

    const result = await repository.update(payload);

    return sendResults(result,res)
}

const remove = async (req, res) => {
    const id = req.params.id;
    const result = await repository.remove(id);

    return sendResults(result,res);
}

const sendResults = (result, res) => {
    if (result)
        return res.status(200).json(result);
    else
        return res.status(500).json({ message: "Ha ocurrido un error!"})
}

const controller = { findAll, findOne, create, update, remove }

export default controller;