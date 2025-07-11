import Carrito from "../models/carrito.js";

import RepositoryBase from "./base.js";
class CarritoRepository extends RepositoryBase {
    constructor() {
        super(Carrito);
    }

    async findByUsuario(idUsuario) {
        return this.model.findOne({
            where: { idUsuario },
        })
        .catch(error => {
            console.error("Error in findByUsuario:", error);
            return null;
        });
    }
}
export default new CarritoRepository();

