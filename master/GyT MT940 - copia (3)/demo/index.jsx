/* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import App, { reducer } from './AppContainer';
import axios from 'axios';
import Transaccion from './Components/Transaccion';
import Cuentas from './Components/Cuentas';
import Cookies from 'js-cookie';
import Flujo from './Components/Flujo';
import Page404 from './Components/Page404';
import Formularios from './Components/Grupos';
// Make allowances for gh-pages routing
// main path is project name
let mainPath = '/';
if (GH_PAGES) { // eslint-disable-line no-undef
  mainPath = NAME; // eslint-disable-line no-undef
}


function rolesRutas(transition){
	console.log("funcion rolesRutas");
	//Get de los roles del usuario logeado actualmente
	var roles = null;
	roles = Cookies("userRoles");
	try{
		roles = Cookies("userRoles");
	}catch(err){
		roles = [];
		console.error("No se encontraron role en la funcion de rutas");
	}


}



// Add the reducer to your store on the `routing` key
const store = createStore(
  combineReducers({
    app: reducer,
    routing: routerReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

const routes = (
	<Route path={mainPath} component={App}>
		<IndexRoute component={Flujo} />
    <Route path="/transaction" component={Transaccion} onEnter={ rolesRutas } />
		<Route path="/cuentas" component={Cuentas} onEnter={ rolesRutas } />
		<Route path="/flujo" component={Flujo} onEnter={ rolesRutas } />
		<Route path="/notificaciones" component={Formularios} onEnter={ rolesRutas } />
		<Route path="*" component={Page404} />
	</Route>
  );

// set app div height
document.getElementById('app').style['min-height'] = '100vh';

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('app') // eslint-disable-line comma-dangle
);
