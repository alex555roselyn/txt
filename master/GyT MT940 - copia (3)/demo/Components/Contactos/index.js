/* eslint-disable */
import React, { Component } from 'react';
import {  Switch, Button, Modal, Row, Col, Divider,Form, message,Icon, Input, Radio, InputNumber, Alert, Upload, Select, Dropdown, Menu, DatePicker, Table, Tag, Popover, Tooltip} from 'antd';
const { TextArea } = Input;
const confirm = Modal.confirm;
import B from '../../funciones';
const RangePicker = DatePicker.RangePicker;
import 'antd/dist/antd.css';
import ReactDataGrid from 'react-data-grid';
const { Toolbar,Filters, Data: { Selectors } } = require('react-data-grid-addons');
import './style.css';
import 'react-bootstrap-table/css/react-bootstrap-table.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const FormItem = Form.Item;
import Api from '../../Api';
const AutoCompleteFilter = Filters.AutoCompleteFilter;
import { BootstrapTable, TableHeaderColumn, InsertButton, ExportCSVButton } from 'react-bootstrap-table';
import axios from 'axios';
import ReactFileReader from 'react-file-reader';
import Cookies from 'js-cookie';

message.config({
	top: 100,
	duration: 5,
});
const { Option } = Select;
var children = [];



var destinos=[];

var tables=[];
var ch;

var tab2=[];

