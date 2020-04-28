/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.controllers;

import java.util.regex.Pattern;

/**
 *
 * @author vreyes
 */
public class DB {
    Log log = new Log();
    public void crearCuenta (String cuenta,String emisor,String receptor,String tipo,String correos, Integer fila){
        try{
            String regex = "^([a-zA-Z][\\w\\_\\.]{2,15})\\@([a-zA-Z0-9.-]+)\\.([a-zA-Z]{2,4})$";
            Pattern pattern = Pattern.compile(regex);
            String[] correosLst;
            correosLst = correos.split(",");
            for (Integer i = 0 ; i < correosLst.length ; i++){
                if (pattern.matcher(correosLst[i]).matches()){
                    System.out.println("Correo: "+correosLst[i]);
                }else{
                    log.logWarn("El valor "+correosLst[i]+" de la fila "+fila+" no es un correo electronico");
                }
            }
        }catch(Exception ex){
            log.logError("##Error en la funcion crearCuenta exception: "+ex.toString());
        }
    }
}
