package ICG.WACH2;

import ICG.WACH2.Models.adm_correo;
import org.springframework.data.jpa.repository.JpaRepository;
import ICG.WACH2.Models.adm_cuenta;
import java.util.List;
import javax.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RestResource;



@RestResource(exported = false)
public interface EntidadesRepository extends JpaRepository<adm_cuenta,String> {

    @Query("select count(e.cuenta)>0 from adm_cuenta e  where cuenta = ?1")
    Boolean findByCuenta(String cuenta);
    
    @Transactional
    @Modifying
    @Query("delete from adm_cuenta where id = ?1")
    void deleteCuentaById(Long id);
    
    @Query("select id from adm_cuenta where cuenta = ?1")
    Integer getIdCuenta(String cuenta);
    
    
    
    @Query(value = "select * from adm_cuenta inner join adm_bic on adm_cuenta.sender = adm_bic.id;",nativeQuery = true)
    List<adm_cuenta> getCuentas();
    
    @Query(nativeQuery = true, value = "select * from adm_cuenta")
    List<adm_cuenta> getCs();
    
    @Query(nativeQuery = true, value = "select adm_cuenta.id,\n" +
                                        "adm_cuenta.cuenta as cuenta,\n" +
                                        "o.nombre as sender,\n" +
                                        "a.nombre as receiver,\n" +
                                        "adm_tipoenvio.nombre as tipo,\n" +
                                        "GROUP_CONCAT(DISTINCT c.direccion) as destinatarios\n" +
                                        "from adm_cuenta\n" +
                                        "inner join adm_tipoenvio\n" +
                                        "on adm_cuenta.Tipo = adm_tipoenvio.id\n" +
                                        "LEFT JOIN adm_bic AS o\n" +
                                        "on adm_cuenta.sender = o.id\n" +
                                        "LEFT JOIN adm_bic AS a\n" +
                                        "on adm_cuenta.receiver = a.id\n" +
                                        "left join adm_correo as c\n" +
                                        "on c.cuenta = adm_cuenta.id\n" +
                                        "group by adm_cuenta.id")
    List<adm_cuenta> getRegistros();

    
}