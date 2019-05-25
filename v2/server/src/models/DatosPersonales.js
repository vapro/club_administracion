const connection = require('./Connection');

let DatosPersonales = {};

DatosPersonales.getDatosPersonales = (callback) => {
    if (connection){
        const querySelect = 'SELECT * FROM tb_datos_personales';
        connection.query(
            querySelect,
            (err, rows) => {
                if(err) throw err;
                else callback(null, rows);
            }
        )
    }
};

DatosPersonales.insertDatosPersonales = (DatosPersonalesData, callback) => {
    if(connection){
        const queryInsert = 'INSERT INTO tb_datos_personales SET ?';
        connection.query(
            queryInsert, DatosPersonalesData,
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

DatosPersonales.updateDatosPersonales = (DatosPersonalesData, callback) => {

    if(connection){
        const queryUpdate = `  
            UPDATE  tb_datos_personales SET
                    dni =  ${connection.escape(DatosPersonalesData.dni)},
                    fecha_nacimiento    =   ${connection.escape(DatosPersonalesData.fecha_nacimiento)},
                    apellido            =   ${connection.escape(DatosPersonalesData.apellido)},
                    nombre              =   ${connection.escape(DatosPersonalesData.nombre)},
                    id_direccion_fk     =   ${connection.escape(DatosPersonalesData.id_direccion_fk)},
                    direccion_mail      =   ${connection.escape(DatosPersonalesData.direccion_mail)},
                    path_foto           =   ${connection.escape(DatosPersonalesData.path_foto)}
            WHERE   id_datos_personales =   ${connection.escape(DatosPersonalesData.id_datos_personales)} `;
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

DatosPersonales.deleteDatosPersonales = (id, callback) => {   
    if(connection){
        let queryExisteDatosPersonales = ` SELECT * FROM tb_datos_personales WHERE id_datos_personales = ${connection.escape(id)} `;
        connection.query(queryExisteDatosPersonales, (err1, row) => {
            const numRows = row.length;
            console.log('numRows: '+numRows);
            if(numRows > 0) {
                let queryDeleteDatosPersonales = ` DELETE FROM tb_datos_personales WHERE id_datos_personales = ${connection.escape(id)} `; 
                connection.query(queryDeleteDatosPersonales, (err2, row) => {
                    if(err2) throw err2;
                    else {
                        callback(null, {
                            msg: 'Datos Personales Eliminada'
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

module.exports = DatosPersonales;