/* eslint-disable */
import React, { Component } from 'react';
import { Row, Col, Divider,Form, Avatar } from 'antd';

class Formularios extends Component {
	constructor(props, context) {
	super(props, context);
	this.state = {
	};
}

//Funcion que se ejecuta antes de renderizar el component
componentWillMount() {
	try{

	}catch(err){
		console.error('#ERROR Error en willMount de la pagina: ' + err);
	}
}
render() {
		try{
			return (
        <div>
				<Row>
					<Col span={24}>
						<Divider orientation="left"><h4>Flujo de trabajo</h4></Divider>
					</Col>
				</Row>
					<Row>
						<Col span={20} offset={2}>
						<img style={{marginBottom: "8%", marginTop: "5%", width: '100%', height: '80%'}} alt="Logo" src={ require('./flujo.png') } />
						</Col>
					</Row>
        </div>
			);
		}catch(err){
			console.log('Error al ejeutar la funcion render: ' + err);
		}
	}
}
export default Form.create()(Formularios);
