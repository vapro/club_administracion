const connection = require('./Connection');

let Direcciones = {};

Direcciones.getDirecciones = (callback) => {
    if (connection){
        const querySelect = 'SELECT * FROM tb_direcciones';
        connection.query(
            querySelect,
            (err, rows) => {
                if(err) throw err;
                else callback(null, rows);
            }
        )
    }
};

Direcciones.insertDirecciones = (direccionesData, callback) => {
    if(connection){
        const queryInsert = 'INSERT INTO tb_direcciones SET ?';
        connection.query(
            queryInsert, direccionesData,
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

Direcciones.updateDirecciones = (direccionesData, callback) => {

    if(connection){
        const queryUpdate = `  UPDATE   tb_direcciones SET
                                        calle           = ${connection.escape(direccionesData.calle)},
                                        numero          = ${connection.escape(direccionesData.numero)},
                                        piso            = ${connection.escape(direccionesData.piso)},
                                        departamento    = ${connection.escape(direccionesData.departamento)},
                                        manzana         = ${connection.escape(direccionesData.manzana)},
                                        barrio          = ${connection.escape(direccionesData.barrio)},
                                        localidad       = ${connection.escape(direccionesData.localidad)},
                                        provincia       = ${connection.escape(direccionesData.provincia)},
                                        codigo_postal   = ${connection.escape(direccionesData.codigo_postal)},
                                        uso             = ${connection.escape(direccionesData.uso)}
                                WHERE   id_direcciones  = ${connection.escape(direccionesData.id_direcciones)}`;

        connection.query( queryUpdate, (err, result) => {
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

Direcciones.deleteDirecciones = (id, callback) => {   
    if(connection){
        let queryExisteDirecciones = ` SELECT * FROM tb_direcciones WHERE id_direcciones = ${connection.escape(id)} `;
        connection.query(queryExisteDirecciones, (err1, row) => {
            const numRows = row.length;
            console.log('numRows: '+numRows);
            if(numRows > 0) {
                let queryDeleteDirecciones = ` DELETE FROM tb_direcciones WHERE id_direcciones = ${connection.escape(id)} `; 
                connection.query(queryDeleteDirecciones, (err2, row) => {
                    if(err2) throw err2;
                    else {
                        callback(null, {
                            msg: 'Dirección Eliminada'
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

module.exports = Direcciones;