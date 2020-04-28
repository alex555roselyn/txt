/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Clases;

/**
 *
 * @author vreyes
 */
public class Cuentas {
    Integer id;
    String cuenta;
    String remitente;
    String destinatario;
    String tipoEnvio;
    String correos;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public String getCorreos() {
        return correos;
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

    public void setCorreos(String correos) {
        this.correos = correos;
    }
}
