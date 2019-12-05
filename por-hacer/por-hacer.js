const fs = require('fs');

let listPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listPorHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('o se pudo grabar', err);
    })
}


const cargarDB = () => {
    try {
        listPorHacer = require('../db/data.json');
    } catch (error) {
        listPorHacer = []
    }

}

const getListado = () => {
    cargarDB();
    return listPorHacer;
}

const crear = (descripcion) => {

    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listPorHacer.push(porHacer);
    guardarDB();
    return porHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listPorHacer[index].completado = completado;

        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    console.log(descripcion);
    cargarDB();

    let nuevoListado = listPorHacer.filter(tarea => {
        return tarea.descripcion !== descripcion
    });

    if (listPorHacer.length !== nuevoListado.length) {
        listPorHacer = nuevoListado
        guardarDB();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}