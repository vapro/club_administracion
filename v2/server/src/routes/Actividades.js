const Actividades = require('../models/Actividades');

module.exports = function(app) {

    app.get('/administracion/muestraactividades' , (req, res) => {
        Actividades.getActividades((err, data) => {
            res.status(200).json(data);
        })
    });

    app.post('/administracion/muestraactividades', (req, res) => {
        const actividadesData = {
            id_actividad : null,
            descripcion_actividad : req.body.descripcion_actividad, 
            precio : req.body.precio
        };

        Actividades.insertActividades(actividadesData, (err, data) => {
            if(data && data.insertId){
                res.json({
                    success: true,
                    msg  : 'Actividad insertada',
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

    app.put('/administracion/muestraactividades/:id', (req, res) => {

        const actividadesData = {
            id_actividad: req.params.id,
            descripcion_actividad : req.body.descripcion_actividad,
            precio      : req.body.precio
        };

        Actividades.updateActividades(actividadesData, (err, data) => {

            if (data && data.msg) res.json(data)
            else res.json({
                success : false,
                msg : 'Error al actualizar los datos de la actividad'
            })

        });
    });

    app.delete('/administracion/muestraactividades/:id', (req, res) => {
        Actividades.deleteActividades(req.params.id, (err, result) => {
            console.log(result);
            if (result.msg === 'Actividad Eliminada' || result.msg === 'No existe el id buscado') {
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