package ICG.WACH2.Models;
import ICG.WACH2.views.View;
import com.fasterxml.jackson.annotation.JsonView;
import java.sql.Timestamp;

import javax.persistence.*;

@Entity
public class adm_moneda{
    @Id
    @JsonView({View.OveralView.class , View.ItemView.class})
    private int ID;
    @JsonView({View.OveralView.class , View.ItemView.class})
    private String nombre;
    @JsonView({View.OveralView.class , View.ItemView.class})
	private int estado;	
    
	public int getID(){
        return ID;
    }
    public void setID(int id){
        ID=id;
    }
	
	
    public String getnombre() {
        return nombre;
    }

    public void setnombre(String nombre) {
        this.nombre = nombre;
    }	
	public int getestado(){
		return estado;
	}
	public void setestado(int estado){
		this.estado=estado;
	}
	/*
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    */
   /* @Override
    public String toString() {
        return "Formulario{" + "id='"  + '\'' + ", tittle='" + title + '\'' + ", description='" + description + '\''
                +  '}';
    }*/
	
	
	
}