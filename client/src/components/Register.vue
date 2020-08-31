<template>
    <div>
        <div class="container">
        <form v-on:submit.prevent="register">
            <div class="form-group">
                <label for="userName">Prénom et Nom</label>
                <input type="text" class="form-control" id="userName" aria-describedby="emailHelp" v-model="name"
                required minlength="6" pattern="[A-Za-z\d\s\-]{10,}" placeholder="ex: Marcel RENAULD">
              </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email"
              required minlength="15" maxlength="30" pattern="[a-z@?\d\.\-]{10,}" placeholder="ex: monmail@gmail.com">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="password"
              required minlength="5" maxlength="15" placeholder="mot de passe">
            </div>
            <button type="submit" class="btn btn-primary">Valider</button>
          </form>
    </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'


export default {
    data() {
     return {
        errors: '',
         name: '',
         email: '',
         password: ''
     }
    },
   methods: {
     //CONTROL THE FIELDS
  checkForm: function (e) {
      if (this.name && this.email && this.password ) {
        return true
      }

      this.errors = []

      if (!this.name) {
        this.errors.push('Name required.')
      }
      if (!this.email) {
        this.errors.push('Email required.')
      }
      if (!this.password) {
        this.errors.push('Password required.')
      }

      e.preventDefault();
    },

     register () {
        axios.post("http://localhost:3000/users/register", {
          name: this.name,
          email: this.email,
          password: this.password,
          role_id: 2 
           
        }).then(res => { 
            console.log(res)
            router.push({name:'Login'})
        }).catch(err => {
            console.log(err)
        })
         
     }
     }
}

</script>

<style  scoped>
    form {
      margin-top: 4%
    }
</style>