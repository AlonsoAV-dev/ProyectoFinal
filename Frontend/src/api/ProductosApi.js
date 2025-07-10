import Password from "../pages/Password/Password";

const lista_productos = [
    {
        id: "8123",
        nombre: "Uvas",
        presentacion: "0,8kg",
        descripcion: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?",
        categoria: "Frutas y verduras",
        stock: 10,
        precio: 6.90,
        img: "./public/assets/uvas.png"
    },
    {
        id: "4343",
        nombre: "Peras",
        presentacion: "1kg",
        descripcion: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?",
        categoria: "Frutas y verduras",
        stock: 23,
        precio: 4.50,
        img: "./public/assets/peras.png"
    },
    {
        id: "9223",
        nombre: "Manzanas Rojas",
        presentacion: "0,3kg",
        descripcion: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?",
        categoria: "Frutas y verduras",
        stock: 21,
        precio: 2.90,
        img: "./public/assets/manzanas.png"
    },
    {
        id: "4344",
        nombre: "Sandía",
        presentacion: "1kg",
        descripcion: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?",
        categoria: "Frutas y verduras",
        stock: 10,
        precio: 3.20,
        img: "./public/assets/Sandía.png"
    },
    {
        id: "6425",
        nombre: "Leche gloria",
        presentacion: "8 unidades",
        descripcion: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?",
        categoria: "Lacteos y huevos",
        stock: 30,
        precio: 12.90,
        img: "./public/assets/leche_gloria.png"
    },
    {
        id: "5454",
        nombre: "Pollo entero fresco con menudencia",
        presentacion: "2,2kg",
        descripcion: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?",
        categoria: "Carnes, aves y pescados",
        stock: 3,
        precio: 21.50,
        img: "./public/assets/Pollo.png"
    },
    {
        id: "2344",
        nombre: "Papaya",
        presentacion: "0,8kg",
        descripcion: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Provident aperiam obcaecati tempore iure, iste odio maxime repellendus earum eius? Repellat molestias totam earum, corporis cumque corrupti praesentium sit maxime neque?",
        categoria: "Frutas y verduras",
        stock: 15,
        precio: 4.80,
        img: "./public/assets/papaya.png"
    }
];

const lista_categorias = [
    { id: "1", nombre: "Frutas y verduras", descripcion: "Productos frescos como frutas y vegetales." },
    { id: "2", nombre: "Lacteos y huevos", descripcion: "Productos derivados de la leche y huevos." },
    { id: "3", nombre: "Carnes, aves y pescados", descripcion: "Carnes frescas, aves y pescados." },
    { id: "4", nombre: "Abarrotes", descripcion: "Productos básicos y alimentos no perecibles." },
    { id: "5", nombre: "Panaderia", descripcion: "Pan, pasteles y productos horneados." },
    { id: "6", nombre: "Congelados", descripcion: "Alimentos congelados y listos para cocinar." },
    { id: "7", nombre: "Juguetes", descripcion: "Juguetes y productos para niños." },
    { id: "8", nombre: "Ropa", descripcion: "Prendas de vestir y accesorios." }
];

const lista_usuarios = [
    {
        id: "u001",
        nombre: "Juan Perez",
        correo: "juan.perez@gmail.com",
        fechaRegistro: "20/01/2025",
        estado: "Activo",
        img: "./public/assets/user2.png"
    },
    {
        id: "u002",
        nombre: "Alejandro Ruiz",
        correo: "alejandro.ruiz@gmail.com",
        fechaRegistro: "15/01/2025",
        estado: "Inactivo",
        img: "./public/assets/user1.png"
    },
    {
        id: "u003",
        nombre: "María Gonzales",
        correo: "maria.gonzales@gmail.com",
        fechaRegistro: "22/01/2025",
        estado: "Activo",
        img: "./public/assets/user3.png"
    },
    {
        id: "u004",
        nombre: "Marco Aurelio",
        correo: "marco.aurelio@gmail.com",
        fechaRegistro: "23/01/2025",
        estado: "Activo",
        img: "./public/assets/user1.png"
    },
    {
        id: "u005",
        nombre: "Ana Díaz",
        correo: "ana.diaz@gmail.com",
        fechaRegistro: "24/01/2025",
        estado: "Activo",
        img: "./public/assets/user3.png"
    },
    {
        id: "u006",
        nombre: "Carlos Lopez",
        correo: "carlos.lopez@gmail.com",
        fechaRegistro: "25/01/2025",
        Password: "123456",
        estado: "Activo",
        img: "./public/assets/user2.png"
    },
    {
        id: "u007",
        nombre: "Laura Mendez",
        correo: "laura.mendez@gmail.com",
        fechaRegistro: "26/01/2025",
        estado: "Activo",
        img: "./public/assets/user3.png"
    }
];

const lista_ordenes = [
    {
        id: "1234",
        usuarioId: "u002",
        fecha: "20/01/2025",
        total: 200.00,
        estado: "Entregado"
    },
    {
        id: "2356",
        usuarioId: "u001",
        fecha: "20/02/2025",
        total: 190.00,
        estado: "Entregado"
    },
    {
        id: "4577",
        usuarioId: "u001",
        fecha: "20/03/2025",
        total: 99.00,
        estado: "Entregado"
    },
    {
        id: "3743",
        usuarioId: "u001",
        fecha: "20/03/2025",
        total: 399.00,
        estado: "Entregado"
    },
    {
        id: "9001",
        usuarioId: "u002",
        fecha: "20/01/2025",
        total: 69.00,
        estado: "Entregado"
    }
];

const guardarEnLocalStorage = (clave, lista) => {
    localStorage.setItem(clave, JSON.stringify(lista));
};
const obtenerDesdeLocalStorage = (clave, listaInicial) => {
    const dataLS = localStorage.getItem(clave);
    if (dataLS) {
        try {
            const parsed = JSON.parse(dataLS);
            if (parsed.length === 0) {
                return listaInicial;
            }
            return parsed;
        } catch {
        return listaInicial;
        }
    }
    return listaInicial;
};

const usuarioApi = {
    obtenerUsuarios: () => obtenerDesdeLocalStorage("usuarios", lista_usuarios),
    guardarUsuarios: (usuarios) => guardarEnLocalStorage("usuarios", usuarios)
};

const ordenApi = {
    obtenerOrdenes: () => obtenerDesdeLocalStorage("ordenes", lista_ordenes),
    guardarOrdenes: (ordenes) => guardarEnLocalStorage("ordenes", ordenes)
};

const productoApi = {
    obtenerProductos: () => obtenerDesdeLocalStorage("productos", lista_productos),
    guardarProductos: (productos) => guardarEnLocalStorage("productos", productos),
    obtenerCategorias: () => {
        return lista_categorias;
    }
};

export default {
    productoApi,
    usuarioApi,
    ordenApi
};


