import repository from "../repositories/orden.js";

const findAll = async (req, res) => {
    try {
        const result = await repository.findAll();
        return sendResults(result, res);
    } catch (error) {
        console.error("Error in findAll:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const findOne = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await repository.findOne(id);
        return sendResults(result, res);
    } catch (error) {
        console.error("Error in findOne:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const findOneWithDetails = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await repository.findOneWithDetails(id);
        return sendResults(result, res);
    } catch (error) {
        console.error("Error in findOneWithDetails:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const findByUsuario = async (req, res) => {
    try {
        console.log("params recibidos:", req.params);
        const idUsuario = req.params.idUsuario;
        const result = await repository.findByUsuario(idUsuario);
        return sendResults(result, res);
    } catch (error) {
        console.error("Error in findByUsuario:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const create = async (req, res) => {
    try {
        const payload = req.body;
        
        // Validar datos requeridos
        if (!payload.idUsuario) {
            return res.status(400).json({ message: "ID de usuario requerido" });
        }
        
        const result = await repository.create(payload);
        return sendResults(result, res);
    } catch (error) {
        console.error("Error in create:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const createFromCarrito = async (req, res) => {
    try {
        const { idUsuario, datosOrden } = req.body;
        
        // Validar datos requeridos
        if (!idUsuario) {
            return res.status(400).json({ message: "ID de usuario requerido" });
        }
        
        if (!datosOrden) {
            return res.status(400).json({ message: "Datos de orden requeridos" });
        }
        
        const result = await repository.createOrdenFromCarrito(idUsuario, datosOrden);
        
        if (result.success) {
            return res.status(201).json({
                message: "Orden creada exitosamente",
                orden: result.orden,
                detalles: result.detalles
            });
        } else {
            return res.status(400).json({
                message: result.message,
                errors: result.errors || []
            });
        }
    } catch (error) {
        console.error("Error in createFromCarrito:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const update = async (req, res) => {
    try {
        const payload = req.body;
        
        // Validar que el ID esté presente
        if (!payload.id) {
            return res.status(400).json({ message: "ID de orden requerido para actualización" });
        }
        
        const result = await repository.update(payload);
        return sendResults(result, res);
    } catch (error) {
        console.error("Error in update:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const updateEstado = async (req, res) => {
    try {
        const id = req.params.id;
        const { estado } = req.body;
        
        if (!estado) {
            return res.status(400).json({ message: "Estado requerido" });
        }
        
        const result = await repository.updateEstado(id, estado);
        
        if (result.success) {
            return res.status(200).json({
                message: "Estado actualizado exitosamente",
                orden: result.orden
            });
        } else {
            return res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error("Error in updateEstado:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await repository.remove(id);
        return sendResults(result, res);
    } catch (error) {
        console.error("Error in remove:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const getEstadisticas = async (req, res) => {
    try {
        const result = await repository.getEstadisticas();
        return sendResults(result, res);
    } catch (error) {
        console.error("Error in getEstadisticas:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const validateStock = async (req, res) => {
    try {
        const { productos } = req.body;
        
        if (!productos || !Array.isArray(productos)) {
            return res.status(400).json({ message: "Lista de productos requerida" });
        }
        
        const result = await repository.validateStock(productos);
        
        if (result.valid) {
            return res.status(200).json({ 
                message: "Stock disponible", 
                valid: true 
            });
        } else {
            return res.status(400).json({ 
                message: "Stock insuficiente", 
                valid: false, 
                errors: result.errors 
            });
        }
    } catch (error) {
        console.error("Error in validateStock:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const calculateTotals = async (req, res) => {
    try {
        const { productos } = req.body;
        
        if (!productos || !Array.isArray(productos)) {
            return res.status(400).json({ message: "Lista de productos requerida" });
        }
        
        const result = await repository.calculateTotals(productos);
        
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json({ message: "Error al calcular totales" });
        }
    } catch (error) {
        console.error("Error in calculateTotals:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
}

const sendResults = (result, res) => {
    if (result) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: "Recurso no encontrado" });
    }
}

const controller = { 
    findAll, 
    findOne, 
    findOneWithDetails,
    findByUsuario, 
    create, 
    createFromCarrito,
    update, 
    updateEstado,
    remove, 
    getEstadisticas,
    validateStock,
    calculateTotals
}

export default controller;