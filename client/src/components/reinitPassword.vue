<template>
    <div class="container">

        <form v-on:submit.prevent="reinit">
            <div class="form-group">
              <label for="exampleInputEmail1">Pour recevoir un lien de reinitialisation du mot de passs, entrez votre mail</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            </div>
            <button type="submit" class="btn btn-primary">Envoyer</button>
        </form>



    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'


export default {
    data() {
     return {
         email: ''
     }
    },
   methods: {
     reinit () {
        axios.post("http://localhost:3000/users/reinitPassword", {
          email: this.email,
          role_id: 2 
           
        }).then(res => { 
            console.log(res)
            router.push({email:'Login'})
        }).catch(err => {
            console.log(err)
        })
         
     }
     }
}
</script>

<style>
form{
    margin-top: 5%
}
label{
    font-size: 1.5em
}

</style>