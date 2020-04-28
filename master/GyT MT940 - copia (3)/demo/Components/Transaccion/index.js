/* eslint-disable */
import React, { Component } from 'react';
import { Button, Modal,Row,Col,Divider,Form, message,Icon,Switch,Input,Radio,InputNumber,Alert,Upload,Select,Dropdown,Menu,DatePicker,Table,Tag,Popover,Tooltip} from 'antd';
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


class Formularios extends Component {
	constructor(props, context) {
	super(props,context);
	const { router, params, location, routes } = this.props
	this.state = {
		//id: null,
		//codigo :null,
		//descripcion:null,
		checked: false,
		file:null,
		selectRowProp: {},
		cellEditProp: {},
		rowSelected: {},
		selected:undefined,
		fileName:'Seleccionar archivo csv',
		keycloakConfig: {
			"url":"http://190.190.70.170:9000/auth",
		//	"url":"http://172.19.12.19:9000/auth",
			"clientId":"ACHFormularios",
			"realm":"WACH",
			"credentials":{
				"secret":"6235876e-d7d8-4b07-a2d0-3ce7d44c581e"
				//"secret":"de20eaea-1e3f-4497-804a-d888eecd5dbc"
			}
		},
		baseApi: 'http://172.19.12.19:8080',
	  //selected:[], //Para cabiae de estado a los seleccionados
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
		registros:[],
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
		],
		transaction:[
			{
				"id": 1012,
				"codigo" :"ABCD" ,
				"descripcion":"Nota de debito"
			}
		]

	};

//this.unselectableRows= this.unselectableRows.bind(this);
	this.handleChange= this.handleChange.bind(this);
	this.handletr = this.handletr.bind(this);
	//this.activeFormatter = this.activeFormatter.bind(this);
	//this.checkboxFormatter = this.checkboxFormatter.bind(this);
	this.onChange = this.onChange.bind(this);      //---------- funcion Activar o desact
		//	this.validaStatus =	 this.validaStatus.bind(this);

//	this.getId = this.getId.bind(this); //get unitario
	this.llenarGridData = this.llenarGridData.bind(this);
	this.selectRow = this.selectRow.bind(this);
	this.formatBotonCrear = this.formatBotonCrear.bind(this);
	this.showModalCrear = this.showModalCrear.bind(this);
	this.cerrarModalCrear = this.cerrarModalCrear.bind(this);

	//this.formatBotonEditar = this.formatBotonEditar.bind(this);
	//this.formatBotonEliminarDatos = this.formatBotonEliminarDatos.bind(this);
	this.crearCuenta = this.crearCuenta.bind(this);
	this.add = this.add.bind(this);
	this.remove = this.remove.bind(this);
	this.handleFiles = this.handleFiles.bind(this);
	this.formatBotonActualizarDatos = this.formatBotonActualizarDatos.bind(this);
  //this.formatBotonEliminarDatos = this.formatBotonEliminarDatos.bind(this);

	//this.llamadaRecursiva = this.llamadaRecursiva.bind(this);
	this.actualizarTr = this.actualizarTr.bind(this);
	this.actualizarTrApi = this.actualizarTrApi.bind(this);

	//this.eliminarTrans = this.eliminarTrans.bind(this);
	//this.deleteTransApi = this.deleteTransApi.bind(this);


	//this.crearTransaction = this.crearTransaction.bind(this);
	//this.showModalEditar = this.showModalEditar.bind(this);
	//this.actualizarTransaction = this.actualizarTransaction.bind(this);
	//this.actualizarApi = this.actualizarApi.bind(this);
	 this.showModalEditar = this.showModalEditar.bind(this);
	 this.cerrarModalEditar = this.cerrarModalEditar.bind(this);

