<template>
    <div class="container">

        <form v-on:submit.prevent="updateComment">
            <div class="form-group">
              <label for="exampleInputEmail1">modifier le commentaire</label><br>
              <small >ancien commentaire:{{contenu}} </small> 
              <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  v-model="contenu">
            </div>
            <button type="submit" class="btn btn-primary">Enregistrer
            
            </button>
        </form>



    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data() {
     return {
        comments: [],
        comment_id: '',
        contenu: "",
        postId: ''
     
    }
    },
 mounted(){
      this.token = localStorage.getItem("token")

      this.comment_id = this.$route.params.id; 
      this.getComments(this.comment_id);
    },

   methods: {

       getComments(commentId){
           this.errors = {}
        axios.get("http://localhost:3000/comments/details/"+commentId,this.getHeaders(this.token)).then(res => { 
            console.log(res.data.contenu)
            this.contenu = res.data.contenu
            this.postId = res.data.postId
        }).catch(err => {
            console.log(err)
        })
    },
      updateComment(id){
        id = this.comment_id
        this.errors = {}
        axios.put("http://localhost:3000/comments/"+id, {contenu: this.contenu},
        this.getHeaders(this.token)).then(res => { 
            console.log(res.data.contenu)
            router.push({name: 'postDetails', params:{id:this.postId}})
        }).catch(err => {
            console.log(err)
        })
   },

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
