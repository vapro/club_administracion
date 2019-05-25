import React , {Component} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Administracion from './Administracion';
import Categorias from './administracion/Categorias';

import '../css/App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Categorias />
      </div>
    );
  }
}
/*<BrowserRouter>
          <Header /> 
          
          <Administracion />
          <Cuotas />
          <Footer />
        </BrowserRouter>*/
export default App;