	//Configuracion del selecctor de los rows y el color en que se marcan
	this.selectRowProp = {
		mode: 'radio',
		clickToSelect: true,
    //clickToExpand: true,
		onSelect: this.selectRow,
		bgColor: 'skyblue'
		//unselectable: this.state.unselectable
		//selected: this.state.selected
	};

//funcion para editar una fila
	//this.cellEditProp = {
	 // mode: "click",
//	blurToSave: true
//	};

} //fin del construct

//Funcion para almacenar en el state el row que se ha seleccionado de la tabla
selectRow(row, isSelected){
	try{
		console.log("Funcion selecRow realizado");
		//typeof resetForm === 'function' && resetForm();
			var filaSeleccionada = Object.assign({}, row);
			const { rowSelected } = this.state;
				this.setState({
				 rowSelected: filaSeleccionada,
				 selected:row
			});
			console.log(row+"que trae row en este momento");
	}catch(err){
		console.error('##Error en la funcion para guardar el item que se ha seleccionado : ' + err);
	}
}

//Ejemplo para bloquear cuando el estado sea 0 INACTIVO
/*unselectAllRow(e){
      this.setState({
        selected: []
      });
    }  */
/*unselectableRows(){
	try{
		this.setState{
			disable={row.row.estado=="0"}
			value={row.value}
		}
	}
} */

isExpandableRow(row){
	if(row.id <3)return true;
	else return false;
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
			axios.get('http://172.19.12.19:8080/transaction',{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}
		})
			.then(res => {

			//	this.setState({
				//	 data: res.data
			//	});

     // Cambia de estado Activo e Inactivo desde que realiza el get
			this.setState({
				 data:res.data = res.data.map((element) =>
				 {
						console.log(JSON.stringify(element + "contenido de data map"));
						element.estado = element.estado ? 'Activo' : 'Inactivo';
						return element;
					})
			});


			})
	}catch(err){
		console.error('##Error en el get para llenar la tabla: ' + err);
	}
}

actualizarTrApi(){
	var token = Cookies("token");
	try{
			/*if(this.state.Id == '' ){
					message.warning("Debe completar el campo");
			}else{ */
		var newObject = {};
		const form = this.props.form;
		form.validateFields((err, values) => {
				if (err) {
					console.error('#ERROR No se han llenado todos los datos del form: '+ err);
					return;
			}
			console.log('Objeto contenedor de valores de los objetos del Modal', values);
			//console.log(values.Id);
			newObject.correlativo=this.state.selected.correlativo;
			newObject.id=values.Id;
			newObject.codigo=values.Codigo;
			newObject.descripcion=values.Descripcion;
			newObject.estado=values.Estado;
			//form.resetFields();
			this.setState({visible:true});
		});

			if (newObject.id == null ){
					message.warning("complete campo faltante",3);
			}
			else	if (newObject.codigo.length < 1 ){
					 message.warning("complete el campo codigo",3);
		 }
			else if(!isNaN(newObject.codigo)){
				message.warning("El codigo no debe ser numerico",3);
				//invocar al modal para vovel a llenar
			}else if(newObject.codigo.length > 4){
				message.warning("El codigo no debe tener mas de 4 caracteres",5);
				//thi.showModalCrear();
			}
			else if(newObject.descripcion == null ){
				message.warning("complete campo Descripcion",2);
			}else{

				console.log(JSON.stringify(this.state.selected.correlativo+""));
				console.log(JSON.stringify(newObject)+"JSON que ira al put en NewObject");

			axios.put(this.state.baseApi + '/transaction/'+this.state.selected.correlativo,newObject,{
			headers: {
				'Authorization': 'Bearer ' + Cookies("token")
			}

		})
			.then(res => {
				//Logica de si funcionno
				//this.llenarGridData();
				console.log(res);
				if (res.status == 200){
					this.setState({editarVisible:false});
					this.llenarGridData();
					message.destroy();
					message.success("Registro Actualizado",2);
					this.setState({
						selected:undefined
					});

				}else if (res.data.codigo == 403){
						  this.setState({editarVisible:false});
							this.llenarGridData();
							message.destroy();
							message.warning(res.data.mensaje,5);

				}else if (res.data.codigo == 400){
						  this.setState({editarVisible:false});
							this.llenarGridData();
							message.destroy();
							message.warning(res.data.mensaje,5);


				}else{
					message.warning("No se pudo actualizar el registro, contacte al administrador",3);
				}
			}) //Fin de la promesa del put
		} //sentencia donde se realiza el put, despues de validar

	//}// primera validacion
	}catch(err){
		console.error('##Error al actualizar registro: ' + err);
	}
}


