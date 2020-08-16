<template>
<div class="container">
  
  
    <b>Nom :</b> {{profil.name}}
    <tr/>
   <b> Email :</b> {{profil.email}}
    <tr/>
    <b>Total des publications publiées :</b> {{totalPost}}
    <tr/>
    <router-link class="nav-link" to="/profil/update"> <b>Modifier mon profil</b></router-link>

    <a type="button" href="javascript:;" v-on:click="DeleteUser(profil.id)" ><b>Supprimer mon compte</b> </a>
</div>
</template>
<script>
import axios from "axios"
import router from "../router"
export default {
    name: "profil",
    data: () => ({
        profil:{
            name:""
        },
        totalPost: 0
    }),

   created(){

        this.getProfil();
        this.getAllPost();
    },



    methods: {

        getProfil(){
        let user_id = localStorage.getItem("user_id")     
        axios.get("http://localhost:3000/users/details/"+user_id).then(res => { 
         this.profil= res.data;
         console.log(this.profil)
        }).catch(err => {
            console.log(err)
        })
         
     } ,
     showPostDelails(id){
        this.$router.push({name: 'postDetails', params: {id: id}})
     },
     DeleteUser(id) {

   if(confirm("Do you really want to delete?")){

                axios.delete('http://localhost:3000/users/'+id)
                .then(() => {
                    alert("votre compte a été supprimé avec success")
                    localStorage.clear()
                          router.push({name:'Login'})
                })
                .catch(error => {
                    console.log(error);
                })
   }
   },

        getAllPost(){
        let user_id = localStorage.getItem("user_id")   
        axios.get("http://localhost:3000/posts/ByUser/"+user_id).then(res => { 

            this.totalPost= res.data.length;
        }).catch(err => {
            console.log(err)
        })   
}

}
        
    };
</script>