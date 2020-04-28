/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.controllers;

import ICG.WACH2.BICSRepository;
import ICG.WACH2.CorreosRepository;
import ICG.WACH2.EntidadesRepository;
import ICG.WACH2.Models.adm_cuenta;
import com.google.gson.Gson;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author vreyes
 */
public class DBCuentas {

    public Integer guardarCuentas(String cuentas, EntidadesRepository entidadesRepository,BICSRepository bicsRepository, CorreosRepository correosRepository){
        try{
            //ICG.WACH2.Models.adm_cuenta cuenta = new ICG.WACH2.Models.adm_cuenta();
            //ICG.WACH2.Models.adm_cuenta cta = new ICG.WACH2.Models.adm_cuenta();
            Gson gson = new Gson();
            List<ICG.WACH2.Models.adm_cuenta> ctus = new ArrayList<ICG.WACH2.Models.adm_cuenta>();
            List<Cuenta> ctas = new ArrayList<Cuenta>();
            Respuesta res = new Respuesta();
            res = gson.fromJson(cuentas, Respuesta.class);
            ctas = res.getCuenta();
            // entidadesRepository.deleteAll();
            for(Integer i = 0 ; i < res.getCuenta().size() ; i++){
                ICG.WACH2.Models.adm_cuenta cta = new ICG.WACH2.Models.adm_cuenta();
                ICG.WACH2.Models.adm_bic bic = new ICG.WACH2.Models.adm_bic();
                ICG.WACH2.Models.adm_bic bicSender = new ICG.WACH2.Models.adm_bic();
                ICG.WACH2.Models.adm_bic bicReceiver = new ICG.WACH2.Models.adm_bic();
                ICG.WACH2.Models.adm_tipoCuenta tipoCuenta = new ICG.WACH2.Models.adm_tipoCuenta();

                Integer bicEmisor;
                Integer bicReceptor;
                Integer tipoEnvio = 0 ;
                Integer idCuenta = 0 ;
                ICG.WACH2.Models.adm_bic bicDest = new ICG.WACH2.Models.adm_bic();
                Object o = res.getCuenta().get(i);
                String cuenta = gson.toJson(res.getCuenta().get(i));
                Cuenta c = gson.fromJson(cuenta, Cuenta.class);


                //Replace de bics Remitente
                System.out.println("Replace de bics Remitente "+c.getRemitente());
                 String bicRem=c.getRemitente();
                  if(bicRem.length() != 12){
                      System.out.println("Ha pasado la iteracion aqui . . . .");

                    if(bicRem.length() == 11  ){
                             bicRem = bicRem.substring(0,8)+ "X" + bicRem.substring(8,11);
                             System.out.println(bicRem);
                             c.setRemitente(bicRem);
                      }else{
                              //bicRem = bicRem + "XXXX";  //Para longitud 8
                              for(Integer j = bicRem.length(); j<12; j++){
                               bicRem= bicRem + "X";
                               }
                               System.out.println(bicRem);
                               c.setRemitente(bicRem);
                          }
                      }else
                        {
                        }





                //Replace de bics Destinaratio
               String bic_Rcpt = c.getDestinatario();
               if(bic_Rcpt.length() != 12){
                      System.out.println("Ha pasado la iteracion aqui . . . .");

                    if(bic_Rcpt.length() == 11  ){
                             bic_Rcpt = bic_Rcpt.substring(0,8)+ "X" + bic_Rcpt.substring(8,11);
                             System.out.println(bic_Rcpt);
                             c.setDestinatario(bic_Rcpt);
                      }else{

                            // bic_Rcpt = bic_Rcpt + "XXXX"; //Para longitud 8
                               for(Integer j = bic_Rcpt.length(); j<12; j++){
                               bic_Rcpt= bic_Rcpt + "X";
                               }
                               System.out.println(bic_Rcpt);
                               c.setDestinatario(bic_Rcpt);
                          }
                      }else
                        {
                        }


                //Set de bics Remitente
                if (bicsRepository.findByBICNombre(c.getRemitente())){
                    System.out.println("El BIC del remitente "+c.getRemitente()+" ya existe en la base de datos con el id "+bicsRepository.getIdBIC(c.getRemitente()));
                    bicReceptor= bicsRepository.getIdBIC(c.getRemitente());
                    bicSender.setId(Long.valueOf(bicReceptor));

                }else{
                    System.out.println("Se procede a crear el BIC remitente "+c.getRemitente());
                    System.out.println("Este es el bic que cambia");
                    bic.setNombre(c.getRemitente());
                    bicsRepository.save(bic);
                    bicReceptor= bicsRepository.getIdBIC(c.getRemitente());
                    bicSender.setId(Long.valueOf(bicReceptor));
                }
                //Set de bics Remitente
                if (bicsRepository.findByBICNombre(c.getDestinatario())){
                    System.out.println("El BIC del remitente "+c.getDestinatario()+" ya existe en la base de datos con el id "+bicsRepository.getIdBIC(c.getDestinatario()));
                    bicEmisor = bicsRepository.getIdBIC(c.getDestinatario());
                    bicReceiver.setId(Long.valueOf(bicEmisor));
                }else{
                    System.out.println("Se procede a crear el BIC remitente "+c.getDestinatario());
                    bicDest.setNombre(c.getDestinatario());
                    bicsRepository.save(bicDest);
                    bicEmisor = bicsRepository.getIdBIC(c.getDestinatario());
                    bicReceiver.setId(Long.valueOf(bicEmisor));
                }
                //Tipo envio
                if (c.getTipoEnvio().equals("SWIFT")){
                    tipoEnvio = 1;
                }else if(c.getTipoEnvio().equals("ADJUNTOPDF")){
                    tipoEnvio = 2;
                }else if(c.getTipoEnvio().equals("EMBEDIDO")){
                    tipoEnvio = 3;
                }else if(c.getTipoEnvio().equals("ADJUNTORJE")){
                    tipoEnvio = 4;
                }
                //Creando cuenta
                System.out.println("cuenta a crear "+c.getCuenta());
                String cTemp=c.getCuenta();
                 if(cTemp.length()>= 11){
                    }else{
                    // Aqui se llena con ceros a la izquierda
                        //cuenta =  StringUtils.leftPad(cuenta, 11, "0");
                        for(Integer j = cTemp.length() ; j < 11 ; j++){
                        cTemp = "0"+cTemp;
                        System.out.println("padding con 0");
                    }

                    System.out.println(cuenta);
                        c.setCuenta(cTemp);
                  }

                if (entidadesRepository.findByCuenta(c.getCuenta())){
                    idCuenta = entidadesRepository.getIdCuenta(c.getCuenta());
                    System.out.println("La cuenta "+c.getCuenta()+" ya existe en la base de datos con el id "+entidadesRepository.getIdCuenta(c.getCuenta()));
                }else{
                    System.out.println("Se procede a crear la cuenta "+c.getCuenta());
                    cta.setNombre(c.getCuenta());
                    cta.setBicReceiver(bicReceiver);
                    //cta.setReceiver(bicReceptor);
                    //cta.setSender(bicEmisor);
                    //cta.setTipo(tipoEnvio);
                    tipoCuenta.setId(tipoEnvio);
                    cta.setAdm_tipoCuenta(tipoCuenta);
                    cta.setBicSender(bicSender);
                    entidadesRepository.save(cta);
                    System.out.println("Guardo la cuenta");
                    idCuenta = entidadesRepository.getIdCuenta(c.getCuenta().toString());
                    //idCuenta = 1 ;
                    System.out.println("ID cuenta guardada: "+idCuenta);
                }
                    if (c.getCorreos().size() == 0){
                        System.out.print("Tipo swift no tiene correos");
                    }else{
                            System.out.println("-Correos lista-");
                            System.out.println(c.getCorreos());
                            adm_cuenta ct = new adm_cuenta();
                            //String cuentaid = idCuenta.toString();
                            String cuentaid = "1";
                            ct.setId(Long.valueOf(cuentaid));
                        for(Integer j = 0 ; j < c.getCorreos().size() ; j++ ){
                            ICG.WACH2.Models.adm_cuenta cuent = new ICG.WACH2.Models.adm_cuenta();
                            System.out.println("Iteracion de guardar correo: "+j+" valor: "+c.getCorreos().get(j));
                            System.out.println(idCuenta);
                            System.out.println(c.getCorreos().get(j));
                            System.out.println("Existe correo: "+correosRepository.findByDireccion(c.getCorreos().get(j), Long.valueOf(idCuenta.toString())));
                           ICG.WACH2.Models.adm_correo correo = new ICG.WACH2.Models.adm_correo();
                           if (correosRepository.findByDireccion(c.getCorreos().get(j), Long.valueOf(idCuenta.toString()))){
                               System.out.println("IF");
                            System.out.println("Corre "+c.getCorreos().get(j)+" de la cuenta "+c.getCuenta()+" ya existe");
                           }else{
                               System.out.println("ELSE");
                             //correo.setCuenta(idCuenta);
                             cuent.setBicReceiver(bicReceiver);
                             cuent.setAdm_tipoCuenta(tipoCuenta);
                             cuent.setBicSender(bicSender);
                             cuent.setCuenta(cta.getNombre());
                             cuent.setId(Long.valueOf(idCuenta.toString()));
                             correo.setCuenta(cuent);
                             correo.setDireccion(c.getCorreos().get(j));
                             correosRepository.save(correo);
                             System.out.println("##Creando correo:"+c.getCorreos().get(j));
                           }
                        }
                    }
            }
            System.out.println("Fin de ejecucion");
        }catch(Exception ex){
            System.out.println("##Error en la fucnio guardar cuentas exception: "+ex.toString());
        }
        return 1;
    }
}
