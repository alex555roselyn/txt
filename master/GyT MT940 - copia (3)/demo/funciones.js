/* eslint-disable */
import React, { Component } from 'react';

export default class B extends Component {
	constructor(props){
		super(props);
	}

	componentWillMount() {
		try{
			console.log("Se inicio el nuevo componente");
		}catch(err){
		console.error('#ERROR Error en willMount de la pagina: ' + err);
		}
	}

	nuevoDato(){
		console.log("############\
					############\
					############\
					############\
					############");
	}

	abc(){
		alert('Hello World');
	}

	render() {
		return (
			<View>
				<Text>Welcome to React Native</Text>
			</View>
		);
	}
}