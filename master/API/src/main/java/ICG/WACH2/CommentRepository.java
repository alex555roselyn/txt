/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2;

import ICG.WACH2.Models.Comment;
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
public interface CommentRepository extends JpaRepository<Comment, Long> {
    //Page<Comment> findByPostId(Long postId, Pageable pageable);
    @Query(nativeQuery = true, value = "select c.text, p.title, p.description from comments c inner join posts p on c.post_id = p.id")
    List<Comment> getCs();
}
