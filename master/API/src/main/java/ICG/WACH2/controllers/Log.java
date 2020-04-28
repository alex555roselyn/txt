/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.controllers;
import org.apache.log4j.Logger;
/**
 *
 * @author vreyes
 */
public class Log {
    private static final Logger LOGGER = Logger.getLogger(Data.class);
    public void logInfo(String log){
        try{
            try{
                LOGGER.info(log);
            }catch(Exception ex){
                System.err.println("##Error al intentar escribir al archivo de logs exception: "+ex.toString());
            }
        }catch(Exception ex){
            System.err.println("##Error en la funcion de logInfo: "+ex.toString());
        }
    }
    public void logWarn(String log){
        try{
            try{
                LOGGER.warn(log);
            }catch(Exception ex){
                System.err.println("##Error al intentar escribir al archivo de logs exception: "+ex.toString());
            }
        }catch(Exception ex){
            System.err.println("##Error en la funcion de logWarn: "+ex.toString());
        }
    }
    public void logError(String log){
        try{
            try{
                LOGGER.error(log);
            }catch(Exception ex){
                System.err.println("##Error al intentar escribir al archivo de logs exception: "+ex.toString());
            }
        }catch(Exception ex){
            System.err.println("##Error en la funcion de logError: "+ex.toString());
        }
    }
}
