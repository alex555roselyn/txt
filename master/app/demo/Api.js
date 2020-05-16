/* eslint-disable */
import React, { Component } from 'react';

class Api extends Component
{
	constructor (props) {
		super(props);
		this.click = this.click.bind(this);
	}

	componentWillMount() {
		try{
			console.log("LA REPUTA MADRE QUE LOS PARIO");
		}catch(err){
			console.error('#Error en la funcion WillMount del componente Api: ' + err);
		}
	}

	click(){
		console.log("Click");
	}

}

export default Api;