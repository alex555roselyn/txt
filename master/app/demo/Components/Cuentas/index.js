/* eslint-disable */
import React, { Component } from 'react';
import {Button, Typography, Modal, Row, Col, Divider,Form, message,Icon, Input, Radio, InputNumber, Alert, Upload, Select, Dropdown, Menu, DatePicker, Table, Tag, Popover, Tooltip} from 'antd';
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

var dataPlantilla=[];

var defaultV=[];

var data=[];

var contador=1;

class Formularios extends Component {
	constructor(props, context) {
	super(props,context);
	const { router, params, location, routes } = this.props
	this.state = {
		response:null,
		valueradio: 1,
	    visibleDraw:false,
		datagrid:[],
		selectItem:[],
		contacto:[],
		disabled:false,
		selectedRowKeys:[],
		verplantillas:false,
		plantillas:[],
		pcontactos:[],
		pcontactosL:null,
		plantilla:[],
		body:[],
		longitud:null,
		destination:[],
		value:[],
		contacts:[],
		grupos:[],
		values: '',
		file:null,
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
		this.cargargrupos=this.cargargrupos.bind(this);
		this.cerrarVerplantillas=this.cerrarVerplantillas.bind(this);
		this.seleccionPlantilla=this.seleccionPlantilla.bind(this);
		this.showmodalplantillas=this.showmodalplantillas.bind(this);
		this.onSelectChange=this.onSelectChange.bind(this);
		this.getPlantillas=this.getPlantillas.bind(this);
		this.changestatus=this.changestatus.bind(this);
		this.handleChange=this.handleChange.bind(this);
		this.Okconfirm=this.Okconfirm.bind(this);
	
		this.showModaldetalle=this.showModaldetalle.bind(this);
		this.onChangeradio=this.onChangeradio.bind(this);


	//Configuracion del selecctor de los rows y el color en que se marcan
	this.selectRowProp = {
		mode: 'radio',
		bgColor: 'skyblue',
		onSelect: this.selectRow,
	};
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
		//////console.log("Fin de la ejecucion");
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

		data=this.state.data;
	//console.error("idEntidad");
	////////console.log(idEntidad);
	////////console.log(token);
	var filtro = '';
	if (parseInt(idEntidad) != 0){
		filtro = 'propios:"'+idEntidad+'"';
	}else{}
	try{

	



		axios.get('http://34.68.215.244:9200/texter-sms-sent-2020.05.12/_doc/_search?scroll=10m&size=50',{
			headers: {
				//'Authorization': 'Bearer ' + Cookies("token")
				//'Authorization' : 'Basic ZWxhc3RpYzpZcDlFaU9PVDZjOWY2V2lqMVlWNUlaMmI='
			}
		})
			.then(res => {
				this.setState({
					 datagrid: res.data.hits.hits

				});

				//console.log(res.data.hits);

const {datagrid}=this.state;

data=[];

for (var i = 0; i < datagrid.length; i++) {

//console.log(datagrid[i]._source.message);



data.push({
	"id": i,
	"mensaje":datagrid[i]._source.message,
	"destino" :datagrid[i]._source.destinationName,
	"destinoNumero" :"+"+datagrid[i]._source.destination,
	"protocolo" :datagrid[i]._source.response.protocol,
	"date": datagrid[i]._source.response.createdDate
})




}



			})
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	}
}
deleteCuentaApi(){
	message.loading(' Procesando..',9999999);
	var token = Cookies("token");
	try{
		axios.delete('http://172.19.12.12:8080/cuentas/'+this.state.selected.id,{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				//Logica de si funcionno
				//////console.log(res);
				if (res.status == 200){
					this.llenarGridData();
					message.destroy();
					this.setState({
						selected:undefined
					});
				}else{
					message.warning("No se pudo eliminar la cuenta, contacte al administrador",3);
				}
			})
	}catch(err){
		console.error('##Error en el delete de una cuenta: ' + err);
	}
}
showModalEditar(){
	try{
		//////console.log("click en editar");
	}catch(err){
		console.error("###Error en la funcion showModalEditar: "+err);
	}
}
//Funcion Boton Crear cuenta
formatBotonEditar(onClick){
	try{
		return (
			<InsertButton
				btnText='Editar cuenta'
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
		//////console.log(this.state.selected);
		if (this.state.selected == {} || this.state.selected == null || this.state.selected == undefined){
			message.warning("Seleccione una cuenta !",3);
		}else{
			confirm({
				title: 'Eliminar cuenta',
				content: 'Desea eliminar la cuenta '+this.state.selected.cuenta+' ?',
				okText: 'Si',
				okType: 'danger',
				cancelText: 'No',
				onOk() {
					//////console.log('OK');
					//this.deleteCuentaApi;
					//////console.log(that);
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
		this.setState({crearVisible:false,disabled:false,selectItem:[],value:[]});
		destinos=[];
	}catch(err){
		console.error("###Error en la funcion cerrarModalCrear: "+err);
	}
}
crearCuenta(){


	
	try{
		const { form } = this.props;
	var text=form.getFieldValue('textoarea');
	//////console.log(text);
		//////console.log("Crear cuenta --->");
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
				//////console.log(values);
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
						//////console.log(res);
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
					//////console.log(error);
					//////console.log(error.response);
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
				btnText='Crear Mensaje'
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
				btnText='Eliminar cuenta'
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
	//////console.log(row);
	//////console.log("Click");
}
//funcion para guardar los datos de destinatarios
 handleChange(values) {
  ////////console.log(`selected ${values}`);

////////console.log(values.toString());

destinos=values;

var sc=destinos.length+" Destinatarios seleccionados";

this.setState({
	selectItem: sc
});



}

//Funcion para guardar los datos de textarea ...

onChanges ({ target: { value } }) {
    this.setState({ value });

////////console.log("exc"+this.state.value);




  };


sendmessage()
{

contador=contador+1;

////console.log(contador);

	//////console.log(destinos);
	var {value}=this.state;
//////console.log("exc"+value);
var token = Cookies("token");
	
	var body= JSON.stringify("destinos":destinos,
		"contenido":value)
var datos  = [];
var objeto = {};

	try{

	
if(destinos.length>0)
{

		for(var k=0; k<destinos.length; k++)
{
var cadena=destinos[k].substr(0,1);
var type;

if(cadena=="C")
{
	
	
	type="1";
	var re= /C/g;

	var exc=destinos[k].replace(re,'');

}
if(cadena=="G")
{
	

	type="2";

	var re= /G/g;

	var exc=destinos[k].replace(re,'');
}

	datos.push({ 
        "destination"    : exc,
        "typedestination" : type,
        "type": ""+this.state.valueradio+""

  
    });

}


objeto.destinations=datos;
objeto.priority="1";
objeto.sourcesystem="010101";
objeto.key="12345";
objeto.label="GUITEXTERV2";
objeto.message=value
 
//////console.log(objeto);


fetch('http://localhost:999/api',{method:'POST',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(objeto) })

		
			.then(response => {
				this.setState({
					 response: response
				},
	message.loading(' Procesando..',400)






		
				);

//////console.log(this.state.response);
var re=this.state.response;

console.log(re.status);
if(response.status<300)
{

	message.info("Enviado");

destinos=[];

}
if(response.status>300)
{
	message.warning("Ocurrió un problema en el envío",5);
	destinos=[];
}

			})

		}
		else{
			message.warning("Seleccione Destinatarios");
		}
	}catch(err){
		message.warning("Error en el envío",5);
		console.error('##Error en el envio de mensaje: ' + err);

		destinos=[];
	}

//this.cargacontactos();


message.destroy();

this.setState({
	crearVisible: false,
		value:[],
		values:[],
		disabled: false,
		selectItem:[]
	
	});
defaultV=[];


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
					 grupos: res,
					 longitud:res.data.length
				});




const {longitud}=this.state;
//////console.log("la longitud es:_______________-"+longitud);

 const {grupos}=this.state;



			 		for (var j = 0; j<longitud; j++) {	
  children.push(<Option key={"G"+grupos.data[j].id}><Tag color="gold">Grupo -></Tag>{grupos.data[j].nombre}</Option>);
  //////console.log(children)

  /*for (var b = 10; b < 20; b++) {
 children.push(<Option key={"G"+grupos.data[j].id}><Tag color="gold">Grupo -></Tag>{grupos.data[j].nombre}</Option>);



}*/

}

//////console.log(children);



}

			);





	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
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
					 longitud:response.data.length
				});
				const {contacts}=this.state;


//Object.keys(contacts).length;



const {longitud}=this.state;
//////console.log("la longitud es:_______________-"+longitud);


children=[];

				for (var i = 0; i<longitud; i++) {


					var estado=contacts.data[i].estado;

	if(estado==1)

	{			

  children.push(<Option key={"C"+contacts.data[i].id}><Tag color="cyan">Contacto -></Tag>{contacts.data[i].nombre} {contacts.data[i].apellido}</Option>);
}
if(estado=0)
{
	//console.log("desactivado");
}




//////console.log(this.state.contacts.data[i].id);

//////console.log(children);

  this.cargargrupos();

}
			}
			);
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	};






	
  }


  Okconfirm()
  {

var that=this;

try{


if(destinos == undefined || destinos.length == 0 || destinos.length < 1)
{
	message.warning("Seleccione Destinatarios");
}
else{
confirm({
				title: 'Enviar mensaje',
				content: 'Desea enviar el mensaje?',
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
					destinos=[];
				},
			});
}

}catch(err)
{
	console.error(err);
}

	


  }