class Contactos extends Component {
	constructor(props, context) {
	super(props,context);
	const { router, params, location, routes } = this.props
	this.state = {
		valor:'Activo',
		agregarnumero:false,
		phone:[],
		contactsTab:[],
		selectedRowKeys:[],
		gr: null,
		edit: false,
		estado:1,
		response:null,
		body:[],
		destination:[],
		value:[],
		value2:null,
		contacts:[],
		grupos:[],
		values: '',
		file:null,
		g1:[],
		selectRowProp: {},
		rowSelected: {},
		selected:undefined,
		fileName:'Seleccionar archivo csv',
		keycloakConfig: {
		"url":"http://104.198.180.31:8080/auth/",
		"clientId":"texter",
		  "ssl-required": "external",
		   "verify-token-audience": true,
		"realm":"master",
				  "credentials": {
    "secret": "1960483a-0d67-4a7d-8294-d639a5c3d0b3"
  }
},
		baseApi: 'http://172.19.12.12:8080',
		columnasHistorial: [
			{
				title: 'Etapa',
				render: text => <a href="javascript:;">{text}</a>,
				dataIndex: 'etapa',
			},
			{
				title: 'Fecha',
				dataIndex: 'fecha'
			},
			{
				title: 'Usuario',
				dataIndex: 'usuario',
				key:"usuarios",
			},
			{
				title: 'Causa de rechazo',
				dataIndex: 'comentario'
			}
		],
		columnasAlertas: [
			{
				title: 'Contacto',
				dataIndex: 'nombre'
			},
			{
				title: 'Destinatario',
				render: text => <a href="javascript:;">{text}</a>,
				dataIndex: 'destinatario',
			},
			{
				title: 'Nivel',
				dataIndex: 'nivel'
			},
			{
				title: 'Fecha',
				dataIndex: 'fecha'
			},
			{
				title: 'Mensaje',
				dataIndex: 'mensaje'
			}
		],
		crearVisible:false,
		data:[],
		remitentes:[
			{
				"id":1,
				"nombre":"gyt@gyt.com.gt"
			}
		],
		tiposEnvio:[
			{
				"id":1,
				"nombre":"Correo electronico"
			},
			{
				"id":2,
				"nombre":"Swift"
			},
			{
				"id":3,
				"nombre":"Adjunto correo electronico"
			},
			{
				"id":4,
				"nombre":"Envedido correo electronico"
			}
		]
	};
	this.llenarGridData = this.llenarGridData.bind(this);
	this.selectRow = this.selectRow.bind(this);
	this.formatBotonCrear = this.formatBotonCrear.bind(this);
	this.showModalCrear = this.showModalCrear.bind(this);
	this.cerrarModalCrear = this.cerrarModalCrear.bind(this);
	this.formatBotonEditar = this.formatBotonEditar.bind(this);
	this.showModalEditar = this.showModalEditar.bind(this);
	this.crearCuenta = this.crearCuenta.bind(this);
	this.add = this.add.bind(this);
	this.remove = this.remove.bind(this);
	this.handleFiles = this.handleFiles.bind(this);
	this.formatBotonActualizarDatos = this.formatBotonActualizarDatos.bind(this);
	this.eliminarCuenta = this.eliminarCuenta.bind(this);
	this.deleteCuentaApi = this.deleteCuentaApi.bind(this);
	this.onChanges=this.onChanges.bind(this);
	this.onChanges2=this.onChanges2.bind(this);
		this.cargacontactos=this.cargacontactos.bind(this);
		this.sendmessage=this.sendmessage.bind(this);
		this.cargargrupos=this.cargargrupos.bind(this);
			this.onswitch=this.onswitch.bind(this);
this.showModaledit=this.showModaledit.bind(this);
this.cerrarModaledit=this.cerrarModaledit.bind(this);
this.cargarphone=this.cargarphone.bind(this);
this.saveagregar=this.saveagregar.bind(this);
this.cerrarAgregar=this.cerrarAgregar.bind(this);
this.showagregar=this.showagregar.bind(this);
this.onSelectChange=this.onSelectChange.bind(this);
this.sendChange=this.sendChange.bind(this);
this.desactivarphone=this.desactivarphone.bind(this);
this.desactivarapi=this.desactivarapi.bind(this);
this.activarphone=this.activarphone.bind(this);
this.activarapi=this.activarapi.bind(this);


	//Configuracion del selecctor de los rows y el color en que se marcan
	this.selectRowProp = {
		mode: 'radio',
		bgColor: 'skyblue',
		onSelect: this.selectRow,
	};
}



onswitch(checked) {
  //console.log(`switch to ${checked}`);

if(checked==true)
{
	

	this.setState({
						valor: "Activo",
						estado: 1

					});
}
else
{
	
	this.setState({
						valor: "Inactivo",
						estado: 0
					});
}




}




//Funcion para almacenar en el state el row que se ha seleccionado de la tabla
 selectRow(row, isSelected){
	try{
		var filaSeleccionada = Object.assign({}, row);
		const { rowSelected } = this.state;
		this.setState({
			 rowSelected: filaSeleccionada,
			 selected:row
		});
		//console.log("Fin de la ejecucion");
		//console.log(this.state.selected.id);
	}catch(err){
		console.error('##Error en la funcion para guardar el item que se ha seleccionado : ' + err);
	}
}

//Funcion que se ejecuta antes del renderizado de la pagina para llenar la tabla de datos
componentWillMount() {
	try{
		this.llenarGridData();
	}catch(err){
		console.error('#ERROR Error en willMount de la pagina de formularios: ' + err);
	}
}



//Funcion para llenar la tabla de datos...
llenarGridData(){
	var token = Cookies("token");
	var idEntidad = Cookies("groupID");



	//console.error("idEntidad");
	////console.log(idEntidad);
	////console.log(token);
	var filtro = '';
	if (parseInt(idEntidad) != 0){
		filtro = 'propios:"'+idEntidad+'"';
	}else{}
	try{
		axios.get('http://localhost:1012/contactos/',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				this.setState({
					 data: res.data
				});


			

				tables=[];
			
			
const {data}=this.state;
for (var i = 0; i < data.length; i++) {
 //console.log(data[i].id);



 var x=data[i].id;
 var y=data[i].nombre;
 var a=data[i].apellido;
 var z=data[i].estado;
 var s;

if(z==1)
{
	s="Activo";
}

if(z==0)
{
	s="Inactivo";
}



tables.push(
{
"id" : x,
"nombre" : y,
"apellido": a,
"estado" : s
}
	);

}

		//console.log(tables);		


			})
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	}
}
deleteCuentaApi(){

	var token = Cookies("token");
	try{

var js={};




js.nombre=this.state.selected.nombre;
js.apellido=this.state.selected.apellido;
js.estado=0;
js.def=1;
   

//console.log(js);






fetch('http://localhost:1012/contactos/'+this.state.selected.id,{method:'PUT',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(js) })


			.then(response => {
				//Logica de si funcionnoh
				//console.log(response.ok);
				if (response.status == 200){

					
				
				
					this.setState({
						selected:undefined
					});

for (var p= 0; p < 2; p++) {
	this.llenarGridData();
}




	message.loading(' Procesando..',5);

	message.destroy();

				}else{
					message.warning("No se pudo eliminar el contacto, contacte al administrador",3);
				}
			})
	}catch(err){
		console.error('##Error en el delete de un contacto: ' + err);
	}
			
}
showModalEditar(){
	try{
		//console.log("click en editar");
	}catch(err){
		console.error("###Error en la funcion showModalEditar: "+err);
	}
}
//Funcion Boton Crear cuenta
formatBotonEditar(onClick){
	try{
		return (
			<InsertButton
				btnText='Editar Contacto'
				btnContextual='btn-info'
				className='my-custom-class'
				btnGlyphicon='glyphicon-edit'
				onClick={ () => this.showModalEditar(onClick) }/>
		);
	}catch(err){
		console.error("###Error en la funcion: "+err);
	}
}
showModalCrear(){
	try{
		this.setState({crearVisible:true});
	}catch(err){
		console.error("###Error en la funcion showModalCrear: "+err);
	}
}
//Funcion que inicia el modal donde se pregunta si se eliminara la cuenta
eliminarCuenta(){
	try{
		var that = this;
		//console.log(this.state.selected);
		if (this.state.selected == {} || this.state.selected == null || this.state.selected == undefined){
			message.warning("Seleccione un contacto!",3);
		}else{
			confirm({
				title: 'Desactivar Contacto',
				content: 'Desea desactivar el contacto  '+this.state.selected.nombre+' ?',
				okText: 'Si',
				okType: 'danger',
				cancelText: 'No',
				onOk() {
					//console.log('OK');
					//this.deleteCuentaApi;
					//console.log(that);
					that.deleteCuentaApi();
				},
				onCancel() {
					//console.log('Cancel');
				},
			});
		}
	}catch(err){
		console.error("###Error en la funcion eliminarCuenta: "+err);
	}
}
cerrarModalCrear(){
	try{
		this.setState({crearVisible:false});
	}catch(err){
		console.error("###Error en la funcion cerrarModalCrear: "+err);
	}
}
crearCuenta(){


	
	try{
		const { form } = this.props;
	var text=form.getFieldValue('textoarea');
	//console.log(text);
		//console.log("Crear cuenta --->");
		message.loading(' Procesando..');
		var newObj = {};
		if (this.state.file == null){
			message.warning("No se ha cargado archivo de cuentas",3);
		}else{
			const form = this.props.form;
			form.validateFields((err, values) => {
				if (err) {
					console.error('#ERROR No se han llenado todos los datos del form: '+ err);
					return;
				}
				//console.log(values);
			});
			newObj.nombreArchivo = this.state.file.fileList[0].name;
			newObj.base64 = this.state.file.base64;
			axios.post(this.state.baseApi + '/cuentas',newObj,{
				headers: {
					'Authorization': 'Bearer ' + Cookies("token")
				}
			})
				.then(res => {
					if (res.status == 200){
						//console.log(res);
						if (res.data.codigo == 200){
							this.setState({crearVisible:false,file:null,fileName:"Seleccione archivo"});
							this.llenarGridData();
							message.destroy();
							message.success(res.data.mensaje,5);
						}else if (res.data.codigo == 400){
							this.setState({crearVisible:false,file:null,fileName:"Seleccione archivo"});
							message.destroy();
							message.warning(res.data.mensaje,5);
						}else if (res.data.codigo == 500){
							this.setState({crearVisible:false,file:null,fileName:"Seleccione archivo"});
							message.destroy();
							message.error(res.data.mensaje,5);
						}
					}else{
						message.warning("No se ha podido cargar el archivo de cuentas",3);
					}
					
				}).catch(error => {
					//console.log(error);
					//console.log(error.response);
					message.warning("No se ha podido cargar el archivo, intente nuevamente");
				});
		}
	}catch(err){
		console.error("###Error en la funcion crearCuenta: "+err);
	}
}
formatBotonCrear(onClick){
	try{
		return (
			<InsertButton
				btnText='Nuevo'
				btnContextual='btn-primary'
				className='my-custom-class'
				btnGlyphicon='glyphicon-edit'
				onClick={ () => this.showModalCrear(onClick) }/>
		);
	}catch(err){
		console.error("###Error en la funcion: "+err);
	}
}
formatBotonActualizarDatos(onClick){
	try{
		return (
			<InsertButton
				btnText='Desactivar Contacto'
				btnContextual='btn-warning'
				className='my-custom-class'
				btnGlyphicon='glyphicon-edit'
				onClick={ () => this.eliminarCuenta(onClick) }
				/>
		);
	}catch(err){
		console.error("###Error en la funcion: "+err);
	}
}
add() {
	const { form } = this.props;
	const keys = form.getFieldValue('keys');
	const nextKeys = keys.concat(keys.length);
	form.setFieldsValue({
		keys: nextKeys,
	});
}
remove(k) {
	const { form } = this.props;
	const keys = form.getFieldValue('keys');
	if (keys.length === 1) {
		return;
	}
	form.setFieldsValue({
		keys: keys.filter(key => key !== k),
	});
}
handleFiles(files){
	try{
		if (files.fileList[0].type == "application/vnd.ms-excel"){
			this.setState({file:files,fileName:files.fileList[0].name});
		}else{
			message.warning("Formato invalido");
		}
		
	}catch(err){
		console.error("Error en la funcion: "+err);
	}
}
expandComponent(row){
	//console.log(row);
	//console.log("Click");
}
//funcion para guardar los datos de destinatarios
 handleChange(values) {
  ////console.log(`selected ${values}`);

////console.log(values.toString());

destinos=values;


}

