const connection = require('./Connection');

let Telefonos = {};

Telefonos.getTelefonos = (callback) => {
    if (connection){
        const querySelect = 'SELECT * FROM tb_agrupador_telefonos';
        connection.query(
            querySelect,
            (err, rows) => {
                if(err) throw err;
                else callback(null, rows);
            }
        )
    }
};

Telefonos.insertTelefonos = (telefonosData, callback) => {
    if(connection){
        const queryInsert = 'INSERT INTO tb_agrupador_telefonos SET ?';
        connection.query(
            queryInsert, telefonosData,
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

Telefonos.updateTelefonos = (telefonosData, callback) => {

    if(connection){
        const queryUpdate = `  UPDATE   tb_agrupador_telefonos SET
                                        id_datos_personales_fk =  ${connection.escape(telefonosData.id_datos_personales_fk)},
                                        domicilio    =   ${connection.escape(telefonosData.domicilio)},
                                        celular      =   ${connection.escape(telefonosData.celular)}
                               WHERE    id_agrupador =   ${connection.escape(telefonosData.id_agrupador)} `;
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

Telefonos.deleteTelefonos = (id, callback) => {   
    if(connection){
        let queryExisteTelefonos = ` SELECT * FROM tb_agrupador_telefonos WHERE id_agrupador = ${connection.escape(id)} `;
        connection.query(queryExisteTelefonos, (err1, row) => {
            const numRows = row.length;
            console.log('numRows: '+numRows);
            if(numRows > 0) {
                let queryDeleteTelefonos = ` DELETE FROM tb_agrupador_telefonos WHERE id_agrupador = ${connection.escape(id)} `; 
                connection.query(queryDeleteTelefonos, (err2, row) => {
                    if(err2) throw err2;
                    else {
                        callback(null, {
                            msg: 'Telefono Eliminado'
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

module.exports = Telefonos;