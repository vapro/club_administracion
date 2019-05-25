const connection = require('./Connection');

let Categorias = {};

Categorias.getCategorias = (callback) => {
    if (connection){
        const querySelectCategorias = 'SELECT * FROM tb_categorias';
        connection.query(
            querySelectCategorias,
            (err, rows) => {
                if(err) throw err;
                else callback(null, rows);
            }
        )
    }
};

Categorias.insertCategorias = (categoriasData, callback) => {
    if(connection){
        const queryInsertCategorias = 'INSERT INTO tb_categorias SET ?';
        connection.query(
            queryInsertCategorias, categoriasData,
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

Categorias.updateCategorias = (categoriasData, callback) => {

    if(connection){
        const queryUpdateCategorias = `  UPDATE  tb_categorias SET
                                                 descripcion        = ${connection.escape(categoriasData.descripcion)},
                                                 descripcion_larga  = ${connection.escape(categoriasData.descripcion_larga)}
                                         WHERE   id_categoria       = ${connection.escape(categoriasData.id_categoria)}`;

        connection.query( queryUpdateCategorias, (err, result) => {
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

Categorias.deleteCategorias = (id, callback) => {   
    if(connection){
        let queryExisteCategorias = ` SELECT * FROM tb_categorias WHERE id_categoria = ${connection.escape(id)} `;
        connection.query(queryExisteCategorias, (err1, row) => {
            const numRows = row.length;
            console.log('numRows: '+numRows);
            if(numRows > 0) {
                let queryDeleteCategorias = ` DELETE FROM tb_categorias WHERE id_categoria = ${connection.escape(id)} `; 
                connection.query(queryDeleteCategorias, (err2, row) => {
                    if(err2) throw err2;
                    else {
                        callback(null, {
                            msg: 'Categoria Eliminada'
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
module.exports = Categorias;