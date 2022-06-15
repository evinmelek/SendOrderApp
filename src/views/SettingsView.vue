<template>
  <div>
    <keep-alive>
     <SettingsComponent></SettingsComponent> </keep-alive> 
  </div>
</template>

<script>

import SettingsComponent from "@/components/SettingsComponent.vue" 
export default {
    components:{
        SettingsComponent, 
    }, 
}
</script>

<style scoped>
p{
  margin-bottom: 1px; 
}
</style>