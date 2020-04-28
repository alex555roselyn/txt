/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.controllers;

import java.util.List;

/**
 *
 * @author vreyes
 */
public class Respuesta {
    Integer codigo;
    String data;
    String mensaje;
    List Cuenta;

    public List getCuenta() {
        return Cuenta;
    }

    public void setCuenta(List Cuenta) {
        this.Cuenta = Cuenta;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }
    
    public Integer getCodigo() {
        return codigo;
    }

    public String getData() {
        return data;
    }

    public void setCodigo(Integer codigo) {
        this.codigo = codigo;
    }

    public void setData(String data) {
        this.data = data;
    }
}