showmodalplantillas()
{
	this.setState({
		verplantillas: true
	});
}




cerrarVerplantillas()
{
	this.setState({
		verplantillas: false
	});
}

seleccionPlantilla()
{
	this.setState({
		verplantillas: false
	});



}



 onSelectChange(selectedRowKeys) {
    //////console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  };



  changestatus(id)
  {
  	////console.log(id);

 this.setState({

verplantillas:false,
disabled: true

	});


try{

var stat;



axios.get('http://localhost:1012/plantillas/'+id,{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 plantilla: response.data
					 
				});
				const {contacts}=this.state;


const {plantilla}=this.state;

////console.log(plantilla);

this.setState({

	value: plantilla.texto


});

			}
			);


		axios.get('http://localhost:1012/plantillas/'+id+'/contactos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 pcontactos: response.data,
					 pcontactosL: response.data.length
					 
				});


				const {contacts}=this.state;


const {pcontactos}=this.state;
const {pcontactosL}=this.state;

defaultV=[];
var sc;



if(pcontactosL==0)
{

sc="0 Destinatarios seleccionados";

	this.setState({selectItem: sc });
}

for (var i = 0; i <pcontactosL; i++) {




	////console.log(pcontactos[i]);

var exchange=pcontactos[i].estado;

if(exchange==1)
{
	axios.get('http://localhost:1012/contactos/'+pcontactos[i].id,{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 contacto: response.data
					 
				});

//console.log(this.state.contacto);

stat=this.state.contacto.estado;
var idj=this.state.contacto.id;

//console.log("el estado es :"+exchange);

if(stat==1)
{
	//console.log("insertado: "+idj);
	defaultV.push("C"+idj);

//console.log(defaultV.length);

sc=destinos.length+" Destinatarios seleccionados";

//console.log(sc);


this.setState({
	selectItem: sc
});

}
if(stat==0)
{
	//console.log("desactivado");
}

}
);



