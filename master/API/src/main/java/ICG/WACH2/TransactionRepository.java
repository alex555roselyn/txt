package ICG.WACH2;

import ICG.WACH2.Models.adm_transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 *
 * @author rvelasquez
 */
//@Transactional
@RestResource(exported = false)
public interface TransactionRepository extends JpaRepository<adm_transaction, Integer>{
   
    adm_transaction findByDescripcion(String descripcion);
    adm_transaction findByCodigo(String codigo);
    adm_transaction getByCorrelativo(Integer correlativo);
    adm_transaction getById(Integer id);
    
    
//    @Modifying
//    @Query("update adm_transaction a set a.codigo = ?2, a.descripcion = ?3 where a.id = ?1")
//    adm_transaction setUserInfoById(Integer id,String codigo, String descripcion);
    
    
}
