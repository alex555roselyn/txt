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
public class Cuenta {
    String cuenta, remitente,destinatario,tipoEnvio;
    List<String> correos;

    public List<String> getCorreos() {
        return correos;
    }

    public void setCorreos(List<String> correos) {
        this.correos = correos;
    }

    public String getCuenta() {
        return cuenta;
    }

    public String getRemitente() {
        return remitente;
    }

    public String getDestinatario() {
        return destinatario;
    }

    public String getTipoEnvio() {
        return tipoEnvio;
    }

    public void setCuenta(String cuenta) {
        this.cuenta = cuenta;
    }

    public void setRemitente(String remitente) {
        this.remitente = remitente;
    }

    public void setDestinatario(String destinatario) {
        this.destinatario = destinatario;
    }

    public void setTipoEnvio(String tipoEnvio) {
        this.tipoEnvio = tipoEnvio;
    }
}
