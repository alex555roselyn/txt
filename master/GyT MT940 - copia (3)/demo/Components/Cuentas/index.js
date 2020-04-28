/* eslint-disable */
import React, { Component } from 'react';
import {  Button, Modal, Row, Col, Divider,Form, message,Icon, Input, Radio, InputNumber, Alert, Upload, Select, Dropdown, Menu, DatePicker, Table, Tag, Popover, Tooltip} from 'antd';
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


class Formularios extends Component {
	constructor(props, context) {
	super(props,context);
	const { router, params, location, routes } = this.props
	this.state = {
		response:null,
		body:[],
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
		"url":"http://172.19.12.15:8080/auth/",
		"clientId":"texter",
		  "ssl-required": "external",
		   "verify-token-audience": true,
		"realm":"plantilla",
				  "credentials": {
    "secret": "c0375fc1-48f2-4319-aeab-f64e17b8bdcf"
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
		console.log("Fin de la ejecucion");
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
	//console.log(idEntidad);
	//console.log(token);
	var filtro = '';
	if (parseInt(idEntidad) != 0){
		filtro = 'propios:"'+idEntidad+'"';
	}else{}
	try{
		/*axios.get('http://172.19.12.12:8080/cuentas',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {
				this.setState({
					 data: res.data
				});
			})*/
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
				console.log(res);
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
		console.log("click en editar");
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
		console.log(this.state.selected);
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
					console.log('OK');
					//this.deleteCuentaApi;
					console.log(that);
					that.deleteCuentaApi();
				},
				onCancel() {
					console.log('Cancel');
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
	console.log(text);
		console.log("Crear cuenta --->");
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
				console.log(values);
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
						console.log(res);
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
					console.log(error);
					console.log(error.response);
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
	console.log(row);
	console.log("Click");
}
//funcion para guardar los datos de destinatarios
 handleChange(values) {
  //console.log(`selected ${values}`);

//console.log(values.toString());

destinos=values;


}

//Funcion para guardar los datos de textarea ...

onChanges ({ target: { value } }) {
    this.setState({ value });

//console.log("exc"+this.state.value);




  };


sendmessage()
{
	console.log(destinos);
	var {value}=this.state;
console.log("exc"+value);
var token = Cookies("token");
	
	var body= JSON.stringify("destinos":destinos,
		"contenido":value)
var datos  = [];
var objeto = {};

	try{


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
        "type": "1"

  
    });

}


objeto.destinations=datos;
objeto.priority="1";
objeto.sourcesystem="010101";
objeto.key="12345";
objeto.label="GUITEXTERV2";
objeto.message=value
 
console.log(objeto);


fetch('http://172.19.12.15:999/api/message/',{method:'POST',headers:{'Content-Type': 'Application/json', 'Authorization':'Bearer ' + Cookies("token")},body: JSON.stringify(objeto) })

		
			.then(res => {
				this.setState({
					 response: res.status
				},
	message.loading(' Procesando..')
		
				);

console.log(this.state.response);
var re=this.state.response;
if(res.status==200)
{

	message.info("Enviado");

}
else
{
	message.warning("Ocurrió un problema en el envío",5);
}

			})
	}catch(err){
		message.warning("Error en el envío",5);
		console.error('##Error en el envio de mensaje: ' + err);
	}

//this.cargacontactos();


}



cargargrupos()
{
	var token = Cookies("token");

		try{
		axios.get('http://backendtexter.190.190.70.182.nip.io/grupos',{
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
  console.log()

}

			});
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	};



}








  cargacontactos() {
 
var token = Cookies("token");
	



	try{
		axios.get('http://backendtexter.190.190.70.182.nip.io/contactos',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
		.then(response => {
				this.setState({
					 contacts: response
				});
				const {contacts}=this.state;




				for (var i = 0; i<=Object.keys(contacts).length; i++) {

				

  children.push(<Option key={"C"+contacts.data[i].id}><Tag color="cyan">Contacto -></Tag>{contacts.data[i].nombre} {contacts.data[i].apellido}</Option>);
console.log(this.state.contacts.data[i].id);

console.log(children);

  this.cargargrupos();

}
			}
			);
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	};






	
  }











  componentDidMount() {

this.cargacontactos();



}




render() {







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
								<BootstrapTable data={this.state.data} striped={true} pagination={ true } hover={true} selectRow={ this.selectRowProp } options={options}
								insertRow
								
								search
								>
									<TableHeaderColumn width='7%' dataField="id" isKey={true} dataAlign="center" dataSort={true} hidden="none">Id</TableHeaderColumn>
									<TableHeaderColumn width='18%' dataField="cuenta" dataAlign="center" dataSort={true} hidden="none">Cuenta</TableHeaderColumn>
									<TableHeaderColumn width='18%' dataField="remitente" dataAlign="center" dataSort={true} hidden="none">Remitente</TableHeaderColumn>
									<TableHeaderColumn width='18%' dataField="destinatario" dataAlign="center" dataSort={true} hidden="none">Destinatario</TableHeaderColumn>
									<TableHeaderColumn width='22%' dataField="tipoEnvio" dataAlign="center" dataSort={true} hidden="none">Tipo envio</TableHeaderColumn>
									<TableHeaderColumn width='25%' dataField="correos" onClick={this.expandComponent} dataAlign="center" hidden="none">Destinatarios</TableHeaderColumn>
								</BootstrapTable>
							</Col>
						</Row>
					</Col>
				</Row>
				<Modal title="Generar Mensaje" visible={this.state.crearVisible} okText="Crear" width={900} cancelText="Cancelar" onCancel={this.cerrarModalCrear} onOk={this.sendmessage}>
					<Form layout="horizontal" id="Form1">
						<Row>
							<Col offset={3} span={17}>
	<Select

	listItemHeight={250} 
	
    mode="multiple"
    style={{ width: '100%' }}
    placeholder="Please select"
    onChange={this.handleChange}

  >
    {children}
  </Select>

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
			</div>
			);
		}catch(err){
			console.error('Error al ejeutar la funcion render: ' + err);
		}
	}
}
export default Form.create()(Formularios);
