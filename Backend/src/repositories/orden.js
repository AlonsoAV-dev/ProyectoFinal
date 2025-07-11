import RepositoryBase from './base.js';
import orden from '../models/orden.js';

class OrdenRepository extends RepositoryBase {
    constructor() {
        super(orden);
    }
    async findByUsuario(idUsuario) {
        return this.model.findAll({
            where: { idUsuario },
        })
        .catch(error => {
                console.error("Error in findByUsuario:", error);
                return null;
            });
    }
}

export default new OrdenRepository();