import app from './src/app.js';
import sequelize from './src/config/db.js';

async function main () {
    try {
        const init = process.argv[2];

        if (init) 
                await sequelize.sync({ force: true })
            else
                await sequelize.sync({ force: false})
            
        console.log('Base de datos actualizada!')

        app.listen(3001, () => {
        console.log('Server is running on port 3001')
})

    } catch (error) {
        console.log(error)
    }
}

main();

