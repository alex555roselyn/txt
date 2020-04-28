
package ICG.WACH2;

import ICG.WACH2.Models.adm_correo;
import ICG.WACH2.Models.adm_cuenta;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RestResource;

/**
 *
 * @author vreyes
 */
@RestResource(exported = false)
public interface CorreosRepository extends JpaRepository<adm_correo,String> {
    
    @Query("select count(b.direccion)>0  from adm_correo b join b.cuenta c where b.direccion = ?1 and c.id = ?2")
    Boolean findByDireccion(String direccion, Long cuenta);
    
    //@Query("select c.id, c.cuenta, b.direccion from adm_correo b left join adm_cuenta c on b.cuenta = c.id")
    //@Query("select c from adm_correo as c")
    //@Query(nativeQuery = true, value = "select ct.cuenta as cuenta, c.direccion as correo from adm_cuenta ct left join adm_correo c on ct.id = c.cuenta")
    //List<adm_correo> ola();
    
    //@Query(value = "select c.cuenta, c.id, i.direccion from adm_cuenta c right join adm_correo i on c.id = i.cuenta",nativeQuery=true)
    @Query(value = "select ct.id, ct.cuenta, c.direccion from adm_correo c right join adm_cuenta ct on c.cuenta = ct.id",nativeQuery=true)
    List<adm_correo> ola();
}
