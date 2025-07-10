class RepositoryBase{
    constructor(model){
        this.model = model;
    }
    async findAll(){
        try {
            return await this.model.findAll();
        } catch (error) {
            console.error("Error in findAll:", error);
            return null;
        }
    }

    async create(entity){
        try{
            return await this.model.create(entity);
        }
        catch(error){
            console.error("Error in create:", error);
            return null;
        }
    }
    async findOne(id){
        try {
            return await this.model.findOne({ where: { id } });
        } catch (error) {
            console.error("Error in findOne:", error);
            return null;
        }
    }     

    async update (entity){
        try{
            const {id} = entity;
            return await this.model.update( entity, 
                {
                    where: {id:id}
                }
            )
        }
        catch(error){
            console.error("Error in update:", error);
            return null;
        }
    }

    async remove(id) {
        try {
            return await this.model.destroy(
                {
                    where: { id: id}
                }
            )
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

export default RepositoryBase;