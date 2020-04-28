/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.Models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 *
 * @author vreyes
 */
@Entity
@Table(name = "adm_correo")
public class adm_correo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; 
   
   @Column(name = "direccion", nullable = false)
    private String direccion;

   //@Column(name = "cuenta", nullable = false)
    //private Integer cuenta;

    public Integer getId() {
        return id;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    @OneToOne (fetch = FetchType.LAZY, optional =false)
    @JoinColumn (name = "cuenta", nullable = false)
    @OnDelete (action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private adm_cuenta cuenta;

    public adm_cuenta getCuenta() {
        return cuenta;
    }

    public void setCuenta(adm_cuenta cuenta) {
        this.cuenta = cuenta;
    }
}
