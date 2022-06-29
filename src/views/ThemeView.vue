<template>
  <div>
    <keep-alive>
      <ThemeComponent></ThemeComponent>
    </keep-alive>
  </div>
</template>

<script> 
import ThemeComponent from "@/components/ThemeComponent.vue"
export default { 
  components:{
    ThemeComponent
  }
}
</script>

<style scoped> 
</style>