//Funcion que inicia el modal  para actualizar
actualizarTr(){
	try{
		//console.log("Ejecucion de la funcino actualizarTr");
		console.log("actualizarTR");
		console.log(this.state.selectRow);
		console.log("actualizarTR");
		var that = this;
		console.log(this.state.selected+"...");
		//console.log(JSON.stringify(this.state.selected));
		if (this.state.selected == {} || this.state.selected == null || this.state.selected == undefined){
			message.warning("Seleccione una fila !",1.5);
		}else{

					//Invoca al objeto Modal
					this.setState({editarVisible:true});
				  //this.setState({editarVisible:true,Id:this.state.result.id, Codigo:this.state.result.codigo, Descripcion:this.state.result.descripcion});
								try{
								axios.get('http://172.19.12.19:8080/transaction/'+this.state.selected.correlativo,{
								headers: {
									'Authorization': 'Bearer ' + Cookies("token")
								}
							})
								.then(res => {
									console.log(res+"paso en el get para llenar el form editar");
									this.setState({
										 result: res.data
									});
									//Llena el modal con los valores de la fila
									this.props.form.setFieldsValue({Correlativo:this.state.result.correlativo, Id:this.state.result.id, Codigo:this.state.result.codigo, Descripcion:this.state.result.descripcion, Estado:this.state.result.estado});
								})
						}catch(err){
							console.error('##Error en el get para llenar la tabla: ' + err);
						}
					//this.props.form.setFieldsValue({Id:this.state.result.id, Codigo:this.state.result.codigo, Descripcion:this.state.result.descripcion});
					//this.props.form.setFieldsValue({Id:15});
					//console.log("test");
					//console.log(this.state.result.id);
					//resetForm();
					//this.setState({
						//selected:undefined
				//	});
		}
	}catch(err){
		console.error("###Error al crear registro: "+err);
	}
}

// - - - - - - - - - - - - - - - - - values recoje el valor del evento
handleChange(event) {
    this.setState({[e.target.id]: event.target[0].value, [e.target.codigo]: event.target[0].value, descripcion: event.target[2].value});
  }