destinos=[];
destinos=defaultV;




//defaultV.push("C"+pcontactos[i].id);


}

}

			}
			);

}catch(err)
{
	////console.log(err);
}


  }




getPlantillas()
{
	try{

dataPlantilla=[];

axios.get('http://localhost:1012/plantillas',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 plantillas: response.data,
					 longitud:response.data.length
				});
				const {contacts}=this.state;


const {plantillas}=this.state;

////console.log(plantillas);

//Object.keys(contacts).length;

for (var i = 0; i < this.state.longitud; i++) {

var j1=plantillas[i].id;
var jtexto=plantillas[i].texto;
var j2=(<TextArea value={jtexto} disabled />);
var j3=plantillas[i].estado;
var j4;
var j5;

	if (j3==1) {

j4="Activo";
j5=(<Button onClick={this.changestatus.bind(this, j1)} >Seleccionar</Button>);

	}

	if(j3==0)
	{

		j4="Inactivo";
j5=(<Button onClick={this.changestatus.bind(this, j1)} disabled={true}>Seleccionar</Button>);
	}




	dataPlantilla.push({

		"key": j1,
		"texto": j2,
		"estado": j4,
		"opcion": j5,



	});


}








			}
			);


	}
	catch(err)
	{
		console.error(err);
	}
}





onChangeradio(e){
    console.log('radio checked', e.target.value);
    this.setState({
      valueradio : e.target.value,
    });
  }





