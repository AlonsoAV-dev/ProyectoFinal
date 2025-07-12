import base from './base.js'

const endpoint = 'users'
const API_BASE_URL = 'http://localhost:3001'

// CRUD básico
const findAll = async () => await base.get(endpoint);
const create = async (payload) => await base.post(endpoint, payload);
const update = async (payload) => await base.put(endpoint, payload);
const remove = async (id) => await base.remove(`${endpoint}/${id}`);
const findOne = async (id) => await base.get(`${endpoint}/${id}`);

// Funciones de autenticación
const login = async (email, password) => {
    try {
        // Obtener todos los usuarios para buscar el email
        const response = await findAll();
        
        // El backend regresa { value: [...], Count: n }
        const usuarios = response?.value || response;
        
        if (!Array.isArray(usuarios)) {
            throw new Error('Error al obtener usuarios del servidor');
        }
        
        // Buscar usuario por correo (no email)
        const usuario = usuarios.find(u => u.correo === email);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        // Verificar contraseña (simple verificación - en producción debería usar hash)
        if (usuario.password !== password) {
            throw new Error('Contraseña incorrecta');
        }
        
        // Retornar usuario sin contraseña
        const { password: _, ...usuarioSinPassword } = usuario;
        return usuarioSinPassword;
        
    } catch (error) {
        console.error('Error en login:', error);
        throw error;
    }
};

const register = async (userData) => {
    try {
        // Verificar que no exista usuario con ese email
        const response = await findAll();
        const usuarios = response?.value || response;
        
        if (Array.isArray(usuarios)) {
            const existeUsuario = usuarios.find(u => u.correo === userData.email);
            if (existeUsuario) {
                throw new Error('Ya existe un usuario con ese email');
            }
        }
        
        // Preparar datos para el backend
        const nuevoUsuario = {
            nombre: userData.nombre,
            apellido: userData.apellido,
            correo: userData.email, // Convertir email a correo
            dni: userData.dni,
            direccion: userData.direccion,
            ciudad: userData.ciudad,
            telefono: userData.telefono,
            password: userData.password,
            fechaRegistro: new Date().toISOString().split('T')[0],
            estado: 'Activo'
            // nombreDeUsuario se genera automáticamente en el backend
        };
        
        // Crear usuario
        const usuarioCreado = await create(nuevoUsuario);
        
        // Retornar usuario sin contraseña
        const { password: _, ...usuarioSinPassword } = usuarioCreado?.value || usuarioCreado;
        return usuarioSinPassword;
        
    } catch (error) {
        console.error('Error en registro:', error);
        throw error;
    }
};

const updateProfile = async (userId, profileData) => {
    try {
        // Convertir email a correo si existe
        const datosActualizar = {
            id: userId,
            ...profileData
        };
        
        // Si hay email, convertirlo a correo
        if (datosActualizar.email) {
            datosActualizar.correo = datosActualizar.email;
            delete datosActualizar.email;
        }
        
        const usuarioActualizado = await update(datosActualizar);
        
        // Retornar usuario sin contraseña
        const { password: _, ...usuarioSinPassword } = usuarioActualizado;
        return usuarioSinPassword;
        
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        throw error;
    }
};

const changePassword = async (userId, currentPassword, newPassword) => {
    try {
        // Obtener usuario actual
        const usuario = await findOne(userId);
        
        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }
        
        // Verificar contraseña actual
        if (usuario.password !== currentPassword) {
            throw new Error('La contraseña actual es incorrecta');
        }
        
        // Actualizar contraseña
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

// Funciones para manejo de sesión
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