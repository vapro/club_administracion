import React , {Component} from 'react';
import Axios from 'axios';
import '../../css/styles.css'

class Categorias extends Component {

    constructor(props){
        super(props);
        this.state = {
            datosCategorias : [],
            categorias : [],
            borrar : false
        }
    }

    componentDidMount(){
        console.log();
        /*fetch('localhost:3005/administracion/muestracategorias')*/
        /*Axios.get('localhost:3005/administracion/muestracategorias')*/
        Axios.get('categorias.json')
            .then((response)=>{
                this.setState({
                    datosCategorias : response.data,
                    categorias : response.data,
                    borrar : false
                });
            })
            .catch((error) =>{
                console.log(error); // Network Error
                console.log(error.status); // undefined
                console.log(error.code); // undefined
            })
    };

    render() {
        function popUp(e){
            this.setState({
                borrar : e.target.value
            });
/*
            e.preventDefault();
            prompt('Categoria ' + idCategoria);
*/
        }
        return (
            <div>
                <h2> CATEGORIAS </h2>
                <ul className="card">
                    <div className="card-body">
                        {this.state.datosCategorias.map(
                            datosCategorias => (
                                <li key={datosCategorias.id_categoria} className="container-fluid contenedor">
                                    {datosCategorias.descripcion} - {datosCategorias.descripcion_larga}
                                    <div className="subcontenedor">
                                        <div className="text-right pl-3"><a href="#" className="badge badge-warning"><i className="fas fa-pencil-alt"></i></a></div>
                                        <div className="text-right pl-1"><a name="borrar" onClick={this.popUp.bind(this)} href="#" className="badge badge-danger"><i className="fas fa-times"></i></a></div>        
                                    </div>
                                </li>
                            )
                        )}
                    </div>
                </ul>
            </div>
        );
    }

    /*
    render() {
        return (
            <div>
                <h2> CATEGORIAS </h2>
                <ul>
                    {this.state.datosCategorias.map(
                        datosCategorias => (
                            <li key={datosCategorias.id_categoria}>
                                {datosCategorias.descripcion} - {datosCategorias.descripcion_larga}
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    }
    */
}

export default Categorias;