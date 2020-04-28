package ICG.WACH2.controllers;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import javax.persistence.EntityManagerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import ICG.WACH2.Models.adm_transaction;
import ICG.WACH2.TransactionRepository;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.validation.Valid;
import org.springframework.http.HttpStatus;
import static org.apache.commons.lang.StringUtils.isNumeric;

/**
 *
 * @author rvelasquez
 */
@CrossOrigin(origins = "*")
//@Transactional
@RestController
public class TransactionController {
    
    public static final Logger logger = LoggerFactory.getLogger(TransactionController.class);
    @Autowired
    TransactionRepository trnsRepository;
    private EntityManagerFactory emf;
    @PersistenceContext
    EntityManager em ;
  
   @CrossOrigin(origins = "*")
   @RequestMapping(value="/transaction",method = RequestMethod.GET, produces ="application/json")
   public List<adm_transaction> getAllTransaction() {
   return (List<adm_transaction>)trnsRepository.findAll();
  }
   
   @CrossOrigin(origins = "*")
   @RequestMapping(value="/transaction/{correlativo}",method = RequestMethod.GET, produces ="application/json")
   public ResponseEntity obtenerPorId(@PathVariable Integer correlativo){
        adm_transaction trnId = trnsRepository.getByCorrelativo(correlativo);
       
        //Id Base de dato
        if(trnId == null){
        return new ResponseEntity("Correlat no encontrado", HttpStatus.BAD_REQUEST);
        }
        
        return new ResponseEntity<>(trnId, HttpStatus.ACCEPTED);
  }
   
   
  @CrossOrigin(origins = "*")
  @RequestMapping(value="/transaction/crear",method = RequestMethod.POST, produces ="application/json")
   public ResponseEntity<adm_transaction> crearTransaction(@RequestBody adm_transaction creaTrns){   
       try{
            
            if (isNumeric(creaTrns.getCodigo())){
               return new ResponseEntity("Solo se amiten Letras Mayusculas o minusculas", HttpStatus.BAD_REQUEST); 
            }
            
            trnsRepository.save(creaTrns);
            return new ResponseEntity<>(creaTrns, HttpStatus.OK);
            
      }catch (Exception e){
           System.out.println("ERROR QUE HAY QUE BUSCAR" + e);
           return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
      }
   }
   
    
   @CrossOrigin(origins = "*")
    @RequestMapping(value= "/transaction/{correlativo}",method = RequestMethod.PUT, produces = "application/json")
    public ResponseEntity actualizar(@Valid @RequestBody adm_transaction transact,@PathVariable("correlativo") Integer correlativo){ 
        try {  
           
           if (isNumeric(transact.getCodigo())||transact.getCodigo().length()> 4){
                  return new ResponseEntity("Unicamente Letras max 4 caracteres", HttpStatus.BAD_REQUEST); 
                  }

                trnsRepository.save(transact);
                return new ResponseEntity<>(transact, HttpStatus.OK);
           
        } catch (Exception e) {
            return new ResponseEntity<>("hubo un error"+e,HttpStatus.INTERNAL_SERVER_ERROR);
       } 
    }
   

     @RequestMapping(value = "/transaction/{correlativo}", method = RequestMethod.DELETE, produces = "application/json")
    public ResponseEntity eliminarTrById(@PathVariable Integer correlativo){
        adm_transaction trDel = trnsRepository.getById(correlativo);
        
        if(trDel == null){
            return new ResponseEntity("Registro no encontrado ",HttpStatus.NOT_FOUND);
        }
            trnsRepository.deleteById(correlativo);
            return new ResponseEntity<>(trDel, HttpStatus.OK);
    }
    
    
}
