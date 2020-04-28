/* eslint-disable */
import React, { Component } from 'react';
import { Button, Modal, Row, Col, Divider,Form, message,Icon, Input, Radio, InputNumber, Alert, Upload, Select, Dropdown, Menu, DatePicker } from 'antd';
import Keycloak from 'keycloak-js';
import Authenticate from 'react-openidconnect';
import configKeycloack from './configKeycloak';

class Secured extends Component {

	constructor(props) {
		super(props);
		this.state = { keycloak: null, authenticated: false };
		
		this.click = this.click.bind(this);
	}

	componentDidMount() {
		const keycloak = Keycloak(configKeycloack);
		console.log(keycloak);
		keycloak.init({onLoad: 'login-required'}).then(authenticated => {
			console.log(authenticated);
			this.setState({ keycloak: keycloak, authenticated: authenticated })
		});
		this.setState({
			key:keycloak
		});
	}

	click(){
		console.log(this.state);
		this.state.key.loadUserInfo().then(userInfo => {
			console.log(userInfo);
		});
	}

	render(){
		if (this.state.keycloak) {
		if (this.state.authenticated) return (
			<div>
			<p>This is a Keycloak-secured component of your application. You shouldn't be able
			to see this unless you've authenticated with Keycloak.</p>
			</div>
		); else return (<div>Unable to authenticate!</div>)
		}
		return (
		<div><Button style={{ marginLeft: 8 }} onClick={this.click} >
			acciones <Icon type="down" />
		</Button></div>
		);
	}
}
export default Secured;
