<template>
    <div>
      <div class="container">
        <form v-on:submit.prevent="login">
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email"
             >
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" >
            </div>
            <button type="submit" class="btn btn-primary">connexion</button>
            <router-link class="nav-link" to="/register">Vous n'avez pas un compte ? inscrivez-vous</router-link>
            
          </form>
          
    </div>
    </div>
</template>
<script>
import axios from 'axios'
import router from '../router' 
import EventBus from './EventBus' 
import Swal from "sweetalert2"
export default { data() {
     return { 
         email:'',
          password: ''
           }
     },
    methods: { 
    checkForm: function (e) {
      if ( this.email && this.password) {
        return true
      }

      this.errors = []

      if (this.email.length === 0) {
        this.errors.push('Email required.')
      }
      if (this.password.length === 0) {
        this.errors.push('Password required.')
        alert("Password required ")
      }
      console.log(this.errors)
      e.preventDefault()
    },

    login() { 
          console.log(this.email)

          if(this.email === '' || this.password === ''){
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Il y a une error!',
            footer: '<a href>Why do I have this issue?</a>'
            })
              }
          else{
            axios.post('http://localhost:3000/users/login',
            { email: this.email, password: this.password })
            .then(res => { 
                if(res.data.message === 'NOK'){
                  Swal.fire({ 
                  
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Il y a une error!',
                  footer: '<a href>Why do I have this issue?</a>'
                }) 
                return false
                }
                localStorage.setItem('token',res.data.token) 
                localStorage.setItem('user_id', res.data.id)
                 
                console.log(res)
                 this.email='' 
                 this.password='' 
                 router.push({name: 'Posts'}) 
            })
            .catch(err => { console.log(err) , alert("Veuillez vérifier vos données") }) 
                this.emitMethod()
              }

             },

              emitMethod() { 
                EventBus.$emit('logged-in','loggedin') 
            }
      }
    }
</script>

<style scoped>
    form {
      margin-top: 4%
    }
</style>


