<template>
    <div class="container">

        <form v-on:submit.prevent="updateComment">
            <div class="form-group">
              <label for="exampleInputEmail1">modifier le commentaire</label>
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="contenu">
            </div>
            <button type="submit" class="btn btn-primary">Enregistrer
            <router-link class="nav-link" to="/post/update/:id" > </router-link>
            </button>
        </form>

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
     return {
        comments: [],
        comment: {
            id: 0,
            contenu: ""
     }
    }
    },
 mounted(){
      this.token = localStorage.getItem("token")

      this.post_id = this.$route.params.id; 
      this.getPostInfo(this.post_id);
      this.getComments(this.post_id);
    },

   methods: {
    //THE FUNCTION THAT ALLOWS YOU TO MODIFY A COMMENT
      updateComment(id, contenu){

       let user_id = localStorage.getItem("user_id")  
           this.comment.userId = user_id
           this.comment.postId = this.post_id
           this.comment.contenu = contenu
           console.log(this.comment)
           
        axios.put("http://localhost:3000/comments/"+id, 
           this.comment,
           this.getHeaders(this.token)).then(res => { 
           this.comment = {}
           console.log(res)
           this.getComments(this.post_id, this.comment)
           contenu = res.data
           console.log(contenu)

        }).catch(err => {
            console.log(err)
        })
   }, // END THE FUNCTION THAT ALLOWS YOU TO MODIFY A COMMENT

  getHeaders(token) {

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return config
}
   },
}
</script>

<style>
form{
    margin-top: 5%
}
label{
    font-size: 1.5em
}
h3{
    background-color: black;
   color: #0aaa82;
    text-align: center
}

</style>