//HandleSubmit
crearCuenta(){
	try{
		var newObject = {};
			const form = this.props.form;
			form.validateFields((err, values) => {
				if (err) {
					console.error('#ERROR No se han llenado todos los datos del form: '+ err);
					return;
				}
				console.log('Recive los valores', values);
				//newObject.correlativo=values.Correlativo;
				newObject.id=values.Id;
				newObject.codigo=values.Codigo;
				newObject.descripcion=values.Descripcion;
				newObject.estado= values.Estado;
			});
				console.log(newObject.estado  +"paso value.estado");
			if (newObject.id == null ){
					message.warning("complete campo",3);
				}else /*if(existe == 202){
					message.warning("El registro ya existe",2);
					thi.showModalCrear();
				}else */
			 if(!isNaN(newObject.codigo)){
				message.warning("El codigo no debe ser numerico",3);
				//thi.showModalCrear();
			}else if(newObject.codigo.length > 4){
				message.warning("El codigo no debe tener mas de 4 caracteres",5);
				//thi.showModalCrear();
			}else if(newObject.descripcion == null ){
						message.warning("complete campo",2);
			}else{
			console.log(JSON.stringify(	newObject.correlativo)+"Correlativo");
			console.log(JSON.stringify(newObject)+" parametros que van al Post")

			//const form1 =console.log(JSON.stringify(form));
			//console.log("89+8989898");
			//console.log(form.values.Id);
			//console.log("89+8989898");

			axios.post(this.state.baseApi + '/transaction/crear',newObject,{
				headers: {
					'Authorization': 'Bearer ' + Cookies("token")
				}
				//body: JSON.stringify(data);
			})
				.then(res => {
					  //console.log(JSON.stringify(res));
						 //console.log(JSON.stringify(res.data.codigo)+".DATA");
						  //console.log(JSON.stringify(res.status)+"STATUS");
						//message.destroy();
						//this.llenarGridData();
						//message.success('Registro guardado con exito!!',3);
					 //if (res.status == 200){
						 console.log(res);
						if (res.status == 200){
							message.destroy();
							this.llenarGridData();
							message.success('Registro guardado con exito!!',3);
							this.setState({crearVisible:false});
							resetForm();
							//this.props.form.resetFiels()
						  //message.success(res.data.message+'Registro guardado con exito!!',3);
							//message.success(res.data.mensaje,5);
						}
						if (status == 400){
							console.log(JSON.stringify(res.status));
							message.destroy();
							this.llenarGridData();
							message.success('Registro ya existe con el id !!'+NewObject.id,3);
							this.setState({crearVisible:true,id:null,codigo:null,descripcion:null});
							resetForm();
						}

						 if (status== 500){
							this.setState({crearVisible:false,id:newObject.id,codigo:newObject.codigo,descripcion:newObject.descripcion});
							message.destroy();
							message.warning("El codigo debe contener 4 Letras",3);
							message.warning("No se ha podido guardar la informacion",3);
						}
					//}else{
					//	message.warning("No se ha podido guardar la informacion",3);
					//}

					}).catch(error => {
						console.log(error);
						console.log(error.response);
						//message.warning("Verique que la informacion vaya completo ",2);
					});
				} //validadcion
			//} //del else del get


	}catch(err){
		console.error("###Error  al enviar informacion: "+err);
	}
}
//--- - -- - - - - - - - - - - - -

// - - - - - - - - -
showModalCrear(){
	try{
		this.setState({crearVisible:true});
		//con esto limpio contenido al invocarse
		this.props.form.resetFields();
	}catch(err){
		console.error("###Error en la funcion showModalCrear: "+err);
	}
}

// ----------------------------------------------------------------------------------------------------------------------------
showModalEditar(){
	try{
		this.setState({editarVisible:true});
	}catch(err){
		console.error("###Error en la funcion showModalCrear: "+err);
	}
}
// - - - - - - - - -
formatBotonCrear(onClick){
	try{
		return (
			<InsertButton
				btnText='Crear Transac..'
				btnContextual='btn-primary'
				className='my-custom-class'
				btnGlyphicon='glyphicon-edit'
				//onClick={ () => this.showModalEditar(onClick) }
				onClick={ () => this.showModalCrear(onClick) }
				/>
		);
	}catch(err){
		console.error("###Error en la funcion: "+err);
	}
}

formatBotonActualizarDatos(onClick){
	try{
		return (
			<InsertButton
				btnText='Editar  Transac ..'
				btnContextual='btn-danger'
				className='my-custom-class'
				btnGlyphicon='glyphicon-edit'
        //onClick={ () => this.showModalEditar(onClick) }
				onClick={ () => this.actualizarTr(onClick) }
				/>
		);
	}catch(err){
		console.error("###Error en la funcion: "+err);
	}
}

/*formatBotonEliminarDatos(onClick){
	try{
		return (
			<InsertButton
				btnText='Eliminar Transac'
				btnContextual='btn-danger'
				className='my-custom-class'
				btnGlyphicon='glyphicon-edit'
				onClick={ () => this.eliminarTrans(onClick) }
				/>
		);
	}catch(err){
		console.error("###Error en la funcion: "+err);
	}
} */

