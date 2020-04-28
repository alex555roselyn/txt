/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.Models;

//import javax.persistence.Basic;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.List;
import javax.persistence.CascadeType;
import static javax.persistence.CascadeType.ALL;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import org.hibernate.FetchMode;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

/**
 *
 * @author vreyes
 */
@Entity
@Table(name = "adm_cuenta")
public class adm_cuenta {
    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "cuenta", nullable = false)
    private String cuenta;
    
    //@Column(name = "sender", nullable = false)
    //private Integer sender;   
    
    //@Column(name = "receiver", nullable = false)
    //private Integer receiver;
    
    //@Column(name = "tipo", nullable = false)
    //private Integer tipo;

    public Long getId() {
        return id;
    }

    public String getCuenta() {
        return cuenta;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setCuenta(String cuenta) {
        this.cuenta = cuenta;
    }
    
    public String getNombre() {
        return cuenta;
    }

    public void setNombre(String Nombre) {
        this.cuenta = Nombre;
    }
    
    @ManyToOne (fetch = FetchType.LAZY, optional =false)
    @JoinColumn (name = "sender", nullable = false)
    @OnDelete (action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private adm_bic bicSender;

    public void setBicSender(adm_bic bicSender) {
        this.bicSender = bicSender;
    }
    
    @ManyToOne (fetch = FetchType.LAZY, optional =false)
    @JoinColumn (name = "receiver", nullable = false)
    @OnDelete (action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private adm_bic bicReceiver;

    public adm_bic getBicReceiver() {
        return bicReceiver;
    }

    public void setBicReceiver(adm_bic bicReceiver) {
        this.bicReceiver = bicReceiver;
    }
    
    @ManyToOne (fetch = FetchType.LAZY, optional =false)
    @JoinColumn (name = "Tipo", nullable = false)
    @OnDelete (action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private adm_tipoCuenta adm_tipoCuenta;

    public adm_tipoCuenta getAdm_tipoCuenta() {
        return adm_tipoCuenta;
    }

    public void setAdm_tipoCuenta(adm_tipoCuenta adm_tipoCuenta) {
        this.adm_tipoCuenta = adm_tipoCuenta;
    }
   
    
    
    //@ManyToOne
    //@JoinColumn(name = "bic_id", referencedColumnName = "bic_id", insertable = false, updatable = false)
    //@ManyToOne(cascade = CascadeType.ALL)
    //@JoinColumn(name = "ADM_BIC_ID")
    //@OneToOne
    //@JoinColumn(name = "adm_bic_person_id")
    //private adm_bic bic;
    
    //@OneToOne(fetch=FetchType.EAGER,cascade = { CascadeType.ALL })
    //@JoinColumn(name = "id")
    //adm_bic bic;

    public adm_bic getBicSender() {
        return bicSender;
    }
    
    @OneToMany(fetch=FetchType.LAZY, mappedBy="cuenta")
    List<adm_correo> correos;

    public List<adm_correo> getCorreos() {
        return correos;
    }

    public void setCorreos(List<adm_correo> correos) {
        this.correos = correos;
    }
}