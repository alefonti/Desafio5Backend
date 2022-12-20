const express = require('express')
//import express from 'express';

const dataStore = require('./dataStore');

//import {DataStore} from  './dataStore.js'


const { Router } = express

const routerProductos = Router()



//const dataStore = new DataStore();

const initDataStore = async () => {

   // await dataStore.save({ title: "Escuadra", price: 123.45, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png" });
   // await dataStore.save({ title: "Calculadora", price: 234.56, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png" });
   // await dataStore.save({ title: "Globo Terráqueo", price: 345.67, thumbnail: "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png" });
}

initDataStore();
   
const validateProduct = (req, res, next) => {
    const { title, price, thumbnail } = req.body;
    if (!title || !price || !thumbnail) {
        return res.status(400).json({ error: "faltan datos del producto" });
    }
    next();
}   

routerProductos.get("/", async (req, res) => {
    const data = await dataStore.getAll();
    res.send(data);
});

routerProductos.get("/:id", async (req, res) => {
   const { id } = req.params;
   const data = await dataStore.getById(Number(id));
   if(data){
      res.send(data);
   }else{
      res.send({error: 'producto no encontrado'});
   }
});

routerProductos.post("/",validateProduct, async (req, res) => {
   const { title, price, thumbnail } = req.body;
   const data = await dataStore.save({ title, price, thumbnail });
   //res.send({id:data,title, price, thumbnail});
   res.redirect('/productos');
});


routerProductos.put("/:id",validateProduct, async (req, res) => {
   const { id } = req.params;
   const { title, price, thumbnail } = req.body;
   const data = await dataStore.updateById(Number(id), { id:Number(id), title, price, thumbnail });
   if(data){
      res.send({id,title, price, thumbnail});
   }else{
      res.send({error: 'producto no encontrado'});
   }
});


routerProductos.delete("/:id", async (req, res) => {
   const { id } = req.params;
   const data = await dataStore.getById(Number(id));
   if (data) {
      await dataStore.deleteById(Number(id));
      res.send("producto eliminado");
   } else {
      res.send({error: 'producto no encontrado'});
   }
});



module.exports = routerProductos