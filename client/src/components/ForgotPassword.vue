<template>
  <div class="ui stackable grid container">

    <div class="eight wide column">
      <div class="ui segment">
        <h4 class="ui dividing header">Change Password</h4>

        <form class="ui form" @submit.prevent="changePassword">
            <label>Current Password</label>
            <input type="password" name="password" v-model="body.password" placeholder="mot de passe actul" >


            <label>New Password</label>
            <input type="password" name="newPassword" v-model="body.newPassword" placeholder="le nouveau mot de passe" >

            <label>New Password</label>
            <input type="password" name="confirmPassword" v-model="body.confirmPassword" placeholder="le nouveau mot de passe">

          <button type="submit" class="ui button primary" :disabled="!isFormValid" >Change password</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    name: "updatePassword",
   data () {
            return {
                body: {
                password: '',
                newPassword: '',
                confirmPassword: ''
                }
            }
        },
    mounted() {
        this.token = localStorage.token

    },
    computed: {
            isFormValid () {
                let {newPassword,confirmPassword,password } = this.body ;
               return newPassword==confirmPassword && password.length>0
                && newPassword.length>0 && confirmPassword.length>0
                 },
        },

   methods: {
     // BLOC FOR UPDATE PASSWORD
     changePassword () {
        let user_id = localStorage.getItem("user_id") 
       
        axios.put("http://localhost:3000/users/updatePassword/"+user_id,
        this.body,this.getHeaders(this.token)
        ).then(res => { 
            if(res.status==200){
            router.push({name:'Profil'})
                alert("mot de passe modifié ")
            } else {
                alert("verifier vos donnes")
            }
        }).catch(err => {
            console.log(err)
            alert("verifier vos donnes")
        })
         
     }, //END BLOC FRO UPDATE PASSWORD

    //BLOC FOR GET PROFIL AND CHANGE PASSWORD
    getProfil(){
        let user_id = localStorage.getItem("user_id")     
        axios.get("http://localhost:3000/users/Users/"+user_id,
        this.getHeaders(this.token)).then(res => { 
     

            this.data= res.data;
            // console.log(this.profils[0])
        }).catch(err => {
            console.log(err)
        })
     }, //END BLOC FOR CHANGE PASSWORD
     
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
        display: flex;
        flex-direction: column;
    }
    .segment{
        margin-top:3%
    }
    input{
        margin-bottom:3%;
        width: 40%
    }
    .button{
        width: 20%
    }
</style>