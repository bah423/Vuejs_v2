<template>
<!-- afficher tous les post depuis la bases  -->
<div>
<navbar/>
<router-view></router-view>


    <!--les ajouts-->
    <!--<div class="comment" style="position:relative;">
    <span class="ui active inverted dimmer" v-if="loading">
      <div class="ui active loader"></div>
    </span>
    <div class="avatar"><img :src="'http://www.gravatar.com/avatar/' + comment.email_md5" alt=""></div>
    <div class="content">
      <span class="author">{{ comment.username }}</span>
      <div class="metadata">
        <span class="date">{{ comment.created_at | ago }}</span>
        <span style="color: #ff0000" @click="deleteComment" v-if="can_delete">Supprimer</span>
      </div>
      <div class="text">
        {{ comment.content }}
      </div>
      <div class="actions">
        <a href="#" @click.prevent="replyTo(reply_to)">Répondre</a>
      </div>
    </div>-->
    <!--<div class="comments">
      <comment :comment="reply" v-for="reply in comment.replies" :ip="ip" transition="fade-from-right"></comment>
      <comment-form :id="comment.commentable_id" :model="comment.commentable_type" :reply="comment.id" v-if="form_visible" transition="scroll"></comment-form>
    </div>-->
  </div>
  <!--fin des ajouts-->
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