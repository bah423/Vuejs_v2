<template>
<!-- afficher tous les post depuis la bases  -->

<div>

<navbar/>
<!--<home/>-->
<!--<login/>-->
<router-view> </router-view>



 
</div>

</template>


<script>
import navbar from "./Navbar"
//import login from "./Login"
//import home from "./Home"
export default {
    
    name : "Home",
    components: {
        navbar,
        //login,
       // home
    }


    
};
</script>

<style  scoped>
li {
    list-style: none;
    margin-bottom: 20px;
    margin-top: 10px;
}

</style>