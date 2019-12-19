<template>
  <div id="app" class="bg-light text-dark">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  beforeCreate () {
    this.$router.push('/login')
  },
  watch: {
    $route (){
      if(this.$store.state.auth === false)
        if (this.$route.path !== '/login') 
          this.$router.push('/login')
    }
  }
}
</script>

<style>
.html{
  background-color: lightgray;
}
.bg-light{
  height:-webkit-fill-available;
}
</style>
