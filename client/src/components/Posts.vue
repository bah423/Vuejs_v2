<template>
<div class="container">
  
  <div class="posts">
    <ul>
        <li v-for="post in posts" :key="post.id" >
        <img @click="showPostDelails(post.id)" style="height:200px; width:200px" :src="'http://localhost:3000/'+ post.media.path">
       <tr/>
        <b>Titre:</b>  {{post.titre}} <br>
        <b>Contenu : </b> {{post.content}}
          <tr/>
        <b> publie par : </b> {{post.user.name}} le {{changeDateFormat(post.created_at)}}

        </li> 
        
    </ul>
  </div>
</div>
</template>
<script>
import axios from "axios"

export default {
    name: "posts",
    data()  {
    return {
        posts:[],
        token: "",
        userId: localStorage.user_id
    }

},
   mounted(){

    this.token = localStorage.getItem("token")
        this.getAllPost();
    },



    methods: {
        // GET ALL POSTS
        getAllPost(){
    
        axios.get("http://localhost:3000/posts/Posts",this.getHeaders(this.token)).then(res => { 
            console.log(res)
            this.posts= res.data.reverse();
        }).catch(err => {
            console.log(err)
        })
         
     } , //END
     showPostDelails(id){
        this.$router.push({name: 'postDetails', params: {id: id}})
     },
     changeDateFormat(date){
            return new Date(date).toLocaleString();
     },
    // DELETE POST
    deletePost(id) {

   if(confirm("Do you really want to delete?")){

                axios.delete('http://localhost:3000/posts/'+id,this.getHeaders(this.token))
                .then(() => {
                    alert("Votre publication à été avec success"),
                    this.getAllPost()
                 })
                .catch(error => {
                    console.log(error);
                })
   }
   }, //END DELETE POST

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
    .posts ul li{
        list-style: none;
        margin-top:3%
    }
    .posts{
        margin-top: 2%
    }
</style>