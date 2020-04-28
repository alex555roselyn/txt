package ICG.WACH2.Models;
import java.sql.Timestamp;

import javax.persistence.*;

@Entity
@Table(name = "adm_tipoenvio")
public class adm_tipoCuenta{
    @Id
    private int id;
    private String nombre;

    public int getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }	
}