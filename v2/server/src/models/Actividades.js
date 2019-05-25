const connection = require('./Connection');

let Actividades = {};

Actividades.getActividades = (callback) => {
    if (connection){
        const querySelectActividades = 'SELECT * FROM tb_actividades';
        connection.query(
            querySelectActividades,
            (err, rows) => {
                if(err) throw err;
                else callback(null, rows);
            }
        )
    }
};

Actividades.insertActividades = (actividadesData, callback) => {
    if(connection){
        const queryInsertActividades = 'INSERT INTO tb_actividades SET ?';
        connection.query(
            queryInsertActividades, actividadesData,
            (err, result) => {
                if(err) throw err;
                else{
                    callback(null, {
                        'insertId' : result.insertId
                    })
                }
            }
        )
    }
}

Actividades.updateActividades = (actividadesData, callback) => {

    if(connection){
        const queryUpdateActividades = ` UPDATE  tb_actividades SET
                                                 descripcion_actividad  = ${connection.escape(actividadesData.descripcion_actividad)},
                                                 precio                 = ${connection.escape(actividadesData.precio)}
                                         WHERE   id_actividad           = ${connection.escape(actividadesData.id_actividad)}`;

        connection.query( queryUpdateActividades, (err, result) => {
                if(err) throw err;
                else{
                    callback(null, {
                        'msg' : "success"
                    })
                }
            }
        )
    }
}

Actividades.deleteActividades = (id, callback) => {   
    if(connection){
        let queryExisteActividades = ` SELECT * FROM tb_actividades WHERE id_actividad = ${connection.escape(id)}`;
        connection.query(queryExisteActividades, (err1, row) => {
            const numRows = row.length;
            if(numRows > 0) {
                let queryDeleteActividades = ` DELETE FROM tb_actividades WHERE id_actividad = ${connection.escape(id)} `; 
                connection.query(queryDeleteActividades, (err2, row) => {
                    if(err2) throw err2;
                    else {
                        callback(null, {
                            msg: 'Actividad Eliminada'
                        })
                    }
                })            
            }
            else 
            {
                callback(null, {
                    msg: 'No existe el id buscado'
                });
            }
        })
    }
}

module.exports = Actividades;