const DatosPersonales = require('../models/DatosPersonales');

module.exports = function(app) {

    app.get('/datosbasicos/datospersonales' , (req, res) => {
        DatosPersonales.getDatosPersonales((err, data) => {
            res.status(200).json(data);
        })
    });

    app.post('/datosbasicos/datospersonales', (req, res) => {
        const datosPersonalesData = {
            id_datos_personales  : null,
            dni                 : req.body.dni, 
            fecha_nacimiento    : req.body.fecha_nacimiento,
            apellido            : req.body.apellido, 
            nombre              : req.body.nombre,
            id_direccion_fk     : req.body.id_direccion_fk,
            direccion_mail      : req.body.direccion_mail,
            path_foto           : req.body.path_foto
        };

        DatosPersonales.insertDatosPersonales(datosPersonalesData, (err, data) => {
            if(data && data.insertId){
                res.json({
                    success: true,
                    msg  : 'Datos personal insertado',
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

    app.put('/datosbasicos/datospersonales/:id', (req, res) => {

        const datosPersonalesData = {
            id_datos_personales  : req.params.id,
            dni                 : req.body.dni, 
            fecha_nacimiento    : req.body.fecha_nacimiento,
            apellido            : req.body.apellido, 
            nombre              : req.body.nombre,
            id_direccion_fk     : req.body.id_direccion_fk,
            direccion_mail      : req.body.direccion_mail,
            path_foto           : req.body.path_foto
        };

        DatosPersonales.updateDatosPersonales(datosPersonalesData, (err, data) => {

            if (data && data.msg) res.json(data)
            else res.json({
                success : false,
                msg : 'Error al actualizar los datos personales'
            })

        });
    });

    app.delete('/datosbasicos/datospersonales/:id', (req, res) => {
        DatosPersonales.deleteDatosPersonales(req.params.id, (err, result) => {
            console.log(result);
            if (result.msg === 'Datos Personales Eliminada' || result.msg === 'No existe el id buscado') {
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