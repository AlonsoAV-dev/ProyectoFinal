import RepositoryBase from './base.js';
import ItemDeCarrito from '../models/itemCarrito.js';
import Producto from '../models/producto.js';

class ItemDeCarritoRepository extends RepositoryBase {
  constructor() {
    super(ItemDeCarrito);
  }

  async findByCarrito(idCarrito) {
    try {
      return await ItemDeCarrito.findAll({
        where: { idCarrito },
      });
    } catch (error) {
      console.error("Error in findByCarrito:", error);
      return null;
    }
  }
}

export default new ItemDeCarritoRepository();