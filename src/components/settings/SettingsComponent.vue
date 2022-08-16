<template>
  <div class="settings-icon-bar ">
    <router-link to="/settings/pre-call" class="material-icons sound">settings_voice</router-link>
    <router-link to="/settings/system" class="material-icons call">settings_suggest</router-link>
  </div>
  <router-view />
  <div v-for="call in callsettings" :key="call">
    <label class="label toggle "> <span class="font "> PreCall</span>
      <input type="checkbox" v-model="call.status" />
      <div class="toggle-control " @click="checkPreCall"></div><span class="material-icons ">schedule</span>
    </label>
  </div>
  <div v-for="sound in soundsettings" :key="sound">
    <label class="label toggle "> <span class="font ">Sound</span>
      <input type="checkbox" v-model="sound.soundstatus"/>
      <div class="toggle-control " @click="checkSound"></div><span class="material-icons ">volume_up</span>
    </label>
  </div>
  <div v-for="time in generalsettings" :key="time">
    <label class="label toggle "> <span class="font ">Time</span>
      <input type="checkbox" v-model="time.timestatus" />
      <div class="toggle-control " @click="checkTime"></div><span class="material-icons ">schedule</span>
    </label>
  </div>
  <div v-for="logo in generalsettings" :key="logo">
    <label class="label toggle "> <span class="font ">Logo</span>
      <input type="checkbox" v-model="logo.logostatus" />
      <div class="toggle-control " @click="checkLogo"></div><span class="material-icons ">wallpaper</span>
    </label>
  </div>
  <div v-for="ad in advertisements" :key="ad">
    <label class="label toggle "> <span class="font ">Ad</span>
      <input type="checkbox" v-model="ad.adstatus" />
      <div class="toggle-control " @click="checkAd"></div><span class="material-icons ">format_indent_increase</span>
    </label>
  </div>
  <div v-for="back in backgroundsettings" :key="back">
    <label class="label toggle "> <span class="font ">Theme</span>
      <input type="checkbox" v-model="back.imagestatus" />
      <div class="toggle-control " @click="checkTheme"></div><span class="material-icons ">wallpaper</span>
    </label>
  </div>
</template>

<script>
import axios from "axios"
const BASE_URL = "http://localhost:3000"

