let usuarioSingleton = {
    nombre: 'Andrew',
    apellido: 'Huancaya',
    correo: 'andrewhuancaya@gmail.com',
    fecha_registro: '31/01/2025',
    
};

export const getUsuario = () => {
    return { ...usuarioSingleton };
};

export const updateUsuario = (nuevosDatos) => {
    
    usuarioSingleton = {
        ...usuarioSingleton, // Mantiene campos no editables como fecha_registro
        nombre: nuevosDatos.nombre !== undefined ? nuevosDatos.nombre : usuarioSingleton.nombre,
        apellido: nuevosDatos.apellido !== undefined ? nuevosDatos.apellido : usuarioSingleton.apellido,
        correo: nuevosDatos.correo !== undefined ? nuevosDatos.correo : usuarioSingleton.correo,
    };
    console.log("Datos de usuario actualizados en api/usuarioData.js:", usuarioSingleton);
    return { ...usuarioSingleton }; // Devuelve una copia de los datos actualizados
}; 