<template>
    <div>
      <div class="container" >
        <form>
            <div class="form-group">
              <label for="exampleFormControlInput1">titre</label>
              <input type="text" class="form-control" v-model="post.titre" id="exampleFormControlInput1" placeholder="name@example.com">
            </div>

            <div class="form-group">
              <label for="exampleFormControlTextarea1">Desciption</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" v-model="post.content" rows="3"></textarea>
            </div>

          </form>
          <form>
            <div class="form-group" v-if="post.media!=null">
            <img v-if="!selectedPhoto" style="height:200px; width:200px" :src="'http://localhost:3000/'+ post.media.path">

              <label for="exampleFormControlFile1">Média</label>
              <input type="file" id="file" ref="file" v-on:change="handleFileUpload()">
            </div>
          </form>
         <button type="button" @click="ModifyPost" class="btn btn-primary">Modifier</button>
    </div>
    </div>
</template>
<script>
import axios from "axios"
import router from "../router"
export default {

name: "updatePost",
   data: () => ({
       selectedPhoto: false ,
        post : {
            
            titre :"",
            content: "",
            post_type: "",
            user_id: ""
        },
        file: "",
        token: localStorage.token,
        post_id : ""
        

    })
,
mounted(){
    
    this.post_id = this.$route.params.id; 

    this.getPostInfo()   
    },
 methods: {
      handleFileUpload(){
          this.selectedPhoto = true
          this.file = this.$refs.file.files[0];
      },

    // THE FUNCTION THAT ALLOWS TO MODIFY A POST
    ModifyPost(){
            
            let user_id = localStorage.getItem("user_id")         
            let formData = new FormData();
            formData.append('file', this.file);
            formData.append('titre', this.post.titre);
            formData.append('content', this.post.content);
            formData.append('userId', user_id);
            formData.append('idMedia', this.post.media.id);
    

        axios.put("http://localhost:3000/posts/update/"+this.post_id,formData, {
            headers: {
                'Content_Type': 'multupart/form-data',
                'Authorization': 'Bearer ' + this.token
            }
        }).then(() => { 
                alert("post modifié avec succes")
                this.post.titre = ""
                this.post.content = ""
                router.push({name: 'Posts'})
        }).catch(err => {
            console.log(err)
        })
         
     }, // END THE FUNCTION THAT ALLOWS TO MODIFY A POST
    
    //THE FUNCTION THAT FIND THE POST DATA TO MODIFY 
    getPostInfo(){
    
        axios.get("http://localhost:3000/posts/"+this.post_id,this.getHeaders(this.token)).then(res => { 
            console.log(res)

            this.post= res.data[0];
        }).catch(err => {
            console.log(err)
        })
    }, // END THE FUNCTION THAT FIND THE POST DATA TO MODIFY
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
<style  scoped>

</style>