showModaldetalle()
{



	if (this.state.selected == {} || this.state.selected == null || this.state.selected == undefined){
			message.warning("Seleccione un mensaje !",3);
		}else{


	message.destroy();

var tex=(
<div style={
	{
		background: '#045FB4'
	}
}
>

<div style={{
	background: '#3399CC',
	fontColor:'black',
	opacity:'0.4',
	borderRadius:'6px'

}}>
<b>
<p>Destinatario:&nbsp;{this.state.selected.destino}</p>
<p>Numero:&nbsp;{this.state.selected.destinoNumero}</p>

<p>Fecha:&nbsp;{this.state.selected.date}</p>

</b>
</div>
<Row>
<p>Mensaje</p>
</Row>
<Row>
	<Col  offset={2} span={20}>
<p>{this.state.selected.mensaje}</p>
</Col>
</Row>
</div>
);



	message.info(tex,5);
}


}







  componentDidMount() {

this.cargacontactos();
this.llenarGridData();

this.getPlantillas();


}



  componentWilldMount() {



this.getPlantillas();
this.cargacontactos();


}




render() {


const columns = [
  {
    title: 'Texto',
    dataIndex: 'texto',
    key: 'texto',
    width: '50%',
  },
  {
    title: 'Estado',
    dataIndex: 'estado',
    key: 'estado',
    width: '25%',
  },
    {
    title: 'Opción',
    dataIndex: 'opcion',
    key: 'opcion',
    width: '25%',
  },
];


const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;







const { value } = this.state;





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
						<Divider orientation="left">Mensajes</Divider>
						<Row>
							<Col span={22} offset={1}>
								<BootstrapTable data={data} striped={true} pagination={ true } hover={true} selectRow={ this.selectRowProp } options={options}
								insertRow
								
								search
								>
									<TableHeaderColumn width='0%' dataField="id" isKey={true} dataAlign="center" dataSort={true} hidden="none">Id</TableHeaderColumn>
									<TableHeaderColumn width='48%' dataField="mensaje" dataAlign="center" dataSort={true}>Mensaje</TableHeaderColumn>
									<TableHeaderColumn width='12%' dataField="destino" dataAlign="center" dataSort={true}>Destino</TableHeaderColumn>
									<TableHeaderColumn width='17%' dataField="destinoNumero" dataAlign="center" dataSort={true}>Teléfono</TableHeaderColumn>
									<TableHeaderColumn width='8%' dataField="protocolo" dataAlign="center" dataSort={true}>Protocolo</TableHeaderColumn>

									<TableHeaderColumn width='15%' dataField="date" dataAlign="center" dataSort={true}>Fecha</TableHeaderColumn>
								
								</BootstrapTable>
							</Col>
							<Col offset={1} span={2}><Button onClick={this.showModaldetalle}>Detalles</Button></Col>

						</Row>
					</Col>
				</Row>
				<Modal title="Generar Mensaje" visible={this.state.crearVisible} okText="Crear" width={900} cancelText="Cancelar" onCancel={this.cerrarModalCrear} onOk={this.Okconfirm}>
					<Form layout="horizontal" id="Form1">
						<Row>

				<Col offset={21} span={5}><Button onClick={this.showmodalplantillas}>Plantillas</Button></Col>
			
							<Col offset={3} span={17}>





	<Select

	listItemHeight={250} 
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Seleccione Destinatarios"
    onChange={this.handleChange}
    maxTagCount={1000}
    disabled={this.state.disabled}
  >
    {children}
  </Select>

  <h5>{this.state.selectItem}</h5>
	




<Radio.Group onChange={this.onChangeradio} value={this.state.valueradio}>
        <Radio value={1}>SMS</Radio>
        <Radio value={2}>Telegram</Radio>
      </Radio.Group>



									<FormItem label="Descripción">
<TextArea
          value={value}
          onChange={this.onChanges}
          placeholder="Ingrese su mensaje"
          autoSize={{ minRows: 7, maxRows: 10 }}
          
 
        />

								</FormItem>
								

							</Col>
						</Row>
					</Form>
				</Modal>


<Modal title="Seleccionar Plantilla" visible={this.state.verplantillas} okText="Listo" width={900} cancelText="Cancelar" onCancel={this.cerrarVerplantillas} onOk={this.seleccionPlantilla}>
				

<Table columns={columns} dataSource={dataPlantilla} />


				</Modal>

			</div>
			);
		}catch(err){
			console.error('Error al ejeutar la funcion render: ' + err);
		}
	}
}
export default Form.create()(Formularios);
