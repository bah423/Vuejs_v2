<template>
<!-- afficher tous les post depuis la bases  -->
<div>
<navbar/>
<router-view></router-view>

  </div>
 
<!--</div>-->
</template>


<script>
import navbar from "./Navbar"
export default {
    
    name : "Home",
    components: {
        navbar
    }


    
};
</script>

<style  scoped>
li {
    list-style: none;
    margin-bottom: 20px;
}
</style>