// - - - - - - - - - - - - - - - -

cerrarModalCrear(){
	try{
		this.setState({crearVisible:false});

	}catch(err){
		console.error("###Error en la funcion cerrarModalCrear: "+err);
	}
}
/*onDestroyOnCloseChange(e: React.ChangeEvent<HTMLInputElement>){
	try{
		this.setState({destroyOnClose: e.target.checked});
	}catch(err){
		console.error("###Error en la funcion destroyOnClose: "+err);
	}
} */

cerrarModalEditar(){
	try{
		var that = this;
		this.setState({
			editarVisible:false,
			selected:undefined
		});
		console.log(that);
		this.llenarGridData(); //No lo esta realizando deja seleccionado la fila
		console.log("Cerrando el Modal editar");
		//location.reload(this.llenarGridData()); AQUI HAY QUE CORREGIR EL SELECTED DE LA TUPLA
	}catch(err){
		console.error("###Error en la funcion cerrarModalEditar: "+err);
	}
}
// - - - - - - - - - - - - - - -
/////////////////////////////////////
/*showModalEditar(){
	try{
		console.log("click en editar");
	}catch(err){
		console.error("###Error en la funcion showModalEditar: "+err);
	}
}
//Funcion Boton Crear cuenta
/*formatBotonEditar(onClick){
	try{
		return (
			<InsertButton
				btnText='Actualizar registro'
				btnContextual='btn-secundary'
				className='my-custom-class'
				btnGlyphicon='glyphicon-edit'
				//onClick={ () => this.showModalEditar(onClick) }
				onClick={ () => this.actualizarTr(onClick) }
				/>
		);
	}catch(err){
		console.error("###Error en la funcion: "+err);
	}
}*/
//////////////////////////////////////

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

handletr(value){
	this.setState({id:value, codigo: value, descripcion: value});
}

expandComponent(row){
	console.log(row);
	console.log("Click");
}


 onChange(checked){
 console.log(`${checked? 1:0}`);
// console.log(`switch to ${checked}`);

/*var ckeckbox = checked;
 if(ckeckbox.checked){
		 checked = 0;
		 console.log(checked +"mensaje");
		 return cheked;
	 }else{
		 checked = 1;
		 console.log(checked + "mensaje");
		 return cheked;
	 }
console.log(cheked);
		return cheked; */
}

