/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.Models;

import static javax.persistence.CascadeType.ALL;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import ICG.WACH2.Models.adm_cuenta;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.ManyToOne;

/**
 *
 * @author vreyes
 */
@Entity
@Table(name = "adm_bic")
public class adm_bic {
    //@OneToMany(targetEntity = adm_cuenta.class, mappedBy = "id", orphanRemoval = false, fetch = FetchType.LAZY)
    @Id
    //@OneToMany(targetEntity = adm_cuenta.class, mappedBy = "s", orphanRemoval = false, fetch = FetchType.LAZY)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
   
   @Column(name = "nombre", nullable = false)
    private String nombre;

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    
    
    //@OneToOne(mappedBy = "bic")
    //adm_cuenta cuenta;
}
