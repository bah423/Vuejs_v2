<template>
    <div>
        <div class="container">
        <form v-on:submit.prevent="register">
            <div class="form-group">
                <label for="userName">Prénom et Nom</label>
                <input type="text" class="form-control" id="userName" aria-describedby="emailHelp" v-model="data.name">
              </div>
            <button type="submit" class="btn btn-primary">Modifier</button>
          </form>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    name: "updateProfile",
    data: () => ({
         data : {
             name: '',
             email: '',
             token: ''
            }
     })
    ,
    mounted() {
        this.token = localStorage.token
          this.getProfil();
    },

   methods: {
    //BLOC UPDATE THE USER PROFIL 
     register () {
        let user_id = localStorage.getItem("user_id")   
        axios.put("http://localhost:3000/users/update/"+user_id,
        this.data,this.getHeaders(this.token)
        ).then(res => { 
            console.log(res)
            router.push({name:'Profil'})
        }).catch(err => {
            console.log(err)
        })
         
     }, //END BLOC FOR UPDATE THE USER PROFIL
    
    // BLOC TO FIND THE USER PROFIL 
    getProfil(){
        let user_id = localStorage.getItem("user_id")     
        axios.get("http://localhost:3000/users/Users/"+user_id,
        this.getHeaders(this.token)).then(res => { 
    
            this.data= res.data;
        }).catch(err => {
            console.log(err)
        })
     }, //END BLOC
     
 getHeaders(token) {

    const config = {
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }
    return config
}
}
}

</script>

<style scoped>
 form{
     margin-top:3%
 }
</style>