import repository from "../repositories/itemCarrito.js";

const findAll = async (req, res) => {
  const result = await repository.findAll();
  return sendResults(result, res);
};

const findByCarrito = async (req, res) => {
  const idCarrito = req.params.idCarrito;
  const result = await repository.findByCarrito(idCarrito);
  return sendResults(result, res);
};

const create = async (req, res) => {
  const payload = req.body;
  const result = await repository.create(payload);
  return sendResults(result, res);
};

const update = async (req, res) => {
  const payload = req.body;
  const result = await repository.update(payload);
  return sendResults(result, res);
};

const remove = async (req, res) => {
  const id = req.params.id;
  const result = await repository.remove(id);
  return sendResults(result, res);
};

const sendResults = (result, res) => {
  if (result) return res.status(200).json(result);
  else return res.status(500).json({ message: "Ha ocurrido un error!" });
};

const controller = {
  findAll,
  findByCarrito,
  create,
  update,
  remove,
};

export default controller;