//Funcion para guardar los datos de textarea ...

onChanges ({ target: { value } }) {
    this.setState({ value });

////console.log("exc"+this.state.value);

  };

  onChanges2 () {

var c=document.getElementById("apellido").value;

    this.setState({ value2 : c });

////console.log("exc"+this.state.value);

  }


sendmessage()
{
	//console.log(destinos);
	var {value}=this.state;
//console.log("exc"+value);
var token = Cookies("token");
	
	var body= JSON.stringify("destinos":destinos,
		"contenido":value)
var datos  = [];
var objeto = {};

	try{




objeto.nombre=value;
objeto.apellido=this.state.value2;
objeto.estado=this.state.estado;
objeto.def=1;
 
//console.log(objeto);


if (this.state.value2 == [] || this.state.value2 == null || this.state.value2 == undefined){

message.warning("Ingrese Apellido");
		
}
else
{
	





fetch('http://localhost:1012/contactos/',{method:'POST',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(objeto) })

		
			.then(response => {
				this.setState({
					 response: response.status
				},
	message.loading(' Procesando..',5)
		
				);

//console.log(this.state.response);
var re=this.state.response;
if(re==200)
{

	message.info("Creado");


for (var p= 0; p < 2; p++) {
	this.llenarGridData();
}

	this.setState({
					 value2: undefined,
					 value: undefined,
					 crearVisible: false,
					 selected:undefined
				});


document.getElementById("apellido").value = '';
}
else
{
	message.warning("Ocurrió un problema en el envío",5);
}

			})

		}
	}catch(err){
		message.warning("Error en el envío",5);
		console.error('##Error en la creación: ' + err);
	}


}



