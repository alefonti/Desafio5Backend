const express = require('express')
var exphbs = require('express-handlebars')
const app = express();
const dataStore = require('./dataStore');
const routerProductos = require('./productos.js');

const PORT = 8080;


const main = async () => {

   
   app.engine(  
    "hbs",
    exphbs({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts",
        partialsDir: __dirname + "/views/partials",
    }));
    

   app.set("view engine", "hbs");
   app.set("views", "./views");
   app.use(express.static('public'));
    

   

    app.get('/', async (req, res) => {
        res.redirect('/productos');
    });

    app.get('/productos', async (req, res) => {
        res.render('productList', { products: (await dataStore.getAll())});
    });

    app.get('/alta-producto', async (req, res) => {
        res.render('productForm', {});
    });


   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));
   app.use('/api/productos', routerProductos);

   let server = app.listen(PORT, function () {
       console.log(`Server running on port ${PORT}`);
   }
   );
   
   server.on("error", (error) => console.log(`Error en servidor ${error}`));


}

main();