package ICG.WACH2.Models;
import javax.persistence.*;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Size;
import javax.persistence.Table;

/**
 *
 * @author rvelasquez
 */
@Entity
@Table(name= "adm_transactioncode")
public class adm_transaction implements Serializable{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "correlativo",updatable = false, nullable = false )
    private Integer correlativo;
    @Column(name = "id")
    private Integer id;
    @Size(min = 1, max = 50)
    @Column(name = "codigo")
    private String codigo;
    @Basic(optional = false)
    @Size(min = 1, max = 60)
    @Column(name = "descripcion")
    private String descripcion;
    @Column(name = "estado")
    private int estado = 1;
    
    
    public adm_transaction(){}
    
    public adm_transaction(Integer correlativo) {
        this.correlativo = correlativo;
    }

//    public adm_transaction(Long correlativo,Integer id, String codigo, String descripcion, int estado) {
//        this.correlativo = correlativo;
//        this.id = id;
//        this.codigo = codigo;
//        this.descripcion = descripcion;
//        this.estado = estado;
//    }

    public Integer getCorrelativo() {
        return correlativo;
    }

    public void setCorrelativo(Integer correlativo) {
        this.correlativo = correlativo;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (correlativo != null ? correlativo.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof adm_transaction)) {
            return false;
        }
        adm_transaction other = (adm_transaction) object;
        if ((this.correlativo == null && other.correlativo != null) || (this.correlativo != null && !this.correlativo.equals(other.correlativo))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "ICG.WACH2.Models.adm_transaction[ correlativo=" + correlativo + " ]";
    }

}