cargargrupos()
{
	var token = Cookies("token");

		try{
		axios.get('http://localhost:1012/grupos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				this.setState({
					 grupos: res
				});

 const {grupos}=this.state;



			});
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	};



}




cargarphone()
{
	var token = Cookies("token");

		try{





		axios.get('http://localhost:1012/contactos/'+this.state.selected.id+'/telefonos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				this.setState({
					phone: res.data,
					plenght:res.data.length
				});


				tab2=[];

 const {phone}=this.state;

for (var i = 0; i < res.data.length; i++) {



var h=phone[i].estado;
var b;


if (h==1) {
b="Activo";
}

if(h==0)
{
b="Inactivo";
}



tab2.push({

"key": phone[i].id,
"numero": phone[i].numero,
"compania": phone[i].compania,
"estado": b

});
}



			});
	}catch(err){
		console.error('##Error en el get para telefonos: ' + err);
	};



}
















  cargacontactos() {
 
var token = Cookies("token");
	



	try{
		axios.get('http://localhost:1012/contactos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 contacts: response,
				
				});
				const {contacts}=this.state;




				for (var i = 0; i<=Object.keys(contacts).length; i++) {

				

  children.push(<Option key={"C"+contacts.data[i].id}><Tag color="cyan">Contacto -></Tag>{contacts.data[i].nombre} {contacts.data[i].apellido}</Option>);
//console.log(this.state.contacts.data[i].id);



  this.cargargrupos();
//console.log(children);
}
			}
			);
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	};






	
  }






