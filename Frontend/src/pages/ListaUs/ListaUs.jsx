import React, { useState, useEffect } from "react";
import "./ListaUs.scss";
import ListaUsuarios from "../../api/usuarioApi.js";

function ListaUs() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const usersPerPage = 10;

    // Cargar usuarios desde la API
    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const usuariosData = await ListaUsuarios.findAll();
            setUsers(usuariosData);
            setFilteredUsers(usuariosData);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
            setError('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };


    const generateAvatar = (nombre, apellido) => {
        if (!nombre || !apellido) return '??';
        return `${nombre.charAt(0).toUpperCase()}${apellido.charAt(0).toUpperCase()}`;
    };


    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };


    const searchUsers = () => {
        if (searchTerm === '') {
            setFilteredUsers([...users]);
        } else {
            const filtered = users.filter(user => {
                const fullName = `${user.nombre} ${user.apellido}`.toLowerCase();
                const userName = user.nombreDeUsuario?.toLowerCase() || '';
                const email = user.correo?.toLowerCase() || '';
                const searchLower = searchTerm.toLowerCase();
                
                return fullName.includes(searchLower) || 
                       userName.includes(searchLower) || 
                       email.includes(searchLower);
            });
            setFilteredUsers(filtered);
        }
        setCurrentPage(1); 
    };


    const toggleUserStatus = async (userId) => {
        try {
            const user = users.find(u => u.id === userId);
            if (!user) return;

            const newStatus = user.estado === 'Activo' ? 'Inactivo' : 'Activo';
            

            await ListaUsuarios.update({
                id: userId,
                estado: newStatus
            });


            const updatedUsers = users.map(u => 
                u.id === userId 
                    ? { ...u, estado: newStatus } 
                    : u
            );
            setUsers(updatedUsers);
            
            // Refiltrar usuarios
            searchUsers();
        } catch (error) {
            console.error('Error al cambiar estado del usuario:', error);
            alert('Error al cambiar el estado del usuario');
        }
    };


    const viewDetails = (user) => {
        const details = `
            Nombre: ${user.nombre} ${user.apellido}
            Usuario: ${user.nombreDeUsuario}
            Email: ${user.correo}
            Teléfono: ${user.telefono}
            Dirección: ${user.direccion}
            Ciudad: ${user.ciudad}
            Fecha de registro: ${formatDate(user.fechaRegistro)}
            Estado: ${user.estado}
        `;
        alert(details);
    };

    // Paginación
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const currentUsers = filteredUsers.slice(startIndex, endIndex);

    const previousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    // Efectos
    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        searchUsers();
    }, [searchTerm, users]);


    if (loading) {
        return (
            <div className="container">
                <div className="loading">Cargando usuarios...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="error">
                    {error}
                    <button onClick={loadUsers} className="retry-btn">
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Listado de usuarios</h1>

            <div className="search-section">
                <input 
                    type="text" 
                    className="user-search" 
                    placeholder="Buscar por nombre, usuario o email..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="search-user-btn" onClick={searchUsers}>
                    Buscar
                </button>
            </div>

            {filteredUsers.length === 0 ? (
                <div className="no-users">
                    {searchTerm ? 'No se encontraron usuarios con ese criterio' : 'No hay usuarios registrados'}
                </div>
            ) : (
                <>
                    <table className="users-table">
                        <thead>
                            <tr className="table-header">
                                <th>Nombre completo</th>
                                <th>Usuario</th>
                                <th>Email</th>
                                <th>Fecha de registro</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentUsers.map((user) => (
                                <tr className="user-row" key={user.id}>
                                    <td className="user-info-cell">
                                        <div className="user-avatar">
                                            {user.img ? (
                                                <img className="imagen-retoque"  src={user.img} alt={`${user.nombre} ${user.apellido}`} />
                                            ) : (
                                                generateAvatar(user.nombre, user.apellido)
                                            )}
                                        </div>
                                        <div className="user-name">
                                            {user.nombre} {user.apellido}
                                        </div>
                                    </td>
                                    <td>{user.nombreDeUsuario}</td>
                                    <td>{user.correo}</td>
                                    <td>{formatDate(user.fechaRegistro)}</td>
                                    <td>
                                        <span className={`status ${user.estado?.toLowerCase()}`}>
                                            {user.estado}
                                        </span>
                                    </td>
                                    <td className="actions">
                                        <button 
                                            className="action-btn deactivate-btn" 
                                            onClick={() => toggleUserStatus(user.id)}
                                        >
                                            {user.estado === 'Activo' ? 'Desactivar' : 'Activar'}
                                        </button>
                                        <button 
                                            className="action-btn details-btn" 
                                            onClick={() => viewDetails(user)}
                                        >
                                            Ver detalles
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination">
                        <button onClick={previousPage} disabled={currentPage === 1}>
                            ←
                        </button>
                        
                        {/* Paginación dinámica */}
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                            const pageNumber = i + 1;
                            return (
                                <button 
                                    key={pageNumber}
                                    className={currentPage === pageNumber ? 'active' : ''} 
                                    onClick={() => setCurrentPage(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            );
                        })}
                        
                        {totalPages > 5 && (
                            <>
                                <span className="dots">...</span>
                                <button 
                                    className={currentPage === totalPages ? 'active' : ''} 
                                    onClick={() => setCurrentPage(totalPages)}
                                >
                                    {totalPages}
                                </button>
                            </>
                        )}
                        
                        <button onClick={nextPage} disabled={currentPage === totalPages}>
                            →
                        </button>
                    </div>

                    <div className="users-info">
                        Mostrando {startIndex + 1} - {Math.min(endIndex, filteredUsers.length)} de {filteredUsers.length} usuarios
                    </div>
                </>
            )}
        </div>
    );
}

export default ListaUs;