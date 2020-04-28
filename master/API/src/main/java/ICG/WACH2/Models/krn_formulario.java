package ICG.WACH2.Models;
import ICG.WACH2.views.View;
import com.fasterxml.jackson.annotation.JsonView;
import java.sql.Timestamp;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import javax.persistence.*;

@Entity
public class krn_formulario{
        @JsonView({View.OveralView.class , View.ItemView.class})
        @Id
        private int ID;
	@JsonView({View.OveralView.class , View.ItemView.class})
	private int idEntidadEmisora,idEntidadReceptora,estado;
        @JsonView({View.OveralView.class , View.ItemView.class})
        @ManyToOne( optional = false)
        @JoinColumn(name = "idmoneda", nullable = false)
	private adm_moneda moneda;
	@JsonView({View.OveralView.class , View.ItemView.class})
        private String nombreCompania,idCompania,nombreClienteReceptor,idClienteReceptor,noCuentaReceptor,tipoCuentaReceptor,nombreArchivo;
	@JsonView({View.OveralView.class , View.ItemView.class})
        private Timestamp fechaHoraCreacion;
	@JsonView(View.ItemView.class)
        private byte[] base64Archivo;
	@JsonView({View.OveralView.class , View.ItemView.class})
        private float monto;
	
	public byte[] getbase64Archivo(){
		return this.base64Archivo;
	}

	public void setbase64Archivo(byte[] base64Archivo){
		this.base64Archivo=base64Archivo;
	}
    public int getID(){
        return ID;
    }
    public void setID(int id){
        ID=id;
    }
	public int getidEntidadEmisora(){
		return idEntidadEmisora;
	}
	public void setidEntidadEmisora(int idEntidadEmisora){
		this.idEntidadEmisora=idEntidadEmisora;
	}
	public int getidEntidadReceptora(){
		return idEntidadReceptora;
	}
	public void set(int idEntidadReceptora){
		this.idEntidadReceptora=idEntidadReceptora;
	}	
        
       
	public adm_moneda getmoneda(){
		return moneda;
	}
        
	public void setmoneda(adm_moneda moneda){
		this.moneda=moneda;
	}	
	public int getestado(){
		return estado;
	}
	public void setestado(int estado){
		this.estado=estado;
	}
	
    public String getnombreCompania() {
        return nombreCompania;
    }

    public void setnombreCompania(String nombreCompania) {
        this.nombreCompania = nombreCompania;
    }	
	
	public String getidCompania() {
        return idCompania;
    }

    public void setidCompania(String idCompania) {
        this.idCompania = idCompania;
    }	
	public String getnombreClienteReceptor() {
        return nombreClienteReceptor;
    }

    public void set(String nombreClienteReceptor) {
        this.nombreClienteReceptor = nombreClienteReceptor;
    }	
	public String getidClienteReceptor() {
        return idClienteReceptor;
    }

    public void setidClienteReceptor(String idClienteReceptor) {
        this.idClienteReceptor = idClienteReceptor;
    }	
	public String getnoCuentaReceptor() {
        return noCuentaReceptor;
    }

    public void setnoCuentaReceptor(String noCuentaReceptor) {
        this.noCuentaReceptor = noCuentaReceptor;
    }	
	public String gettipoCuentaReceptor() {
        return tipoCuentaReceptor;
    }

    public void settipoCuentaReceptor(String tipoCuentaReceptor) {
        this.tipoCuentaReceptor = tipoCuentaReceptor;
    }	
	public String getnombreArchivo() {
        return nombreArchivo;
    }

    public void setnombreArchivo(String nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
    }	
	
	
	public Timestamp getfechaHoraCreacion() {
        return fechaHoraCreacion;
    }

    public void setfechaHoraCreacion(Timestamp fechaHoraCreacion) {
        this.fechaHoraCreacion = fechaHoraCreacion;
    }	
	public float getmonto(){
		return monto;
	}
	public void setmonto(float monto){
		this.monto=monto;
	}
	
	
	
	
	
}