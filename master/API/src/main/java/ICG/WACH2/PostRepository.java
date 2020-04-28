/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2;

import ICG.WACH2.Models.Post;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author vreyes
 */
@Repository
public interface PostRepository extends JpaRepository<Post,Long> {
 
    @Query(nativeQuery = true, value = "select * from posts")
    List<Post> getPosts();
}