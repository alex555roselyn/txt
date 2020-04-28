package ICG.WACH2.controllers;

import Clases.Cuentas;
import Clases.datos;
import ICG.WACH2.BICSRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import ICG.WACH2.EntidadesRepository;
import ICG.WACH2.EntidadesRepository;
import ICG.WACH2.CorreosRepository;
import ICG.WACH2.Models.adm_correo;
import ICG.WACH2.Models.adm_cuenta;
import ICG.WACH2.Models.adm_entidad;
import ICG.WACH2.Producer;
import java.util.Map;
import org.json.JSONObject;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.context.annotation.ComponentScan;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Resource;
import org.springframework.beans.factory.annotation.Qualifier;
import com.google.gson.Gson;
import javax.persistence.EntityManager;
import javax.persistence.EntityGraph;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import org.springframework.transaction.interceptor.TransactionAspectSupport;


@RestController
public class EntidadesController {
	//private final RabbitTemplate rabbitTemplate;
  //  private final Receiver receiver;
   @Autowired
   private EntidadesRepository entidadesRepository;
       @Autowired
       private BICSRepository bicsRepository;
       @Autowired
       private CorreosRepository correosRepository;
       @Autowired
private EntityManagerFactory emf;
	
	//Producer producer;	  
	@CrossOrigin(origins = "*")
    @RequestMapping(value = "/cuentas",method = RequestMethod.POST)
    public String respuestaPost(@RequestBody Data data1) throws IOException {
        Respuesta res = new Respuesta();
        DBCuentas dbcuentas = new DBCuentas();
        List<adm_cuenta> ctas = new ArrayList<adm_cuenta>();
        ICG.WACH2.Models.adm_cuenta cuenta = new ICG.WACH2.Models.adm_cuenta();
        //Conexion
        //EntityManagerFactory emf = Persistence.createEntityManagerFactory("adm_cuenta");
        
        
        
        List<Cuenta> cuentas = new ArrayList<Cuenta>();
        String base64 = "";
        String nombreArchivo = "";
        byte[] decoded = null;
        //System.out.println(payload.toString());
        base64 = data1.getBase64();
        Gson gson = new Gson();
        nombreArchivo = data1.getNombreArchivo();
        res = data1.getFile(nombreArchivo,base64);
        String jsonInString = gson.toJson(res);
        System.out.println("");
        if (res.getCodigo() == 200){
            //Logica de ejecucion exitosa
            dbcuentas.guardarCuentas(jsonInString,entidadesRepository,bicsRepository,correosRepository);
            //tx.rollback();
        }else{
            //Logica de ejecucion mal formada
            System.out.println(gson.toJson(res.getMensaje()));
        }
        //return res.getMensaje();
        //System.out.println(entidadesRepository.getCuentas());
        System.out.println("*--- Ejeuccuion exitosa ---*");
       //ctas = entidadesRepository.getCuentas();
        return gson.toJson(res);
    }
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/cuentas",method = RequestMethod.GET)
    public String respuestaGet() {
        
       List<adm_cuenta> cts = entidadesRepository.findAll();
       List<Cuentas> ctas = new ArrayList<Cuentas>();
       Gson gson = new Gson();
       
       for(Integer i = 0 ; i < cts.size() ; i++){
           Cuentas ct = new Cuentas();
           String correos = "";
           
           ct.setId(Integer.valueOf(cts.get(i).getId().toString()));
           ct.setCuenta(cts.get(i).getCuenta());
           ct.setRemitente(cts.get(i).getBicSender().getNombre());
           ct.setDestinatario(cts.get(i).getBicReceiver().getNombre());
           ct.setTipoEnvio(cts.get(i).getAdm_tipoCuenta().getNombre());
           
           for(Integer j = 0 ; j < cts.get(i).getCorreos().size() ; j++){
               if (j == 0){
                   correos = correos+cts.get(i).getCorreos().get(j).getDireccion();
               }else{
                   correos = correos+","+cts.get(i).getCorreos().get(j).getDireccion();
               }
           }
           ct.setCorreos(correos);
           ctas.add(ct);
       }
        return gson.toJson(ctas);
    }
    
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/cuentas/{id}",method = RequestMethod.DELETE)
    public String respuestaDelete(@PathVariable("id") long id) {
       String mensaje = "Eliminado con exito";
       entidadesRepository.deleteCuentaById(id);
        return mensaje;
    }
}