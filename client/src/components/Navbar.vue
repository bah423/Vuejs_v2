<template>
    <div >
       <nav class="navbar navbar-expand-lg navbar-light bg-light " >
        <a class="navbar-brand " href="#" >
          <img src="../assets/icon-above-font.png" width="110" height="110" alt="" loading="lazy">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li v-if="token  != null ">
               <router-link class="nav-link" to="/posts" style="color:white;font-weigth:bold;font-size:1.05em">Publications</router-link>
            </li>
            <li v-if="token  != null ">
               <router-link class="nav-link" to="/post/add" style="color:white;font-weigth:bold;font-size:1.05em">Ajouter une publication</router-link>
            </li>
              <li v-if="token  != null ">
               <router-link class="nav-link" to="/profil" style="color:white;font-weigth:bold;font-size:1.05em">Mon profil</router-link>
            </li>

            <li v-if="token  != null " >
              <a href="#" style="cursor: pointer;color:white;font-weigth:bold;font-size:1.05em" class="nav-link" @click="logOut()" > Décconnexion</a>
            </li>

          </ul>
        </div>
      </nav> 
    </div>
</template>

<script>
import router from '../router'
import EventBus from './EventBus'
EventBus.$on('logged-in', test => {
  console.log(test)
})
export default {
  name : "navbar",
  data(){
    return {
      auth: '',
      token: localStorage.token,
    }
  },
  methods: {
    // FONCTION FOR DISCONNECT
    logOut(){
      localStorage.clear();
      router.push({name:'Login'})
    }
  }, //END
}
</script>
<style  scoped>
li{
  background-color:blue;
  margin-right: 15px;
  font-weight:bold;
  font-size:1.05em;
  border: solid 1px white

}

</style>