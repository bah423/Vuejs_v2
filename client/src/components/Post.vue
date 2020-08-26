<template>
<div class="container">
    
    <ul>
        <li v-for="post in posts" :key="post.id">
        <img style="height:200px; width:200px" :src="'http://localhost:3000/'+ post.media.path">
       <tr/>
        <b>titre:</b>  {{post.titre}} <br>
        <b>contenu : </b> {{post.content}}
          <tr/>
        <b> publie par : </b> {{post.user.name}} à {{changeDateFormat(post.created_at)}}<br>
        <button v-if="post.user.id==userId" type="button" @click="deletePost(post.id)">supprimer un post</button>
        <button v-if="post.user.id==userId" type="button" @click="goToUpdatePost()">modifier un post</button>

        </li> 
        
    </ul>

   <ul>
      <li v-for="com in comments" :key="com.id" >
       <b>{{com.user.name}}</b> a commenté  : le {{changeDateFormat(com.created_at)}} <tr/>
       <b>contenu : </b> {{com.contenu}}<br>

      <br> 
    <a  class="a1" v-if="com.user.id==userId" type="button" @click="deleteComment(com.id)">supprimer</a>

    <input type="text" placeholder="comment" id="ex"  style="width:500px" v-model="com.contenu" v-if="formVisible">
    <!--<button  class="a2" v-if="com.user.id==userId" type="button" @click="updateComment(com.id)">modifier </button>-->
    <!-- Button trigger modal-->
  <button type="button" class="btn btn-primary a2" data-toggle="modal" data-target="#exampleModal"
  v-if="com.user.id==userId" @click="updateComment(com.id)">modifier
  </button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modification de votre commentaire</h5>
        <button type="text" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <input type="text" style="width: 475px; height: 50px">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" class="btn btn-primary">Enregistrer</button>
      </div>
    </div>
  </div>
</div>
<!-- fin de du code modal-->
        </li>
    </ul>
    <!--Le code modal-->
 <!-- Button trigger modal 
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  </button>-->

<!-- Modal 
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fermer</button>
        <button type="button" class="btn btn-primary">Enregistrer</button>
      </div>
    </div>
  </div>
</div>-->
<!-- fin de du code modal-->

    <input type="text" placeholder="comment" id="ex"  style="width:80%" v-model="comment.contenu" v-if="comment !== 0"><br>
    <button type="button" @click="addComment">Ajouter un commentaire</button>

</div>
</template>

<script>
import axios from "axios"
import router from "../router"

export default {
    name : "post",

   data: () => ({

        post_id:"",
        posts: [],
        comments: [],
        comment: {
            userId: 0,
            postId: 0,
            status: 0,
            contenu: ""
        },
        update: true,
         commentUpdate: {
            userId: 0,
            postId: 0,
            status: 0,
            contenu: ""
        },
        token: "",
        userId: localStorage.user_id

    }),
    mounted(){
      this.token = localStorage.getItem("token")

      this.post_id = this.$route.params.id; 
      this.getPostInfo(this.post_id);
      this.getComments(this.post_id);
    },

    methods: {

        getPostInfo(id){
    
        axios.get("http://localhost:3000/posts/"+id,this.getHeaders(this.token)).then(res => { 
            console.log(res)

            this.posts= res.data;
        }).catch(err => {
            console.log(err)
        })
    },
       addComment(){
           this.errors = {}
           let user_id = localStorage.getItem("user_id")  
           this.comment.userId = user_id
           this.comment.postId = this.post_id
      
           console.log(this.comment)
    
        axios.post("http://localhost:3000/comments/add",this.comment,this.getHeaders(this.token)).then(res => { 
           this.comment.contenu = {}
           console.log(res)
           this.getComments(this.post_id)
           
        }).catch(err => {
            console.log(err)
            this.errors = Response.data
        }).then(() => {
            if(Object.keys(this.errors).length === 0){
                this.comment.contenu = ''
            }
        })
    },
        getComments(postId){
           this.errors = {}
        axios.get("http://localhost:3000/comments/byPost/"+postId,this.getHeaders(this.token)).then(res => { 
            console.log(res.data)
            this.comments= res.data
        }).catch(err => {
            console.log(err)
        }).then(() => {
           if(Object.keys(this.errors).length === 0){
                this.comment.contenu = ''
            }
        })
    },
     changeDateFormat(date){
            return new Date(date).toLocaleString();
     },
    deletePost(id) {

   if(confirm("Do you really want to delete?")){

                axios.delete('http://localhost:3000/posts/'+id,this.getHeaders(this.token))
                .then(() => {
                    alert("Votre publication à été avec success"),
                    router.push({name:'Posts'})

                 })
                .catch(error => {
                    console.log(error);
                })
   }
   }
   ,
      deleteComment(id) {

   if(confirm("Do you really want to delete?")){

                axios.delete('http://localhost:3000/comments/'+id,this.getHeaders(this.token))
                .then(() => {
                    alert("Votre Commentaire à été avec success"),
                             this.getComments(this.post_id);
                 })
                .catch(error => {
                    console.log(error);
                })
   }
   },
   //Une prop calculée
   computed: {
    formVisible: function () {
        return this.com.contenu === this.com.contenu
      }
   },
    updateCom: function () {
        return this.comment.id === 0 ? this.comment.id : this.comment
      },
    //Fin prop calculée
   updateComment(id){

       let user_id = localStorage.getItem("user_id")  
           this.comment.userId = user_id
           this.comment.postId = this.post_id
           //this.comment.contenu = contenu
           console.log(this.comment)
    
       /* axios.get("http://localhost:3000/comments/"+id, this.comment,this.getHeaders(this.token)).then(res => { 
           this.comment = {}
           console.log(res)
           this.getComments(this.post_id)

        }).catch(err => {
            console.log(err)
        })*/
        axios.put("http://localhost:3000/comments/"+id, this.comment,this.getHeaders(this.token)).then(res => { 
           this.comment = {}
           console.log(res)
           this.getComments(this.post_id)

        }).catch(err => {
            console.log(err)
        })

   },
   
   goToUpdatePost(){

         router.push({name:'postUpdate' ,params: {id: this.post_id}})

   },
      getHeaders(token) {

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return config
}

}
};
</script>

<style scoped>
    li{
        list-style: none;
        margin-top:3%
    }
    button{
        margin-right: 2%;
        margin-top: 1%
    }
    .a1{
        transform: translateY(-20px);
        text-align: center;
        width: 100px;
        height: 35px;
        padding-top: 4px;
        margin-right: 3%;
        list-style: none;
        background-color: red;
        color: white;
    }
    .a2{
        transform: translateY(-20px);
        text-align: center;
        width: 100px;
        margin-right: 3%;
        list-style: none;
        background-color: green;
        color: white;
    }

</style>