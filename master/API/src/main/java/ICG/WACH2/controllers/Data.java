/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.controllers;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import org.springframework.stereotype.Component;
import java.util.Base64;
import java.util.List;
import java.util.regex.Pattern;
//import org.apache.log4j.Logger;
/**
 *
 * @author vreyes
 */
@Component
public class Data {
 String nombreArchivo;
 String base64;
 Log log = new Log();
 DB db = new DB();
 Respuesta respuesta = new Respuesta();

    public String getNombreArchivo() {
        return nombreArchivo;
    }

    public String getBase64() {
        return base64;
    }

    public void setNombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }

    public void setBase64(String base64) {
        this.base64 = base64;
    }
    
    public Respuesta getFile(String fileName, String base64) throws IOException{
        List<Cuenta> cuentas = new ArrayList<Cuenta>();
        respuesta.setMensaje("Cuentas cargadas con exito");
        respuesta.setCodigo(200);
        //String respuesta = "Procesado con exito";
        try{
            base64 = base64.replace("data:application/vnd.ms-excel;base64,", "");
            byte[] content;
            content = Base64.getDecoder().decode(base64);
            InputStream is = null;
            BufferedReader bfReader = null;
            is = new ByteArrayInputStream(content);
            bfReader = new BufferedReader(new InputStreamReader(is));
            String temp = null;
            Integer Contador = 1;
            Boolean detener = false;
            
            
            while((temp = bfReader.readLine()) != null && detener == false){
                Cuenta cta = new Cuenta();
                String[] parts = temp.split(";");
                String cuenta = "";
                String remitente = "";
                String receptor = "";
                String tipo = "";
                String correos = "";
                String[] correosList = null;
                //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*    Cuenta      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
                try{
                    cuenta = parts[0];
                    if (cuenta.equals("")){
                        log.logWarn("La fila "+Contador.toString()+" tiene el campo cuenta en blanco");
                        detener = true;
                        respuesta.setMensaje("La fila "+Contador.toString()+" tiene el campo cuenta en blanco");
                        respuesta.setCodigo(400);
                        break;
                    }else{
                        cta.setCuenta(cuenta);
                    }
                }catch(ArrayIndexOutOfBoundsException ex){
                    log.logWarn("La fila "+Contador.toString()+" no tiene el campo cuenta exception:"+ex.toString());
                    detener = true;
                    respuesta.setMensaje("La fila "+Contador.toString()+" no tiene el campo cuenta");
                    respuesta.setCodigo(400);
                    break;
                }
                //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*    Remitente      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
                try{
                    remitente = parts[1];
                    if (remitente.equals("")){
                        log.logWarn("La fila "+Contador.toString()+" tiene el campo remitente en blanco");
                        detener = true;
                        respuesta.setMensaje("La fila "+Contador.toString()+" tiene el campo remitente en blanco");
                        respuesta.setCodigo(400);
                        break;
                    }else{
                        cta.setRemitente(remitente);
                    }
                }catch(ArrayIndexOutOfBoundsException ex){
                    log.logWarn("La fila "+Contador.toString()+" no tiene el campo remitente exception:"+ex.toString());
                    detener = true;
                    respuesta.setMensaje("La fila "+Contador.toString()+" no tiene el campo remitente");
                    respuesta.setCodigo(400);
                    break;
                }
                //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*    Destinatario      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
                try{
                    //Validaciones del campo receptor
                    receptor = parts[2];
                    if (receptor.equals("")){
                        log.logWarn("La fila "+Contador.toString()+" tiene el campo receptor en blanco");
                        detener = true;
                        respuesta.setMensaje("La fila "+Contador.toString()+" tiene el campo receptor en blanco");
                        respuesta.setCodigo(400);
                        break;
                    }else{
                        cta.setDestinatario(receptor);
                    }
                }catch(ArrayIndexOutOfBoundsException ex){
                    log.logWarn("La fila "+Contador.toString()+" no tiene el campo destinatario exception:"+ex.toString());
                    detener = true;
                    respuesta.setMensaje("La fila "+Contador.toString()+" no tiene el campo destinatario");
                    respuesta.setCodigo(400);
                    break;
                }
                //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*    Tipo      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
                try{
                    tipo = parts[3];
                    if (tipo.equals("ADJUNTORJE") || tipo.equals("EMBEDIDO") || tipo.equals("SWIFT") || tipo.equals("ADJUNTOPDF")){
                        if (tipo.equals("")){
                            log.logWarn("La fila "+Contador.toString()+" tiene el campo tipo en blanco");
                            detener = true;
                            respuesta.setMensaje("La fila "+Contador.toString()+" tiene el campo tipo en blanco");
                            respuesta.setCodigo(400);
                            break;
                        }else{
                            cta.setTipoEnvio(tipo);
                        }                    
                    }else{
                        log.logWarn("La fila "+Contador.toString()+" tiene un tipo desconocido");
                        detener = true;
                        respuesta.setMensaje("La fila "+Contador.toString()+" tiene un tipo desconocido");
                        respuesta.setCodigo(400);
                        break;
                    }

                }catch(ArrayIndexOutOfBoundsException ex){
                    log.logWarn("La fila "+Contador.toString()+" no tiene el campo tipo exception:"+ex.toString());
                    detener = true;
                    respuesta.setMensaje("La fila "+Contador.toString()+" no tiene el campo tipo");
                    respuesta.setCodigo(400);
                    break;
                }
                //*-*-*-*-*-*-*-*-*-*-*-*-*-*-*    Correos      *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-
                try{
                    if (parts.length < 5 && (tipo.equals("ADJUNTORJE")  || tipo.equals("ADJUNTOPDF") || tipo.equals("EMBEDIDO") )){
                        log.logWarn("La fila "+Contador.toString()+" no tiene direcciones de correo electronico");
                        detener = true;
                        respuesta.setMensaje("La fila "+Contador.toString()+" no tiene direcciones de correo electronico");
                        respuesta.setCodigo(400);
                        break;
                    }else{
                        List<String> c = new ArrayList<String>();
                        cta.setCorreos(c);
                    }
                    correos = parts[4];
                    
                    if (!tipo.equals("SWIFT")){
                        if (correos.equals("")){
                            log.logWarn("La fila "+Contador.toString()+" tiene el campo correos en blanco");
                            detener = true;
                            respuesta.setMensaje("La fila "+Contador.toString()+" tiene el campo correos en blanco");
                            respuesta.setCodigo(400);
                            break;
                        }else{
                            String[] correosLst;
                            List<String> correosValidos = new ArrayList<String>();
                            correosLst = correos.split(",");
                            for (Integer i = 0; i < correosLst.length ; i++){
                                if (validarCorreoElectronico(correosLst[i])){
                                    //Logica de correo valido
                                    correosValidos.add(correosLst[i]);
                                }else{
                                    log.logWarn("La fila "+Contador.toString()+" tiene el correo "+correosLst[i]+" no es un correo electronico valido");
                                    detener = true;
                                    respuesta.setMensaje("La fila "+Contador.toString()+" tiene el correo "+correosLst[i]+" no es un correo electronico valido");
                                    respuesta.setCodigo(400);
                                }
                            }
                            cta.setCorreos(correosValidos);
                        }
                    }else{
                            log.logWarn("La fila "+Contador.toString()+" es del tipo Swift por lo tanto no debe llevar correos");
                            detener = true;
                            respuesta.setMensaje("La fila "+Contador.toString()+" es del tipo Swift por lo tanto no debe llevar correos");
                            respuesta.setCodigo(400);
                    }
                    
                }catch(ArrayIndexOutOfBoundsException ex){
                    log.logWarn("La fila "+Contador.toString()+" no tiene el campo correo electronico exception:"+ex.toString());
                }catch(Exception ex){
                    log.logError("Error en la funcion de recorrido de los correos electornicos exception "+ex.toString());
                }
                //db.crearCuenta(cuenta, tipo, receptor, tipo, correos,Contador);
                cuentas.add(cta);
                Contador++;
            }
            respuesta.setCuenta(cuentas);
        }catch(Exception ex){
            log.logError("Error en la funcion getFile: "+ex.toString());
            respuesta.setMensaje("No se pudo realizar la carga de cuentas, contacte a Soporte ICG");
            respuesta.setCodigo(500);
        }
        //respuesta.setCuenta(cuentas);
        return respuesta;
    }
    
    public Boolean validarCorreoElectronico(String correo){
        Boolean r = null;
        try{
            String regex = "^([a-zA-Z][\\w\\_\\.]{2,15})\\@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,4})$";
            Pattern pattern = Pattern.compile(regex);
                if (pattern.matcher(correo).matches()){
                    r = true;
                }else{
                    r = false;
                }
        }catch(Exception ex){
            log.logError("##Error en la funcion crearCuenta exception: "+ex.toString());
        }
        return r;
    }
}
