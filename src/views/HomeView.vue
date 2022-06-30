<template>
  <div> 
    <HomeComponent></HomeComponent> 
  </div> 
</template>

<script>
import HomeComponent from '@/components/HomeComponent.vue'

export default {
  name: 'HomeView',
  components: {
    HomeComponent
  }  
}
</script>

<style scoped>
input{
  padding: 7% 10%; 
  width: 65%;
  margin-left: 7%;
  margin-top: 5%;
  margin-bottom: 0%;
  font-size: 450%;
  align-content: center;  
  border-radius: 15px;
} 
.container{
  float: center;
  margin: auto;
  padding: 2% 9% 0% 9%;
}
.consecutive{  
  display: flex;
  flex-direction: row;
  justify-content: center;  
}
.pre{ 
  height: 90%; 
  border: 1px solid rgb(180, 179, 179);
  border-radius: 30px ;
  padding: 2%; 
  margin-left: 4%;
  margin-right: 4%;
  margin-top: 2%;
}
button{
  width: 25%;
  background-color: rgb(238, 231, 231);
  margin-right: 8%;
}
</style>