showModaledit(){

	try{
		var that = this;
		//console.log(this.state.selected);
		if (this.state.selected == {} || this.state.selected == null || this.state.selected == undefined){
			message.warning("Seleccione un contacto!",3);
		}else{


for (var p = 0; p <2; p++) {
	this.cargarphone();
}
			
			
			//console.log(this.state.selected.nombre);

			axios.get('http://localhost:1012/contactos/'+this.state.selected.id,{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 g1: response.data
				});
				const {g1}=this.state;
//console.log(g1);

this.setState({estado: g1.estado});




if(g1.estado==0)
{
	
	
	this.onswitch(false);

	ch=(<Switch onChange={this.onswitch} />);
	
	
}

if(g1.estado==1)
{
	
	this.onswitch(true);
	ch=(<Switch defaultChecked onChange={this.onswitch} />);
	
}

this.setState({edit:true,
				gr: this.state.selected.nombre});


});
			}
			

	}catch(err){
	console.error("###Error en la funcion showModaleditar: "+err);
	}
}


cerrarModaledit(){
	try{
		this.setState({edit:false,
			selectedRowKeys:[]
		});

		tab2=[];
	}catch(err){
		console.error("###Error en la funcion showModaleditar: "+err);
	}
}




sendChange(){
	try{




		var js={};




js.nombre=this.state.selected.nombre;
js.apellido=this.state.selected.apellido;
js.estado=this.state.estado;
js.def=1;


//console.log(js);

fetch('http://localhost:1012/contactos/'+this.state.selected.id,{method:'PUT',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(js) })

		
			.then(res => {
				this.setState({
					 response: res.status
				},
	message.loading(' Procesando..')
		
				);

//console.log(this.state.response);
var re=this.state.response;
if(res.status==200)
{

	message.info("Actualizado");




for (var p= 0; p < 2; p++) {
	this.llenarGridData();
}



}
else
{
	message.warning("Ocurrió un problema al guardar la información",5);
}

			})




		this.setState({edit:false,
			selectedRowKeys:[]
		});

		tab2=[];
	}catch(err){
		console.error("###Error en la funcion sendChange: "+err);
	}
}








  componentDidMount() {

this.cargacontactos();



}



 onSelectChange(selectedRowKeys) {
    //console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };




showagregar(){
	try{
		this.setState({agregarnumero: true});

	}catch(err){
		console.error("###Error en la funcion showagregar: "+err);
	}
}



saveagregar(){
	try{
		this.setState({agregarnumero:false});


var agregar=document.getElementById("new-number").value;

var compania=document.getElementById("new-compania").value;


//console.log("el numero es: "+agregar+" la compania es: "+compania);


try{


var objeto={};


objeto.numero=agregar;
objeto.compania=compania;
objeto.estado=1;


fetch('http://localhost:1012/contactos/'+this.state.selected.id+'/telefonos',{method:'POST',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(objeto) })

		
			.then(res => {
				this.setState({
					 response: res.status
				},
	message.loading(' Procesando..')
		
				);

//console.log(this.state.response);
var re=this.state.response;
if(res.status==200)
{
	message.info("Agregado");




for (var p= 0; p < 2; p++) {
	this.cargarphone();
}



}
else
{
	message.warning("Ocurrió un problema en el envío",5);
}

			})
}
catch(err)
{
	console.error(err)
}







		document.getElementById("new-number").value=null;
		document.getElementById("new-compania").value='';


	}catch(err){
		console.error("###Error en la funcion saveagregar: "+err);
	}
}





desactivarapi(numero,compania,id)
{


try{

	//console.log(numero+compania,id);


var objeto={};
objeto.numero=numero;
objeto.compania=compania;
objeto.estado=0;



fetch('http://localhost:1012/contactos/'+this.state.selected.id+'/telefonos/'+id,{method:'PUT',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(objeto) })

		
			.then(res => {
				this.setState({
					 response: res.status
				},
	message.loading(' Procesando..')
		
				);




//console.log(this.state.response);
var re=this.state.response;
if(res.status==200)
{

				for (var p= 0; p < 3; p++) {
	this.cargarphone();
}

	message.info("Desactivado");


	this.setState({
	selectedRowKeys:[]
});



}
else
{
	message.warning("Ocurrió un problema en el envío",5);
}

			})

}
catch(err)
{
	console.error(err)
}


}







desactivarphone(){

	var token = Cookies("token");

	try{
	
var arr=this.state.selectedRowKeys;


if(arr.length>0)
{






		axios.get('http://localhost:1012/contactos/'+this.state.selected.id+'/telefonos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				this.setState({
					phone: res.data,
					plenght:res.data.length
				});

 const {phone}=this.state;

for (var i = 0; i < res.data.length; i++) {
/*tab2.push({

"key": phone[i].id,
"numero": phone[i].numero,
"compania": phone[i].compania,
"estado": phone[i].estado

});*/

for (var l = 0; l < arr.length; l++) {

if(phone[i].id==arr[l])
{
	this.desactivarapi(phone[i].numero,phone[i].compania,arr[l]);


}
else
{
	//console.log("no coinciden");
}
}



}



			});

		


	}