export default {
  data() {
    return {
      callsettings: {
        status: "",
        id: ""
      },
      soundsettings: {
        soundstatus: {
          type: Boolean,
          default: false
        },
        id: "",
      },
      generalsettings: {
        timestatus: "",
        logostatus: "",
        id: "",
      },
      backgroundsettings: {
        imagestatus: "",
        id: ""
      },
      advertisements: {
        adstatus: "",
        id: ""
      }, 
    }
  },
  computed: {
  },
  methods: {
    checkPreCall() {
      fetch(BASE_URL + "/api/callsettings") //we fetched data in created hook but for use the status data and switch value we have to fetch data in here again
        .then(response => response.json())
        .then(data => {
          (this.callsettings = data)
          for (data of data) {
            data.status = !data.status  // we are calling status(toggle/switch value) from api and doing operations(when clicked switch and post switch value) in fetched data
            this.$emit("input", data.status)
            console.log(" Precall Status is: ", data.status)
            axios.put(BASE_URL + '/api/callsettings/', {
              methods: "PUT",
              status: data.status,
              id: 1
            }).catch(err => { console.log(err) })
          }
        })
        .catch(error => { console.log(error) })
    },
    checkSound() {
      fetch(BASE_URL + "/api/soundsettings")
        .then(response => response.json())
        .then(data => {
          (this.soundsettings = data)
          for (data of data) {
            data.soundstatus = !data.soundstatus
            this.$emit("input", data.soundstatus)
            console.log(" Sound Status is: ", data.soundstatus)
            axios.put(BASE_URL + '/api/soundsettings/', {
              methods: "PUT",
              soundstatus: data.soundstatus,
              id: 1
            }).catch(err => { console.log(err) })
          }
        })
        .catch(error => { console.log(error) })
    },
    checkTime() {
      fetch(BASE_URL + "/api/generalsettings")
        .then(response => response.json())
        .then(data => {
          (this.generalsettings = data)
          for (data of data) {
            data.timestatus = !data.timestatus
            this.$emit("input", data.timestatus)
            console.log(" Time Status is: ", data.timestatus)
            axios.put(BASE_URL + '/api/generalsettings/', {
              methods: "PUT",
              timestatus: data.timestatus,
              id: 1
            }).catch(err => { console.log(err) })
          }
        })
        .catch(error => { console.log(error) })
    },
    checkTheme() {
      fetch(BASE_URL + "/api/backgroundsettings")
        .then(response => response.json())
        .then(data => {
          (this.backgroundsettings = data)
          for (data of data) {
            data.imagestatus = !data.imagestatus
            this.$emit("input", data.imagestatus)
            console.log(" Theme Status is: ", data.imagestatus)
            axios.put(BASE_URL + '/api/backgroundsettings/', {
              methods: "PUT",
              imagestatus: data.imagestatus,
              id: 1
            }).catch(err => { console.log(err) })
          }
        })
        .catch(error => { console.log(error) })
    },
    checkAd() {
      fetch(BASE_URL + "/api/advertisements")
        .then(response => response.json())
        .then(data => {
          (this.advertisements = data)
          for (data of data) {
            data.adstatus = !data.adstatus
            this.$emit("input", data.adstatus)
            console.log(" Adversitement Status is: ", data.adstatus)
            axios.put(BASE_URL + '/api/advertisements/', {
              methods: "PUT",
              adstatus: data.adstatus,
              id: 1
            }).catch(err => { console.log(err) })
          }
        })
        .catch(error => { console.log(error) })
    },
    checkLogo() {
      fetch(BASE_URL + "/api/generalsettings")
        .then(response => response.json())
        .then(data => {
          (this.generalsettings = data)
          for (data of data) {
            data.logostatus = !data.logostatus
            this.$emit("input", data.logostatus)
            console.log(" Logo Status is: ", data.logostatus)
            axios.put(BASE_URL + '/api/generalsettings/', {
              methods: "PUT",
              logostatus: data.logostatus,
              id: 1
            }).catch(err => { console.log(err) })
          }
        })
        .catch(error => { console.log(error) })
    },
  },
  created() { //we are fetching data from api in this hook 
    fetch(BASE_URL + "/api/callsettings")
      .then(response => response.json())
      .then(data => (this.callsettings = data))
      .catch(error => { console.log(error) })

    fetch(BASE_URL + "/api/generalsettings")
      .then(response => response.json())
      .then(data => (this.generalsettings = data))
      .catch(error => { console.log(error) })

    fetch(BASE_URL + "/api/advertisements")
      .then(response => response.json())
      .then(data => (this.advertisements = data))
      .catch(error => { console.log(error) })

    fetch(BASE_URL + "/api/soundsettings")
      .then(response => response.json())
      .then(data => (this.soundsettings = data))
      .catch(error => { console.log(error) })

    fetch(BASE_URL + "/api/backgroundsettings")
      .then(response => response.json())
      .then(data => (this.backgroundsettings = data))
      .catch(error => { console.log(error) })
  }
}
</script>

<style scoped>
div {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin-top: 10%;
  padding: 17px 5px;
}

.container {
  margin: auto;
  width: 60%;
  padding: 6% 7%;
  border: 1px solid white;
}

.font {
  font-size: 180%;
  float: left;
  margin-right: 1%;
  margin-left: 5%;
}

.toggle .toggle-control {
  -webkit-transition: 0.3s cubic-bezier(0.98, 0.99, 1, 0.99);
  transition: 0.3s cubic-bezier(0.98, 0.99, 1, 0.99);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.4), 0 3px 2px rgba(0, 0, 0, 0.4);
  width: 80px;
  height: 20%;
  display: inline-block;
  border-radius: 2em;
  background-color: #8E8E93;
  position: relative;
  vertical-align: middle;
  margin-left: 10%;
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

.toggle input:checked+.toggle-control {
  background-color: #2196F3;
}

.toggle input:checked+.toggle-control:after {
  left: 67%;
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