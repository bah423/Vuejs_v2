<template>
    <div>
      <div class="container">
        <form>
            <div class="form-group">
              <label for="exampleFormControlInput1"><b>titre</b></label>
              <input type="text" class="form-control" v-model="post.titre" id="exampleFormControlInput1" placeholder="le titre de mon post">
            </div>
        
            <!--<div class="form-group">
              <label ><b> Type de publication</b></label>
              <input type="text" class="form-control" v-model="post.post_type" placeholder="texte ou image">
            </div>-->

            <div class="form-group">
              <label for="exampleFormControlTextarea1"><b>Votre commentaire</b></label>
              <textarea class="form-control" id="exampleFormControlTextarea1" v-model="post.content" rows="3"></textarea>
            </div>

          </form>
          <form>
            <div class="form-group">
              <label for="exampleFormControlFile1"><b>Média</b></label>
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
            </div>
          </form>
         <button type="button" @click="addPost" class="btn btn-primary">Envoyer</button>
    </div>
    </div>
</template>
<script>
import axios from "axios"
export default {

name: "addPost",
   data: () => ({
        post : {
            
            titre :"",
            content: "",
           // post_type: "",
            user_id: ""
        },
        file: ""

    })
,
 methods: {
      handleFileUpload(){
    this.file = this.$refs.file.files[0];
      },
 
        addPost(){
            
            let user_id = localStorage.getItem("user_id")         
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('label', this.post.titre);
            formData.append('content', this.post.content);
           // formData.append('post_type', this.post.post_type);
            formData.append('user_id', user_id);
       // this.post_type= ""
        this.content= ""
        this.titre= ""

        axios.post("http://localhost:3000/posts/create",formData, {
            headers: {
                'Content_Type': 'multupart/form-data'
            }
        }).then(res => { 
                console.log(res)
                alert("post ajoute avec succes")
        }).catch(err => {
            console.log(err)
        })
         
     }

        }
        

}

</script>
<style  scoped>

</style>