import repository from "../repositories/carrito.js";

const findAll = async (req, res) => {
    const result = await repository.findAll();
    
    return sendResults(result,res);
}

const findOne = async (req, res) => {
    const id = req.params.id;
    const result = await repository.findOne(id);

    return sendResults(result,res);
}
const findByUsuario = async (req, res) => {
    console.log("params recibidos:", req.params); 
    const idUsuario = req.params.idUsuario;
    const result = await repository.findByUsuario(idUsuario);
    return sendResults(result,res);
}

const create = async (req, res) => {
    const payload = req.body;
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
    if (result === undefined) {
        return res.status(500).json({ message: "Ha ocurrido un error!" });
    }
    return res.status(200).json(result); // null también entra aquí
}

const controller = { findAll, findOne, findByUsuario, create, update, remove }

export default controller;