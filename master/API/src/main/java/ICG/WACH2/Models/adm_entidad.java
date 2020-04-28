package ICG.WACH2.Models;
import java.sql.Timestamp;

import javax.persistence.*;

@Entity
public class adm_entidad{
    @Id
    private int ID;
	private String nombre;
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