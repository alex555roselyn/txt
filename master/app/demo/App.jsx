/* eslint-disable */
import React, { Component } from 'react';
import ReactDOM from "react-dom";
import {Dashboard,Header,Sidebar } from '../src/index';
import menu from './menu';
import { browserHistory } from 'react-router';
import { hot } from 'react-hot-loader/root';
import { Button } from 'antd';
import mover from './move';
import regeneratorRuntime from 'regenerator-runtime';
import Cookies from 'js-cookie';
import Keycloak from './keycloak';
import axios from 'axios';

class App extends Component{
  constructor(props, context) {
  super(props, context);
  this.state = {
    menu: [],
    authenticated: false,
	userName:null,
	keycloak:null,
	roles:null,
	logo:'public/default.jpg',
	authenticated:false,
keycloakConfig: {
		"url":"http://104.198.180.31:8080/auth/",
		"clientId":"clienttest",
		  "ssl-required": "none",
		   "verify-token-audience": true,
		"realm":"TXTRV2",
				  "credentials": {
    "secret": "6a868ea5-8fdd-4068-8262-580e49f2bb7e"
  }
	}
};
	this.apiMenu = 'http://localhost:5005/menu';
	this.navMenu = this.navMenu.bind(this);
	this.sb = this.sb.bind(this);
	this.footer = this.footer.bind(this);
	this.crearMenu = this.crearMenu.bind(this);
	this.limpiarCokies = this.limpiarCokies.bind(this);
	this.abrirUrl = this.abrirUrl.bind(this);
	this.loginDeKeycloak = this.loginDeKeycloak.bind(this);
	this.updateToken = this.updateToken.bind(this);
	this.getUserInfo = this.getUserInfo.bind(this);
	this.getGroupId = this.getGroupId.bind(this);
	this.getGroup = this.getGroup.bind(this);
	this.getMenuFunction = this.getMenuFunction.bind(this);
	this.actualizarToken = this.actualizarToken.bind(this);
	
}

getGroupId(userID,token){
	try{
		//console.log("Ejecucuion de get users");
		/*axios.get('http://104.198.180.31:8080/auth/admin/realms/TXTRV2/users/'+userID+'/groups',{
			headers: {
				'Authorization': 'Bearer ' + token
			}
		})
			.then(res => {
				this.getGroup(res.data[0].id,token);
				console.log(res.data[0].id);
			})*/
	}catch(err){
		console.error('##Error get del grupo del usuario conectado: ' + err);
	}
}

//Funcion para hacer el get a keycloak y traer la descripcion del grupo al que pertence el usuario en caso de ser de banco
getGroup(grupId,token){
	try{
		/*axios.get('http://104.198.180.31:8080/auth/admin/realms/TXTRV2/groups/'+grupId,{
			headers: {
				'Authorization': 'Bearer ' + token
			}
		}
		).then(res => {
				Cookies.remove("groupID");
				Cookies("groupID", res.data.attributes.id[0]);
				this.setState({
					logo:res.data.attributes.logo[0]
				});
			})*/
	}catch(err){
		console.error('##Error get de los atributos del grupo del usuario conectado: ' + err);
	}
}

getMenuFunction(){
	try{
		var menu = [];
		var roles = Cookies("userRoles");
		//console.error(roles);
		roles = roles.replace(/'/g, '"');
		roles = JSON.parse(roles);
		var menuCompleto = false;
		var i;
if(1==1)
{

		menu = [{"titulo": "Mensajes","icon": "fa fa-envelope-open-o","enlace": "/mensajes"},{"titulo": "Grupos","icon": "fa fa-wpforms","enlace": "/grupos"},{"titulo": "Contactos","icon": "fa fa-address-book-o","enlace": "/contactos"},{"titulo": "Plantillas","icon": "fa fa-envelope-open-o","enlace": "/plantillas"}];
}
		return menu;
	}catch(err){
		console.error("Fallo la funcion que construye el menu: "+err);

	}
}

componentDidMount() {
	try{
		//console.log("init");
	}catch(err){
		console.error('Error en el get para llenar la tabla: ' + err);
	}
}

getUserInfo(){
	this.state.keycloak.loadUserProfile().success((profile) => {
		this.setState({
			userName:profile.firstName.toString()+" "+profile.lastName.toString()
		});
	}).error(() => {
	  alert('Failed to load user profile');
	});
	this.state.keycloak.loadUserInfo().success((info) => {
	}).error(() => {
	  alert('Failed to load user profile');
	});

}

updateToken(){

	try{
		this.state.keycloak.updateToken(5).success(function() {
			Cookies("token",this.state.keycloak.token);

			

		});
	}catch(err){
		console.error("Fallo el update del token: "+err);
	}
}


actualizarToken(){
	try{
		Cookies("token",this.state.keycloak.token);
	}catch(err){
		console.error("Fallo el update de la cookie del token: "+err);
	}

}


loginDeKeycloak(){
	const keycloak = Keycloak(this.state.keycloakConfig);
	keycloak.init({onLoad: 'login-required',refreshToken:30})
	.then(authenticated => {
		this.getGroupId(keycloak.subject,keycloak.token);
		Cookies.remove("userRoles");
		//var userName = keycloak.profile.username.toString();
		this.setState({
			userName:"UserName"
		});
		var objNew = keycloak.profile;
		Cookies("userRoles",keycloak.realmAccess.roles);
		this.setState({roles:keycloak.realmAccess.roles});




		Cookies("token",keycloak.token);
		this.setState({keycloak:keycloak});
		 this.intervalID = setInterval(
          () => this.updateToken(),
          20000
        );
		this.getUserInfo();
		this.setState({
			 menu: this.getMenuFunction()
		});
		this.intervalID = setInterval(
          () => this.actualizarToken(),
          1000
        );
	});
}

componentWillMount() {
		try{
			this.loginDeKeycloak();
			this.theme = 'skin-green';
		}catch(err){
			console.error('Error en WillMount de la pagina: ' + err);
		}
	}

limpiarCokies(){
	Cookies.remove("userRoles");
	var roles = [];
	Cookies.remove("groupID");
	//Cookies("userRoles",roles);

	Cookies.remove('token');
	this.state.keycloak.logout();
}

navMenu() {
    return (
      <Header.UserMenu
        name={this.state.userName}
        image={this.state.logo}
        signOutAction={() => this.limpiarCokies()}
        key="2"

      />
    );
}

abrirUrl(url){
  this.props.router.push(url.enlace)
}

crearMenu(menu,index) {
  try{
    if(menu.hasOwnProperty('subMenus')){
      if(menu.subMenus.length > 0){
        return  <Sidebar.Menu.Item
                icon={{ className: menu.icon }}
                href={menu.enlace}
                onClick={ () => this.abrirUrl(menu)}
                title= {menu.titulo}
                key={menu.titulo + menu.enlace}>
                {menu.subMenus.map(item => this.crearMenu(item))}
              </Sidebar.Menu.Item>;
      }else{
        return <Sidebar.Menu.Item onClick={ () => this.abrirUrl(menu)} title={menu.titulo} href={menu.enlace} icon={{ className: menu.icon }} key={menu.titulo + menu.enlace} />
      }
    }else{
      return <Sidebar.Menu.Item onClick={ () => this.abrirUrl(menu)} title={menu.titulo} href={menu.enlace} icon={{ className: menu.icon }} key={menu.titulo + menu.enlace} />
    }
  }catch(err){
    console.error('Error en la funcion que crea el menu: ' + err);
  }
}

sb(){
    var that = this;
      return(
        <Sidebar.Menu header="Navegación" background="red" key="1">
        {this.state.menu.map(function(obj, index){
          try{
            return that.crearMenu(obj,index);
          }catch(ex){
            console.error('Error en map function: ' + ex);
          }
        })}
        </Sidebar.Menu>
      );
}

footer(){
  return(
    <strong>
      <span>Copyright © 2018 </span>
      <a>Imagenes Computarizadas de Guatemala</a>
      <span>. </span>
    </strong>,
    <span> All rights reserved.</span>,
    <div style={{ float: 'right' }}>
      <b>Version </b>
      <span>1.0.0</span>
    </div>
  );
}

render(){
	if (this.state.keycloak && this.state.roles) {
		return(
			<Dashboard
				navbarChildren={this.navMenu()}
				sidebarChildren={this.sb()}
				footerChildren={this.footer()}
				sidebarMini
				theme={this.theme}
			>
			{this.props.children}
			</Dashboard>



		);
	}
	return (
		<div>Iniciando aplicacion...</div>
	);
}






}

export default hot(App);