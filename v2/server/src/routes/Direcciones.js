const Direcciones = require('../models/Direcciones');

module.exports = function(app) {

    app.get('/datosbasicos/muestradirecciones' , (req, res) => {
        Direcciones.getDirecciones((err, data) => {
            res.status(200).json(data);
        })
    });

    app.post('/datosbasicos/muestradirecciones', (req, res) => {
        const direccionesData = {
            id_direcciones : null,
            calle :  req.body.calle,
            numero:  req.body.numero,
            piso  :  req.body. piso,
            departamento  :req.body.departamento,
            manzana : req.body.manzana,
            barrio  : req.body.barrio,
            localidad  :  req.body.localidad,
            provincia  :  req.body.provincia,
            codigo_postal :req.body.codigo_postal,
            uso  : req.body.uso
        };

        Direcciones.insertDirecciones(direccionesData, (err, data) => {
            if(data && data.insertId){
                res.json({
                    success: true,
                    msg  : 'Direccion insertada',
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

    app.put('/datosbasicos/muestradirecciones/:id', (req, res) => {

        const direccionesData = {
            id_direcciones: req.params.id,
            calle :  req.body.calle,
            numero:  req.body.numero,
            piso  :  req.body. piso,
            departamento  :req.body.departamento,
            manzana : req.body.manzana,
            barrio  : req.body.barrio,
            localidad  :  req.body.localidad,
            provincia  :  req.body.provincia,
            codigo_postal :req.body.codigo_postal,
            uso  : req.body.uso
        };

        Direcciones.updateDirecciones(direccionesData, (err, data) => {

            if (data && data.msg) res.json(data)
            else res.json({
                success : false,
                msg : 'Error al actualizar los datos de la direccion'
            })
        });
    });

    app.delete('/datosbasicos/muestradirecciones/:id', (req, res) => {
        Direcciones.deleteDirecciones(req.params.id, (err, result) => {
            if (result.msg === 'Dirección Eliminada' || result.msg === 'No existe el id buscado') {
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