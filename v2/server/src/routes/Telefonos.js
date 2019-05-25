const Telefonos = require('../models/Telefonos');

module.exports = function(app) {

    app.get('/datosbasicos/muestratelefonos' , (req, res) => {
        Telefonos.getTelefonos((err, data) => {
            res.status(200).json(data);
        })
    });

    app.post('/datosbasicos/muestratelefonos', (req, res) => {
        const telefonosData = {
            id_agrupador : null,
            id_datos_personales_fk :  req.body.id_datos_personales_fk,
            domicilio:  req.body.domicilio,
            celular  :  req.body.celular
        };

        Telefonos.insertTelefonos(telefonosData, (err, data) => {
            if(data && data.insertId){
                res.json({
                    success: true,
                    msg  : 'Telefono insertado',
                    data : data
                })
            } else {
                res.status(500).json({
                    success : false,
                    msg     : 'Error interno' 
                })
            }
        }); 
    });    

    app.put('/datosbasicos/muestratelefonos/:id', (req, res) => {

        const telefonosData = {
            id_agrupador : req.params.id,
            id_datos_personales_fk :  req.body.id_datos_personales_fk,
            domicilio    :   req.body.domicilio,
            celular      :   req.body.celular
        };

        Telefonos.updateTelefonos(telefonosData, (err, data) => {

            if (data && data.msg) res.json(data)
            else res.json({
                success : false,
                msg : 'Error al actualizar los datos de los telefonos'
            })
        });
    });

    app.delete('/datosbasicos/muestratelefonos/:id', (req, res) => {
        Telefonos.deleteTelefonos(req.params.id, (err, result) => {
            console.log(result);
            if (result.msg === 'Telefono Eliminado' || result.msg === 'No existe el id buscado') {
                res.json({
                    success : true,
                    msg  : result.msg
                })
            } else {
                res.status(500).json({
                    success : false,
                    msg : 'Error'
                })
            }
        })
    })

}