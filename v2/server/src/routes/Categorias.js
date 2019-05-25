const Categorias = require('../models/Categorias');

module.exports = function(app) {

    /*Muestra el listado de categorias*/
    app.get('/administracion/muestracategorias' , (req, res) => {
        Categorias.getCategorias((err, data) => {
            res.status(200).json(data);
        })
    });

    /* Inserta una categoria nueva*/
    app.post('/administracion/muestracategorias', (req, res) => {
        const categoriasData = {
            id_categoria : null,
            descripcion : req.body.descripcion, 
            descripcion_larga : req.body.descripcion_larga
        };

        Categorias.insertCategorias(categoriasData, (err, data) => {
            if(data && data.insertId){
                res.json({
                    success: true,
                    msg  : 'Categoria insertada',
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

    app.put('/administracion/muestracategorias/:id', (req, res) => {

        const categoriasData = {
            id_categoria    : req.params.id,
            descripcion     : req.body.descripcion,
            descripcion_larga : req.body.descripcion_larga
        };

        Categorias.updateCategorias(categoriasData, (err, data) => {

            if (data && data.msg) res.json(data)
            else res.json({
                success : false,
                msg : 'Error al actualizar los datos de la categoria'
            })

        });
    });

    app.delete('/administracion/muestracategorias/:id', (req, res) => {
        Categorias.deleteCategorias(req.params.id, (err, result) => {
            console.log(result);
            if (result.msg === 'Categoria Eliminada' || result.msg === 'No existe el id buscado') {
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