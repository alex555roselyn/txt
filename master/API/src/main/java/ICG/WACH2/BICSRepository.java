
package ICG.WACH2;

import ICG.WACH2.Models.adm_bic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 *
 * @author vreyes
 */
@RestResource(exported = false)
public interface BICSRepository extends JpaRepository<adm_bic,String> {
    @Query("select count(b.nombre)>0  from adm_bic b where nombre = ?1")
    Boolean findByBICNombre(String nombreBic);
    
    @Query("select id from adm_bic where nombre = ?1")
    Integer getIdBIC(String cuenta);
}