else
{
	message.warning("Seleccione un elemento");
}



	}catch(err){
		console.error("###Error en la funcion saveagregar: "+err);
	}
}








activarapi(numero,compania,id)
{


try{


var objeto={};
objeto.numero=numero;
objeto.compania=compania;
objeto.estado=1;



fetch('http://localhost:1012/contactos/'+this.state.selected.id+'/telefonos/'+id,{method:'PUT',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(objeto) })

		
			.then(res => {
				this.setState({
					 response: res.status
				},
	message.loading(' Procesando..')
		
				);


//console.log(this.state.response);
var re=this.state.response;
if(res.status==200)
{




				for (var p= 0; p < 3; p++) {
	this.cargarphone();
}

this.setState({
	selectedRowKeys:[]
});




	message.info("Activado");


}
else
{
	message.warning("Ocurrió un problema en el envío",5);
}

			})

}
catch(err)
{
	console.error(err)
}


}







activarphone(){

	var token = Cookies("token");

	try{
	
var arr=this.state.selectedRowKeys;


if(arr.length>0)
{






		axios.get('http://localhost:1012/contactos/'+this.state.selected.id+'/telefonos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				this.setState({
					phone: res.data,
					plenght:res.data.length
				});

 const {phone}=this.state;

for (var i = 0; i < res.data.length; i++) {
/*tab2.push({

"key": phone[i].id,
"numero": phone[i].numero,
"compania": phone[i].compania,
"estado": phone[i].estado

});*/

for (var l = 0; l < arr.length; l++) {

if(phone[i].id==arr[l])
{
	this.activarapi(phone[i].numero,phone[i].compania,arr[l]);

	
			for (var p= 0; p < 2; p++) {
	this.cargarphone();
}


}
else
{
	//console.log("no coinciden");
}
}



}



			});

		


	}

