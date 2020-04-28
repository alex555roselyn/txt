/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ICG.WACH2.controllers;

import ICG.WACH2.CommentRepository;
import ICG.WACH2.Models.Comment;
import ICG.WACH2.Models.Post;
import ICG.WACH2.PostRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author vreyes
 */
@RestController
public class DemoController {
@Autowired
   private PostRepository postRepository;
@Autowired
    private CommentRepository commentRepository;
    @CrossOrigin(origins = "*")
    @RequestMapping(value = "/demo", method = RequestMethod.GET)
    public String requestPost(){
        List<Comment> posts = new ArrayList<Comment>();
        Post pst = new Post();
        //pst.setId(3);
        //Comment cmt = new Comment();
        //cmt.setPost(pst);
        //cmt.setText("Hola que hace ?");
        //commentRepository.save(cmt); 
        try{
            posts = commentRepository.findAll();
        }catch(Exception ex){
            System.out.println("Ex get comments: "+ex.toString());
        }
        for(Integer i = 0 ; i < posts.size() ; i++){
            System.out.println("Iteacion: "+i);
            System.out.println(posts.get(i).getPost().getContent());
            System.out.println(posts.get(i).getPost().getDescription());
            //System.out.println(posts.get(i).getContent());
        }
        return "Ola k ase";
    }
}
