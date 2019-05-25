const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// Settings

//app.set('port', process.env.PORT||3000); // Setea el puerto del servidor (PROD) o el 3000 en localhost
app.set('port', 3005);
// Middlewares ->   Son funciones que se ejecutan cada vez que se hacen peticiones al servidor
                //  Son los que le van a decir que vamos a generar las APIS

app.use(morgan('dev')); // Muestra la salida por consola
app.use(bodyParser.json());
app.use(cors( origin = 'http://localhost:3000' ));
// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Rutas:
//  Le paso a userRoutes el objeto app, que está configurado mas arriba

/*  Administración  */ 
require('./routes/categorias')(app);
require('./routes/actividades')(app);

/*  Datos personales  */
require('./routes/direcciones')(app);
require('./routes/telefonos')(app);
require('./routes/datospersonales')(app);


app.listen(app.get('port'), () => {
    console.log('Server listening on port ' + app.get('port'))
})