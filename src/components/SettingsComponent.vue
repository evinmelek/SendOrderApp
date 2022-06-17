<template> 
  <div class="settings-icon-bar">
    <router-link to="/settings/pre-call" class="material-icons sound">settings_voice</router-link> 
    <router-link to="/settings/system" class="material-icons call">settings_suggest</router-link>  
  </div>
  <router-view/>  
  <div>
    <label class="label toggle"> <span class="font"> PreCall</span>
      <input type="checkbox" />
      <div class="toggle-control" @click="checkPreCall"></div><span class="material-icons">mic</span>
    </label>
  </div> 
  <div>
    <label class="label toggle"> <span class="font">Sound</span>
      <input type="checkbox" />
      <div class="toggle-control"  @click="checkSound"></div><span class="material-icons">volume_up</span>
    </label>
  </div> 
  <div>
    <label class="label toggle"> <span class="font">Time</span>
      <input type="checkbox"  />
      <div class="toggle-control"  @click="checkTime"></div><span class="material-icons">schedule</span>
    </label>
  </div>  
  <div>
    <label class="label toggle"> <span class="font">Logo</span>
      <input type="checkbox"  />
      <div class="toggle-control"  @click="checkLogo"></div><span class="material-icons">wallpaper</span>
    </label>
  </div> 
  <div>
    <label class="label toggle"> <span class="font">Ad</span>
      <input type="checkbox"  />
      <div class="toggle-control"  @click="checkAd"></div><span class="material-icons">format_indent_increase</span>
    </label>
  </div> 
  <div>
    <label class="label toggle"> <span class="font">Theme</span>
      <input type="checkbox"  />
      <div class="toggle-control"  @click="checkTheme"></div><span class="material-icons">wallpaper</span>
    </label>
  </div> 
</template>

<script>
import axios from "axios"
const localhost =  "http://192.168.1.109" 

export default { 
  data(){
    return{
      callsettings: [],
      soundsettings: [],
      generalsettings: [],
      backgroundsettings: [],
      advertisements: [],
      status: "",
      soundstatus: "",
      timestatus: "",
      imagestatus: "",
      adstatus: "",
      themestatus: ""
    }
  },
  methods:{
    checkPreCall() {
      this.status = !this.status
      this.$emit("input")
      console.log(" PreCall Status is: ",this.status)

      const res = axios.put(localhost + ':3000/api/callsettings', { 
      methods: "POST, PUT",
      status: this.status, 
      })
      this.callsettings = [...this.callsettings, res.data] 
    },
    checkSound() {
      this.soundstatus = !this.soundstatus
      this.$emit("input")
      console.log(" Sound Status is: ",this.soundstatus)

      const res = axios.put(localhost + ':3000/api/soundsettings', { 
      methods: "POST, PUT",
      soundstatus: this.soundstatus, 
      })
      this.soundsettings = [...this.soundsettings, res.data]
    },
    checkTime() {
      this.timestatus = !this.timestatus
      this.$emit("input" )
      console.log(" Time Status is: ",this.timestatus)

      const res = axios.post(localhost + ':3000/api/generalsettings', { 
      methods: "POST, PUT", 
      timestatus: this.timestatus, 
      })
      this.generalsettings = [...this.generalsettings, res.data]
    },
    checkTheme() {
      this.imagestatus = !this.imagestatus
      this.$emit("input" )
      console.log(" Theme Status is: ",this.imagestatus)

      const res = axios.post(localhost + ':3000/api/backgroundsettings', { 
      methods: "POST, PUT", 
      imagestatus: this.imagestatus, 
      })
      this.backgroundsettings = [...this.backgroundsettings, res.data]
    },
    checkAd() {
      this.adstatus = !this.adstatus
      this.$emit("input" )
      console.log(" Advertisement Status is: ",this.adstatus)

      const res = axios.post(localhost + ':3000/api/advertisements', { 
      methods: "POST, PUT", 
      adstatus: this.adstatus, 
      })
      this.advertisements = [...this.advertisements, res.data]
    },
    checkLogo() {
      this.logostatus = !this.logostatus
      this.$emit("input" )
      console.log(" Logo Status is: ",this.logostatus)

      const res = axios.post(localhost + ':3000/api/generalsettings', { 
      methods: "POST, PUT", 
      logostatus: this.logostatus, 
      })
      this.generalsettings = [...this.generalsettings, res.data]
    },
  },
}
</script>

<style scoped>
div{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 10%;
  padding: 17px 5px; 
} 
.container{
  margin: auto;
  width: 60%;
  padding: 6% 7%;
  border: 1px solid white;  
}
.font{
  font-size: 180%; 
  float: left;
  margin-right: 1%;
  margin-left: 5%;
}
.toggle .toggle-control {
  -webkit-transition: 0.3s cubic-bezier(0.98, 0.99, 1, 0.99);
          transition: 0.3s cubic-bezier(0.98, 0.99, 1, 0.99);
  width: 18%;
  height: 20%;
  display: inline-block; 
  border-radius: 2em;
  background-color: #8E8E93;
  position: relative;
  vertical-align:middle;  
  margin-left: 30%; 
  margin-top: 2%;
  float: right;
}
.toggle .toggle-control:after {
  -webkit-transition: 0.3s cubic-bezier(0.98, 0.99, 1, 0.99);
          transition: 0.3s cubic-bezier(0.98, 0.99, 1, 0.99);
  content: "";
  width: 2em;
  height: 2em;
  background-color: #fff;
  border-radius: 50%;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 3px 2px rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
}
.toggle input {
  display: none;
}
.toggle input:checked + .toggle-control {
  background-color: #2196F3;
}
.toggle input:checked + .toggle-control:after {
  left: 60%;
}
label::before {
  content: "";
  font-size: 200%; 
  line-height: 60%;
  float: left;
}
.settings-icon-bar {
  margin-top: 0%;
  margin-left: -1.9%;
  margin-right: -1.9%;
  width: auto; 
  background-color: grey;
  overflow: auto;
  height: 5px;
}
.settings-icon-bar a {
  float: center;
  width: 48%;
  margin-top: -10%;
  text-align: center;
  padding: 0px 0;
  transition: all 0.3s ease;
  color: white;
  font-size: 130%;
}
.settings-icon-bar a:hover {
  background-color: #2196F3;
} 
.active {
  background-color: grey;
} 
</style>