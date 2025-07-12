import base from './base.js'

const endpoint = 'users'
const API_BASE_URL = 'http://localhost:3001'


const findAll = async () => await base.get(endpoint);
const create = async (payload) => await base.post(endpoint, payload);
const update = async (payload) => await base.put(endpoint, payload);
const remove = async (id) => await base.remove(`${endpoint}/${id}`);
const findOne = async (id) => await base.get(`${endpoint}/${id}`);


const login = async (email, password) => {
    try {
        
        const response = await findAll();
        
        
        const usuarios = response?.value || response;
        
        if (!Array.isArray(usuarios)) {
            throw new Error('Error al obtener usuarios del servidor');
        }
        
        
        const usuario = usuarios.find(u => u.correo === email);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        
        if (usuario.password !== password) {
            throw new Error('Contraseña incorrecta');
        }
        
       
        const { password: _, ...usuarioSinPassword } = usuario;
        return usuarioSinPassword;
        
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
};

const register = async (userData) => {
    try {
        const response = await findAll();
        const usuarios = response?.value || response;
        
        if (Array.isArray(usuarios)) {
            const existeUsuario = usuarios.find(u => u.correo === userData.email);
            if (existeUsuario) {
                throw new Error('Ya existe un usuario con ese email');
            }
        }
        
       
        const nuevoUsuario = {
            nombre: userData.nombre,
            apellido: userData.apellido,
            correo: userData.email, 
            dni: userData.dni,
            direccion: userData.direccion,
            ciudad: userData.ciudad,
            telefono: userData.telefono,
            password: userData.password,
            fechaRegistro: new Date().toISOString().split('T')[0],
            estado: 'Activo'
            
        };
        
       
        const usuarioCreado = await create(nuevoUsuario);
       
        const { password: _, ...usuarioSinPassword } = usuarioCreado?.value || usuarioCreado;
        return usuarioSinPassword;
        
    } catch (error) {
        console.error('Error en registro:', error);
        throw error;
    }
};

const updateProfile = async (userId, profileData) => {
    try {
        
        const datosActualizar = {
            id: userId,
            ...profileData
        };
        
        
        if (datosActualizar.email) {
            datosActualizar.correo = datosActualizar.email;
            delete datosActualizar.email;
        }
        
        const usuarioActualizado = await update(datosActualizar);
        
        
        const { password: _, ...usuarioSinPassword } = usuarioActualizado;
        return usuarioSinPassword;
        
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        throw error;
    }
};

const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        
        const usuario = await findOne(userId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        
        if (usuario.password !== currentPassword) {
            throw new Error('La contraseña actual es incorrecta');
        }
        
       
        const datosActualizar = {
            id: userId,
            password: newPassword
        };
        
        await update(datosActualizar);
        return { success: true, message: 'Contraseña actualizada correctamente' };
        
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        throw error;
    }
};


const saveUserSession = (usuario) => {
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('isLoggedIn', 'true');
};

const getUserSession = () => {
    try {
        const usuario = localStorage.getItem('usuario');
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        if (isLoggedIn && usuario) {
            return JSON.parse(usuario);
        }
        return null;
    } catch (error) {
        console.error('Error al obtener sesión:', error);
        return null;
    }
};

const clearUserSession = () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('isLoggedIn');
};

const api = { 
    findAll, 
    create, 
    update, 
    remove, 
    findOne,
    login,
    register,
    updateProfile,
    changePassword,
    saveUserSession,
    getUserSession,
    clearUserSession
};

export default api;