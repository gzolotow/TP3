const fs = require("fs");
const dayjs = require("dayjs");
const axios = require("axios");

const RUTA = "./productos.json";


// 1. MOSTRAR PRODUCTOS
function mostrarProductos() {
    const data = fs.readFileSync(RUTA, "utf8");
    const productos = JSON.parse(data);

    console.log("Lista de productos:");
    productos.forEach(p => {
        console.log(`${p.id} - ${p.nombre} - $${p.precio}`);
    });
}


// 2. AGREGAR PRODUCTO
function agregarProducto(nombre, precio) {
    const data = fs.readFileSync(RUTA, "utf8");
    const productos = JSON.parse(data);

    const nuevoId = productos.length > 0 ? productos[productos.length - 1].id + 1 : 1;

    productos.push({
        id: nuevoId,
        nombre,
        precio
    });

    fs.writeFileSync(RUTA, JSON.stringify(productos, null, 2));

    console.log("Producto agregado con ID:", nuevoId);
}


// 3. FECHA
function mostrarFecha() {
    const ahora = dayjs();

    console.log("Fecha actual:", ahora.format("DD/MM/YYYY"));
    console.log("Hora actual:", ahora.format("HH:mm"));
}


// 4. API PAISES
async function obtenerPais(nombre) {
    try {
        const res = await axios.get(`https://restcountries.com/v3.1/name/${nombre}`);
        const pais = res.data[0];

        console.log("País:", pais.name.common);
        console.log("Capital:", pais.capital[0]);
        console.log("Región:", pais.region);
        console.log("Población:", pais.population);

    } catch {
        console.log("Error al buscar país");
    }
}

