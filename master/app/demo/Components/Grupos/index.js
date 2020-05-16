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




var tables=[];
var ch;

const columns = [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    width: '40%',
  },
  {
    title: 'Apellido',
    dataIndex: 'apellido',
    key: 'apellido',
    width: '40%',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    width: '20%',
    key: 'estado',
  },
];

const columns2 = [
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    key: 'nombre',
    width: '30%',
  },
  {
    title: 'Apellido',
    dataIndex: 'apellido',
    key: 'apellido',
    width: '30%',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    width: '30%',
    key: 'estado',
  },
   {
    title: 'Opción',
    dataIndex: 'opcion',
    width: '10%',
    key: 'opcion',
  },
];


var tab2 = [];

var tab3 = [];






class Formularios extends Component {
	constructor(props, context) {
	super(props,context);
	const { router, params, location, routes } = this.props
	this.state = {
		valor:'Activo',
		selectedRowKeys:[],
		cf:[],
		clenght:[],
		agContact:false,
		tab3:[],
		loadin: false,
		gr: null,
		edit: false,
		estado:1,
		response:null,
		body:[],
		destination:[],
		value:[],
		contacts:[],
		grupos:[],
		values: '',
		file:null,
		g1:[],
		g2:[],
		glenght:[],
		selectRowProp: {},
		rowSelected: {},
		selected:undefined,
		fileName:'Seleccionar archivo csv',
		keycloakConfig: {
		"url":"http://104.198.180.31:8080/auth/",
		"clientId":"clienttest",
		  "ssl-required": "none",
		   "verify-token-audience": true,
		"realm":"TXTRV2",
				  "credentials": {
    "secret": "6a868ea5-8fdd-4068-8262-580e49f2bb7e"
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
		this.cargacontactos=this.cargacontactos.bind(this);
		this.sendmessage=this.sendmessage.bind(this);
		//this.cargargrupos=this.cargargrupos.bind(this);
			this.onswitch=this.onswitch.bind(this);
this.showModaledit=this.showModaledit.bind(this);
this.cerrarModaledit=this.cerrarModaledit.bind(this);
this.onSelectChange=this.onSelectChange.bind(this);
this.showagregar=this.showagregar.bind(this);
this.desactivarContact=this.desactivarContact.bind(this);
this.activarContact=this.activarContact.bind(this);
this.hideagregar=this.hideagregar.bind(this);
this.Okagregar=this.Okagregar.bind(this);
this.cargaGeneral=this.cargaGeneral.bind(this);
this.agregarContacto=this.agregarContacto.bind(this);
this.sendchange=this.sendchange.bind(this);
this.Okconfirm=this.Okconfirm.bind(this);


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
						valor: "Activo"

					});
}
else
{
	
	this.setState({
						valor: "Inactivo",
					
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
tables=this.state.data;


	//console.error("idEntidad");
	////console.log(idEntidad);
	////console.log(token);
	var filtro = '';
	if (parseInt(idEntidad) != 0){
		filtro = 'propios:"'+idEntidad+'"';
	}else{}
	try{
		axios.get('http://localhost:1012/grupos/',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				this.setState({
					 data: res.data
				});


				console.log(process.env.NODE_TEST);
	tables=[];
			
const {data}=this.state;
for (var i = 0; i < data.length; i++) {
 ////console.log(data[i].id);
  ////console.log(data[i]);



 var x=data[i].id;
 var y=data[i].nombre;





tables.push(
{
"id" : x,
"nombre" : y
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
	message.loading(' Procesando..',9999999);
	var token = Cookies("token");
	try{
		axios.delete('http://localhost:1012/grupos/'+this.state.selected.id,{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				//Logica de si funcionno
				//console.log(res);
				if (res.status == 200){


for (var p= 0; p < 2; p++) {
	this.llenarGridData();
}




					message.destroy();
					this.setState({
						selected:undefined
					});
				}else{
					message.warning("No se pudo eliminar el grupo, contacte al administrador",3);
				}
			})
	}catch(err){
		console.error('##Error en el delete de una grupo: ' + err);
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
				btnText='Editar Grupo'
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
			message.warning("Seleccione un grupo!",3);
		}else{
			confirm({
				title: 'Eliminar grupo',
				content: 'Desea eliminar el grupo  '+this.state.selected.nombre+' ?',
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
					onsole.log('Cancel');
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
				btnText='Eliminar Grupo'
				btnContextual='btn-danger'
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


//Funcion para guardar los datos de textarea ...

onChanges ({ target: { value } }) {
    this.setState({ value });

////console.log("exc"+this.state.value);

  };





  Okconfirm()
  {

var that=this;

try{

var {value}=this.state;
if(value.length<1)
{
	message.warning("Ingrese un nombre valido");
}
else{
confirm({
				title: 'Crear Grupo',
				content: 'Desea crear el grupo '+value+'?',
				okText: 'Si',
				okType: 'danger',
				cancelText: 'No',
				onOk() {
					//console.log('OK');
					//this.deleteCuentaApi;
					//console.log(that);
					that.sendmessage();
				

				},
				onCancel() {
					message.info('Cancelado');
					that.cerrarModalCrear();
					
				},
			});
}

}catch(err)
{
	console.error(err);
}

	


  }




sendmessage()
{
	//console.log(destinos);
	var {value}=this.state;
//console.log("exc"+value);
var token = Cookies("token");
	

var datos  = [];
var objeto = {};

	try{



objeto.nombre=value;
 
//console.log(objeto);


fetch('http://localhost:1012/grupos/',{method:'POST',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(objeto) })

		
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

	message.info("Creado");


	this.setState({
crearVisible: false,
value:''
	});




for (var p= 0; p < 2; p++) {
	this.llenarGridData();
}



}
else
{
	message.warning("Ocurrió un problema en el envío",5);
}

			})
	}catch(err){
		message.warning("Error en el envío",5);
		console.error('##Error en la creación: ' + err);
	}


}


/*
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

 		for (var j = 0; j<=Object.keys(grupos).length; j++) {
  children.push(<Option key={"G"+grupos.data[j].id}><Tag color="gold">Grupo -></Tag>{grupos.data[j].nombre}</Option>);


}

			});
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	};



}

*/






  cargacontactos() {
 
var token = Cookies("token");
	



	try{
		axios.get('http://localhost:1012/grupos/'+this.state.selected.id+'/contactos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 contacts: response.data,
					 clenght:response.data.length
				});
				const {contacts}=this.state;




var items=[];






				for (var i = 0; i<this.state.clenght; i++) {

				


//console.log(this.state.contacts);

var st;
var sr=contacts[i].estado;

var id=contacts[i].id;
items.push(id);
var opcion;

if(sr==1)
{
st="Activo";
opcion=(<Button shape="round" style={{ background: '#E80B02',color: '#fff' }} onClick={this.desactivarContact.bind(this,id)} >Desactivar</Button>);
}
if(sr==0)
{

	st="Desactivado";
 opcion=(<Button shape="round" style={{ background: '#4D67FF', color: '#fff' }} onClick={this.activarContact.bind(this,id)} >Activar</Button>);

}


tab2.push(
{
	"key" : contacts[i].id,
	"nombre" : contacts[i].nombre,
	"apellido" : contacts[i].apellido,
	"estado" : st,
	"opcion": opcion


}
	);

  //this.cargargrupos();

}

this.state.selectedRowKeys=items;
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
			message.warning("Seleccione un grupo!",3);
		}else{

			tab2=[];

			this.cargacontactos();
			this.cargaGeneral()
			
			//console.log(this.state.selected.nombre);

			axios.get('http://localhost:1012/grupos/'+this.state.selected.id+'/contactos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 g2: response.data,
					 glenght: response.data.length
				});
				const {g2}=this.state;
//console.log(g2);

const {selectedRowKeys}=this.state;

const {glenght}=this.state;
for (var l = 0; l <glenght; l++) {
	//selectedRowKeys.push(g2[l].id);
}


});
	


			axios.get('http://localhost:1012/grupos/'+this.state.selected.id,{
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
			selectedRowKeys: [] });
		tab2=[];
		this.cargacontactos();
	}catch(err){
		console.error("###Error en la funcion showModaleditar: "+err);
	}
}




 onSelectChange(selectedRowKeys) {
    //console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };






Okagregar()
{


	try{
this.setState({agContact:false,
	tab3:[]
});






message.loading(' Procesando..',5);

	

	message.destroy();

//console.log(this.state.selectedRowKeys);

var it=this.state.selectedRowKeys;

for (var i = 0; i < it.length; i++) {
	//console.log(it[i]);



fetch('http://localhost:1012/grupos/'+this.state.selected.id+'/contactos/'+it[i],{method:'POST',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")}})


			.then(response => {
				//Logica de si funcionnoh
				//console.log(response.ok);
				if (response.status == 200){

					
				//console.log("agregado");
				
		




				}else{
					message.warning("No se pudo agregar el contacto,"+item+" contacte al administrador",3);
				}
			})



}


		tab2=[];

for (var p= 0; p < 2; p++) {
	this.cargacontactos();
}



}
catch(err)
{
	console.error(err);
}



}


hideagregar()
{
this.setState({agContact:false,
	tab3:[]
});

}




sendchange()
{
	this.setState({edit:false});

	tab2=[];
	tab3=[];
}	


showagregar()
{

this.setState({agContact:true});
/*for (var i = 0; i < 1; i++) {
	this.cargaGeneral();

}*/
}


desactivarContact(id)
{

//console.log("desactivando"+id);

try{



	message.loading(' Procesando..',5);


fetch('http://localhost:1012/grupos/'+this.state.selected.id+'/contactos/'+id,{method:'DELETE',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")}})


			.then(response => {
				//Logica de si funcionnoh
				//console.log(response.ok);
				//console.log(response);
				if (response.status == 200){


	message.destroy();
					
			
tab2=[];
for (var p= 0; p < 2; p++) {
this.cargacontactos();	
}





}

});
		}
catch(err)
{

}


}

activarContact(id)
{
//console.log("activando"+id);


try{



	message.loading(' Procesando..',10);


var body={};

body.estado=1;

fetch('http://localhost:1012/grupos/'+this.state.selected.id+'/contactos/'+id,{method:'PUT',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(body) })


			.then(response => {
				//Logica de si funcionnoh
				//console.log(response.ok);
				//console.log(response);
				if (response.status == 200){

tab2=[];
for (var p= 0; p < 2; p++) {
this.cargacontactos();	
}



	message.destroy();
					
			





}

});
		}
catch(err)
{

}





}



agregarContacto(id)
{
//console.log(id);
}




cargaGeneral()
{
	var token = Cookies("token");

	try{



		axios.get('http://localhost:1012/contactos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 cf: response.data
				});
				const {cf}=this.state;
////console.log(this.state.cf);


tab3=[];






				for (var i = 0; i<response.data.length; i++) {

				
var st;
var sr=cf[i].estado;

if(sr==1)
{
st="Activo";
}
if(sr==0)
{
	st="Desactivado";
}


var v=cf[i].id;


tab3.push(
{
	"key" : cf[i].id,
	"nombre" : cf[i].nombre,
	"apellido" : cf[i].apellido,
	"estado" : st
}
	);

	//console.log("dato insertado");


}


}
			);
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	};




}

















  componentDidMount() {

this.llenarGridData();


}




render() {


const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;



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
						<Divider orientation="left">Grupos</Divider>

						<Row>
							<Col span={22} offset={1}>

			

							
								<BootstrapTable data={tables} striped={true} pagination={ true } hover={true} selectRow={ this.selectRowProp } options={options}
								insertRow
								editRow
								exportCSV
								
								search
								>
									<TableHeaderColumn width='25%' dataField='id' isKey={true} dataAlign="center" dataSort={true} >Id</TableHeaderColumn>
									<TableHeaderColumn width='75%' dataField='nombre' dataAlign="center" dataSort={true} >Grupo</TableHeaderColumn>
								
										
								</BootstrapTable>
							</Col>
							<Col offset={1} span={2}><Button onClick={this.showModaledit}>Editar</Button></Col>
						</Row>
					</Col>
				</Row>


<Modal title="Editar Grupo" 
	visible={this.state.edit} 
	 center
	okText="Guardar" width={900}
	height={500} 
	cancelText="Cancelar" 
	onCancel={this.cerrarModaledit} 
	onOk={this.sendchange}>
<Row>
				<Col offset={20} span={5}>{ch}<h4>{this.state.valor}</h4></Col>
				</Row>

				<h1>{this.state.g1.nombre}</h1>
		
				<Divider orientation="right">Administración de Contactos</Divider>



		
&nbsp;<Button onClick={this.showagregar}>Nuevo</Button>

<Table columns={columns2} rowSelection={rowSelection} dataSource={tab2} />





				</Modal>

<Modal title="Agregar Contactos" visible={this.state.agContact} okText="Aceptar" width={900} cancelText="Cancelar" onCancel={this.hideagregar} onOk={this.Okagregar}>


<Table columns={columns} rowSelection={rowSelection} dataSource={tab3} />

				</Modal>






				<Modal title="Crear Grupo" visible={this.state.crearVisible} okText="Crear" width={900} cancelText="Cancelar" onCancel={this.cerrarModalCrear} onOk={this.Okconfirm}>
<Row>
				<Col offset={20} span={5}><h4>{this.state.valor}</h4></Col>
				</Row>
					<Form layout="vertical" id="Form1">
						<Row>
							<Col offset={2} span={20}>
	

									<FormItem label="Propiedades del Grupo">
									
<Input
          value={value}
          onChange={this.onChanges}
          placeholder="Ingrese el Nombre o Identificador"
          autoSize={{ minRows: 1, maxRows: 1 }}
          maxLength={15}
          
 
        />


								</FormItem>
								

							</Col>
						</Row>
					</Form>
				</Modal>
			</div>
			);
		}catch(err){
			console.error('Error al ejeutar la funcion render: ' + err);
		}
	}
}
export default Form.create()(Formularios);