render() {
	try{
		const { getFieldValue } = this.props.form;
		const formItemLayout = {
			  labelCol: {
				xs: { span: 24 },
				sm: { span: 5 },
			  },
			  wrapperCol: {
				xs: { span: 24 },
				sm: { span: 5 },
			  },
			};
		const formItemLayoutWithOutLabel = {
			  wrapperCol: {
				xs: { span: 24, offset: 0 },
				sm: { span: 5, offset: 4 },
			  },
			};
		const options = {
			 onRowClick: function(row){
				 return (
				 <Tooltip placement="top" title={"Ola k ase"}></Tooltip>
				 );
			},

			insertBtn: this.formatBotonActualizarDatos,
			//updateBtn: this.formatBotonActualizarDatos,
			//deleteBtn: this.formatBotonEliminarDatos,
			exportCSVBtn: this.formatBotonCrear,
			exportCSVText: 'Exportar a csv',
			//deleteBtnText: 'Eliminar info',
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
		const { visible, onCancel, onCreate, form, } = this.props;
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
						//onClick={() => this.update(k)}
					/>
				) : null}
			</FormItem>
		);
	});
		return (

			<div className="contenedorPrincipal">

				<Row style={{height:"90vh"}}>
					<Col span={24}>
						<Divider orientation="left">Transacciones</Divider>
						<Row>
							<Col span={22} offset={1}>
								<BootstrapTable data={this.state.data} striped={true} pagination={ true } hover={true} selectRow={ this.selectRowProp } options={options}
								insertRow
								exportCSV
								search
								>
								<TableHeaderColumn width='0%' dataField="correlativo" isKey={true} dataAlign="center" dataSort={true}>Correlativo</TableHeaderColumn>
									<TableHeaderColumn width='9%' dataField="id" dataAlign="center" dataSort={true}>Id</TableHeaderColumn>
									<TableHeaderColumn width='10%' dataField="codigo" dataAlign="center" dataSort={true}>Codigo</TableHeaderColumn>
									<TableHeaderColumn width='35%' dataField="descripcion" dataAlign="center" dataSort={true}>Descripcion</TableHeaderColumn>
									<TableHeaderColumn width='15%' dataField="estado" dataAlign="center" dataSort={true}>Estado</TableHeaderColumn>
								</BootstrapTable>
							</Col>
						</Row>
					</Col>
				</Row>

				<Modal
					title="Nuevo registro"
					visible={this.state.crearVisible}
					okText="Crear" width={320}
					cancelText="Cancelar"
					onCancel={this.cerrarModalCrear}
					onOk={this.crearCuenta}
					>
					<Form layout="horizontal" id="Form1">
						<Row>
							<Col offset={5} span={17}>


								<Form.Item label="Id" help="Numerico Ej.1234">{getFieldDecorator('Id', {
									rules: [{ required: true, message: 'Correlativo de transaccion!' }],
									})(
										<Input placeholder="Id"/>
									)}</Form.Item>

									<Form.Item label="Codigo" help="Letras ej AAAA o aaaa 4 maximo">{getFieldDecorator('Codigo', {
										rules:[{ required: true, message: 'permitidos 4 Letras Mayusculas o Minusculas Ejemplo:(FCMI)'}],
									})(
									<Input placeholder="Codigo"/>
								)}</Form.Item>

									<Form.Item label="Descripcion" help="50 caracteres permitido">{getFieldDecorator('Descripcion', {
										rules: [{ required: true, message: '50 Caracteres permitido!' }],
									})(
									<TextArea placeholder="Descripcion" autosize={{ minRows: 2, maxRows: 6 }} />
									)}</Form.Item>

									<Form.Item label="Estado" help="Activo o Inactivo ">{getFieldDecorator('Estado', {
											rules: [{ required: true, message: 'Estado!' }],
											})(
												<Input placeholder="Estado"/>
											)}</Form.Item>

							</Col>
						</Row>
					</Form>
				</Modal>

				<Modal title="Editar registro"
				visible={this.state.editarVisible}
				okText="Guardar" width={320}
				cancelText="Cancelar"
				onCancel={this.cerrarModalEditar}
				onOk={this.actualizarTrApi}>
				<Form layout="horizontal" id="Form1">
					<Row>
						<Col offset={5} span={17}>

							<Form.Item label="Id" help="Numerico Ej.1234">{getFieldDecorator('Id', {
								rules: [{ required: true, message: 'Correlativo de transaccion!' }],
								})(
									<Input placeholder="Id"/>
								)}</Form.Item>

								<Form.Item label="Codigo" help="Letras ej AAAA o aaaa 4 caracteres">{getFieldDecorator('Codigo', {
									rules:[{ required: true, message: 'permitidos 4 Letras Mayusculas o Minusculas Ejemplo:(FCMI)'}],
								})(
								<Input placeholder="Codigo"/>
							)}</Form.Item>

								<Form.Item label="Descripcion" help="50 caracteres permitido">{getFieldDecorator('Descripcion', {
									rules: [{ required: true, message: '50 Caracteres permitido!' }],
								})(
								<TextArea placeholder="Descripcion" autosize={{ minRows: 2, maxRows: 6 }} />
								)}</Form.Item>

								<Form.Item label="Estado" help="Activo o Inactivo ">{getFieldDecorator('Estado', {
										rules: [{ required: true, message: 'Estado!' }],
										})(
											<Switch onChange={this.onChange}/>
										)}</Form.Item>
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
