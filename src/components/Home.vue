<template>
  <div class="container-fluid">

    <nav class="navbar navbar-expand-md navbar-dark bg-dark shadow navbar-fixed-top">
      <router-link class="navbar-brand" to="/home/hello">Home</router-link>
      <!--<button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
          <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">-->
        <!--<div class="navbar-nav">
          <a href="#" class="nav-item nav-link active">Home</a>
          <a href="#" class="nav-item nav-link">About</a>
        </div>
      </div>-->
      <form class="form-inline ml-auto">
        <button type="button" class="btn btn-outline-light" v-on:click="logout"><i class="material-icons">exit_to_app</i> Logout </button>
      </form>
    </nav>


    <div class="row">
      <ul class="col-md-1 sidebar-nav flex-column shadow" v-if="$mq !== 'sm'">

        <!--<Tree :model="tree"/>-->
        <router-link class="btn btn-outline-dark btn-block rounded-0 shadow-none" to="/home/search">Search</router-link>
        <!--<div v-for="li in this.userPersMenu" v-bind:key=li>
          <router-link active-class="active" :to="li[0]">
            <h5>{{li[1]}}</h5>
          </router-link>
        </div>-->
      </ul>

      <main role="main" class="col">
        <transition name="component-fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </main>
    </div>
    
    <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark" v-if="$mq === 'sm'">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
        <router-link class="nav-link" to="/home/search">Search</router-link>
        </li>
        <li class="nav-item active">
        <router-link class="nav-link" to="/home/search">Search</router-link>
        </li>
        <li class="nav-item active">
        <router-link class="nav-link" to="/home/search">Search</router-link>
        </li>
        <!--<li class="nav-item dropup">
          <a class="nav-link dropdown-toggle" href="https://getbootstrap.com/" id="dropdown10" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropup</a>
          <div class="dropdown-menu" aria-labelledby="dropdown10">
            <a class="dropdown-item" href="#">Action</a>
            <a class="dropdown-item" href="#">Another action</a>
            <a class="dropdown-item" href="#">Something else here</a>
          </div>
        </li>-->
      </ul>
    </nav>
  </div>
</template>

<script>
//import Tree from './Tree'
import VueMq from 'vue-mq'
import Vue from 'vue'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    sm: 450,
    md: 1250,
    lg: Infinity,
  },
  defaultBreakpoint: 'sm' // customize this for SSR
})


export default {
  name: 'Home',
  /*components:{
    Tree
  },*/
  data: function () {
    return {
      username: this.$store.state.username,
      file: this.$store.state.file
      //userPersMenu:   [['/home/hello','Hello'],['/home/search','Search']],
      //tree:treeData
    }
  },
  mounted(){
    this.$router.push("/home/hello");
  },
  methods:{
    logout: function(){
      this.$store.state.auth=false;
      this.$router.push("/login");
    }
  }
}

/*var treeData = {
  name: 'Home', link: '/home/hello',
  children: [
    {name: 'Cerca', link: '/home/search', icon: 'search' }/*,
    {name: 'Risorsa', link: '/home/resource',
      children:[
        {name: 'Informazioni', link: '/home/info' },
        {name: 'Progetti', link: '/home/progetti' },
        {name: 'Esperienze', link: '/home/esperienze' }
      ]
    }       /
  ]
}*/
</script>


<style scoped>
  .col-md-1{
    background-color: #c1c1c1;
    padding-right:0px;
    padding-left:0px;
    display: inline-flex;
    justify-content: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 2;
    width: 8.333%;
  }
  .row{
    height: 100%;
    padding-top: 56px;
    margin-right: 0px;
    padding-bottom: 60px;
  }
  .container-fluid{
    height:100%;
    padding-left: 0px;
    padding-right: 0px;
  }
  
  .col{
    padding-left: 10%;
    padding-top: 1%;
  }
  .bg-light{
    height: auto;
  }
  .navbar{
    padding-left: 40px;
  }
  .nav-link {
    padding: 10px;
  }
  .navbar-nav{
    flex-direction: row;
  }
  .navbar-fixed-top{
    position: fixed;
    right: 0;
    left: 0;
    z-index: 1030;
  }
  .flex-column{
    margin-bottom: unset;
  }
  .shadow{
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  }
  .btn{
    display: inline-flex;
  }
  .btn-outline-dark {
    border-color: transparent;
    background: darkgray;
    display: block;
  }
  .btn-outline-dark:hover{
    background:#1f202b;
    text-decoration-color: light;
  }
  .btn-outline-dark:focus{
    background: lightgrey;
  }
  .component-fade-enter-active, .component-fade-leave-active {/*for router-view transition*/
    transition: opacity .1s ease;
  }
  .component-fade-enter, .component-fade-leave-to {
    opacity: 0;
  }
  @media (max-width: 785px) {
    .btn{
      font-size: 0.8em;
      padding: 6px;
    }
    .col{
      padding-left: 11%;
    }
  }
  @media (max-width: 420px) {
    .btn{
      font-size: 0.7em;
      padding: 5px;
    }
    .col{
      padding-left: 11%;
    }
    
  }
</style>