else
{
	message.warning("Seleccione un elemento");
}



	}catch(err){
		console.error("###Error en la funcion saveagregar: "+err);
	}
}














cerrarAgregar(){
	try{
		this.setState({agregarnumero:false});

		document.getElementById("new-number").value=null;

		

	
	}catch(err){
		console.error("###Error en la funcion cerrarAgregar: "+err);
	}
}

alerta()
{

var validar=parseInt(document.getElementById("new-number").value);

//console.log(validar);

	//if (true) {}
}





render() {


const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;



const columns = [
  {
    title: 'Número',
    dataIndex: 'numero',
    key: 'numero',
  },
  {
    title: 'Empresa',
    dataIndex: 'compania',
    key: 'compania',
    width: '35%',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    width: '30%',
    key: 'estado',
  },
];





const { value } = this.state;

////console.log(this.state.data);

	try{
		const { getFieldValue } = this.props.form;
			const formItemLayout = {
			  labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			  },
			  wrapperCol: {
				xs: { span: 24 }, 
				sm: { span: 20 },
			  },
			};
			const formItemLayoutWithOutLabel = {
			  wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 20, offset: 4 },
			  },
			};
		const options = {
			 onRowClick: function(row){
				 return (
				 <Tooltip placement="top" title={"Ola k ase"}></Tooltip>
				 );
			},
			insertBtn: this.formatBotonCrear,
			exportCSVBtn: this.createCustomExportCSVButton,
			exportCSVText: 'Exportar a csv',
			deleteBtnText: 'Actualizar informacion',
			deleteBtn:this.formatBotonActualizarDatos,
			page: 1,
			sizePerPageList:
			[
				{
					text: '5', value: 5
				},
				{
					text: '10', value: 10
				},
				{
					text: '20', value: 20
				},
				{
					text: '50', value: 50
				}
			],
			sizePerPage: 8,
			pageStartIndex: 1,
			paginationSize: 5,
			prePage: 'Anterior',
			nextPage: 'Siguiente',
			firstPage: 'Primera',
			lastPage: 'Ultima',
			paginationPosition: 'top'
		};
		const { visible, onCancel, onCreate, form } = this.props;
		const { getFieldDecorator } = form;
		getFieldDecorator('keys', { initialValue: [] });
		const keys = getFieldValue('keys');
	const formItems = keys.map((k, index) => {
		return (
			<FormItem
				label={index === 0 ? 'Receptores' : ''}
				required={false}
				key={k}
				hasFeedback
			>
				{getFieldDecorator(`names[${k}]`, {
					validateTrigger: ['onChange', 'onBlur'],
					rules: [{
						required: true,
						type:'email',
						whitespace: true,
						message: "Correo electronico del receptor",
					}],
				})(
					<Input placeholder="Correo electronico" style={{ width: '80%', marginRight: 8 }} />
				)}
				{keys.length > 1 ? (
					<Icon
						className="dynamic-delete-button"
						type="minus-circle-o"
						disabled={keys.length === 1}
						onClick={() => this.remove(k)}
					/>
				) : null}
			</FormItem>
		);
	});
		return (
			<div className="contenedorPrincipal">
				<Row style={{height:"90vh"}}>
					<Col span={24}>
						<Divider orientation="left">Contactos</Divider>

						<Row>
							<Col span={22} offset={1}>

			

							
								<BootstrapTable data={tables} striped={true} pagination={ true } hover={true} selectRow={ this.selectRowProp } options={options}
								insertRow
								editRow
								exportCSV
								deleteRow
								search
								>
									<TableHeaderColumn width='15%' dataField='id' isKey={true} dataAlign="center" dataSort={true} >Id</TableHeaderColumn>
									<TableHeaderColumn width='30%' dataField='nombre' dataAlign="center" dataSort={true} >Nombre</TableHeaderColumn>
									<TableHeaderColumn width='30%' dataField='apellido' dataAlign="center" dataSort={true} >Apellido</TableHeaderColumn>
									<TableHeaderColumn width='25%' dataField='estado' dataAlign="center" dataSort={true} >Estado</TableHeaderColumn>
										
								</BootstrapTable>
							</Col>
							<Col offset={1} span={2}><Button onClick={this.showModaledit}>Editar</Button></Col>
						</Row>
					</Col>
				</Row>


<Modal title="Editar Contacto" 
	visible={this.state.edit} 
	 center
	okText="Guardar" 
	width={900}
	height={500} 
	cancelText="Cancelar" 
	onCancel={this.cerrarModaledit} 
	onOk={this.sendChange}>
<Row>
				<Col offset={20} span={5}>{ch}<h4>{this.state.valor}</h4></Col>
				</Row>

				<h1>{this.state.g1.nombre}&nbsp;{this.state.g1.apellido}</h1>
				<Divider orientation="right">Administración de Teléfonos</Divider>
				
&nbsp;<Button onClick={this.showagregar}>Nuevo</Button>&nbsp;<Button onClick={this.desactivarphone}>Desactivar</Button>&nbsp;<Button onClick={this.activarphone}>Activar</Button>
			<Table columns={columns} rowSelection={rowSelection} dataSource={tab2} />,

				</Modal>



				  <Modal
          title="Agregar Número"
          visible={this.state.agregarnumero}
          onOk={this.saveagregar}
          onCancel={this.cerrarAgregar}
          cancelText="Cancelar"
          okText="Guardar"
        >
       <Input type="number" 
       placeholder="Ingrese Número Telefónico"
       maxLength={8}
       id="new-number" 
       onChange={this.alerta}
        required
       />
       <br/>
            <Input type="text" 
       placeholder="Compañia"
       maxLength={8}
       id="new-compania" 
        required
       />
        </Modal>








				<Modal title="Crear Contacto" visible={this.state.crearVisible} okText="Crear" width={900} cancelText="Cancelar" onCancel={this.cerrarModalCrear} onOk={this.sendmessage}>
<Row>
				<Col offset={20} span={5}><Switch defaultChecked onChange={this.onswitch} /><h4>{this.state.valor}</h4></Col>
				</Row>

<Divider orientation="left">Datos de Contacto</Divider>
<div>
<Row>
<Col offset={2} span={10}>
<p><Input
          value={value}
          onChange={this.onChanges}
          placeholder="Nombre"
          autoSize={{ minRows: 1, maxRows: 1 }}
          maxLength={10}
          required
 
        />

</p>
<p>
        <Input
          type="text"
          onChange={this.onChanges2}
          placeholder="Apellido"
          maxLength={10}
          id="apellido"
          required
        />
 </p>   
 </Col>
 </Row>    
        </div>
        
				</Modal>
			</div>
			);
		}catch(err){
			console.error('Error al ejeutar la funcion render: ' + err);
		}
	}
}
export default Form.create()(Contactos);
