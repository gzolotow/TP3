const fs = require("fs");
const dayjs = require("dayjs");
const axios = require("axios");

const RUTA = "./productos.json";


// 1 MOSTRAR PRODUCTOS
function mostrarProductos() {
    const data = fs.readFileSync(RUTA, "utf8");
    const productos = JSON.parse(data);

    console.log("Lista de productos:");
    productos.forEach(p => {
        console.log(`${p.id} - ${p.nombre} - $${p.precio}`);
    });
}


// 2 AGREGAR PRODUCTO
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


// 3 FECHA
function mostrarFecha() {
    const ahora = dayjs();

    console.log("Fecha actual:", ahora.format("DD/MM/YYYY"));
    console.log("Hora actual:", ahora.format("HH:mm"));
}


// 4 API PAISES
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

// 5 BUSCAR PRODUCTO
function buscarProducto(nombre) {
    const data = fs.readFileSync(RUTA, "utf8");
    const productos = JSON.parse(data);

    const producto = productos.find(p => 
        p.nombre.toLowerCase() === nombre.toLowerCase()
    );

    if (producto) {
        console.log("Producto encontrado");
        console.log(`ID: ${producto.id}`);
        console.log(`Nombre: ${producto.nombre}`);
        console.log(`Precio: $${producto.precio}`);
    } else {
        console.log("Producto no encontrado");
    }
}


// 6 GENERAR CSV
function generarCSV() {
    const data = fs.readFileSync(RUTA, "utf8");
    const productos = JSON.parse(data);

    let csv = "id,nombre,precio\n";

    productos.forEach(p => {
        csv += `${p.id},${p.nombre},${p.precio}\n`;
    });

    fs.writeFileSync("productos.csv", csv);

    console.log("CSV generado");
}


// 7 CONTADOR
function contador() {
    let i = 1;

    const intervalo = setInterval(() => {
        console.log(i);

        if (i === 10) {
            console.log("Fin del contador");
            clearInterval(intervalo);
        }

        i++;
    }, 1000);
}


// 8 ANALIZAR TEXTO
function analizarTexto(texto) {
    const caracteres = texto.length;
    const palabras = texto.trim().split(/\s+/).length;

    const vocales = texto.match(/[aeiouáéíóú]/gi)?.length || 0;
    const consonantes = texto.match(/[bcdfghjklmnñpqrstvwxyz]/gi)?.length || 0;

    return {
        caracteres,
        palabras,
        vocales,
        consonantes
    };
}


// 9 VALIDAR PASSWORD
function validarPassword(password) {

    const esValida =
        password.length >= 8 &&
        /[0-9]/.test(password) &&
        /[A-Z]/.test(password);

    console.log(esValida ? "Password válida" : "Password inválida");
}


// PRUEBAS

  mostrarProductos();
 agregarProducto("Notebook", 500000);
 mostrarFecha();
 obtenerPais("Argentina");
 buscarProducto("Mouse");
 generarCSV();
 contador();

 console.log(analizarTexto("Hola mundo"));
 validarPassword("Hola1234");
