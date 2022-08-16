<template>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <div class="icon-bar"> 
    <router-link to="/home" class="material-icons">home</router-link> 
    <router-link to="/theme" class="material-icons">color_lens</router-link> 
    <router-link to="/settings" class="material-icons">settings</router-link>
  </div>  
  <router-view v-slot="{ Component }"> 
  <keep-alive >
    <component :is="Component" />
  </keep-alive>
</router-view>
</template>

<script> 

export default { 
//  created(){ 
//    this.$router.push('/') 
//  }

}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
nav {
  padding: 30px;
}
nav a {
  font-weight: bold;
  color: #2c3e50;
}
nav a.router-link-exact-active {
  color: #42b983;
}
body {margin:0;}

.icon-bar {
  width: 104%;
  background-color: #555;
  overflow: auto; 
  margin-top: -1.9%; 
  margin-left: -1.9%; 
}
.icon-bar a {
  float: center;
  width: 33.3%;
  text-align: center;
  padding: 18px 0;
  transition: all 0.3s ease;
  color: white;
  font-size: 36px;
}
.icon-bar a:hover {
  background-color: #2196F3;
} 
.active {
  background-color: grey;
} 
</style>
