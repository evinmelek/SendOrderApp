<template>
  <div>
    <div class="settings-icon-bar">
      <p class="material-icons small settings"><a class="material-icons">settings_suggest</a></p>
    </div>
    <div>
      <p class="features "> Subtitle </p>
      <form method="post" v-on:submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" class="form-control title" id="title" placeholder="Title*" maxlength="25"
            v-model="subtitle.title">
        </div>
        <div class="form-group">
          <textarea name="text" class="form-control subtitle" id="text" rows="3" maxlength="512"
            placeholder="Please enter the subtitle to here" v-model="subtitle.text"></textarea>
        </div>
        <div class="form-group">
          <button class="material-icons subtitle-button" @click="postSubtitle">add </button>
        </div>
      </form>
    </div>
    <div>
      <button class="refresh " @click.prevent="update(); shake();">Refresh</button>
      <select v-model="subtitle" :class="{ shake: disabled }" class="dropdown scrollable-dropdown">
        <option :value="subtitle" v-for="subtitle in subtitle" :key="subtitle">
          {{ subtitle.title }}
        </option>
      </select>
      <button @click="postSubtitle" class="send">Send</button>
    </div>
    <div>
      <p class="selected">Selected Subtitle: {{ subtitle.title }}</p>
      <button type="submit" class="delete " @click="deleteSubtitle(subtitle.id)"
        :href="'/notes/' + subtitle.id">Delete</button>
    </div>
    <div>
      <p class="features "> Toptitle </p>
      <form method="post" v-on:submit.prevent="submitForm">
        <div class="form-group">
          <input type="text" class="form-control title" id="title" placeholder="Toptitle*" maxlength="25"
            v-model="generalsettings.toptitle">
        </div> 
        <div class="form-group">
          <button class="material-icons subtitle-button" @click="postToptitle">add </button>
        </div>
      </form>
    </div>
    <div class="features ">
      <p>Close Device</p>
      <div v-for="power in generalsettings" :key="power">
        <button id="power" class="power-button " @click="checkPower"><span
            class="material-icons ">power_settings_new</span><input  v-model="power.close" v-show="false" type="checkbox" />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// importing axios for data processes
import axios from "axios"
// importing backend api url  
const BASE_URL = "http://localhost:3000"
export default {
  data() {
    return {
      subtitle: {
        title: "",
        text: "", 
        id: ""
      },
      notes: {
        title: "",
        text: "",
        id: ""
      },
      generalsettings: {
        close: "",
        toptitle: "",
        id: ""
      },
      disabled: false,
    }
  },
  methods: {
    shake() {  
      this.disabled = true
      setTimeout(() => {
        this.disabled = false
      }, 1500)
    },
    //      submitForm(){
    //        axios.post(BASE_URL + '/api/notes', this.subtitle)
    //          .then(() => {  
    //          })
    //          .catch((error) => {
    //              console.log(error)
    //          }) 
    //      },
    deleteSubtitle(id) {
      if (confirm("Are you sure to delete this subtitle?")) {
        axios.delete(BASE_URL + '/api/notes/' + id)  // we delete the subtitle taht we choose(id) in select options 
          .then(response => response.data)
          .catch(error => console.log(error.response.data))
      }
    },
    postSubtitle() {
      const res = axios.put(BASE_URL + "/api/notes/", {
        title: this.subtitle.title,
        text: this.subtitle.text,
        id: this.subtitle.id
      }).catch(err => { console.log(err) })
      this.notes = [...this.notes, res.data]
      this.id = this.subtitle.id
      this.title = this.subtitle.title
      this.text = this.subtitle.text
    },
    update() {
      fetch(BASE_URL + "/api/notes")
        .then(response => response.json()).catch(err => { console.log(err) })
        .then(data => (this.subtitle = data.sort((a, b) => { // we sort the fetched data from last id to first id
          if (a.id > b.id) return -1
          if (a.id < b.id) return 1
          return 0
        })))
      //  axios.get("http://localhost:3000/api/notes")
      //  .then(response => console.log(response))
      //  .then(data => (this.subtitle = data.reverse()))
    },
    postToptitle() {
      const res = axios.put(BASE_URL + "/api/generalsettings/", {
        toptitle: this.generalsettings.toptitle, 
        id: 1
      }).catch(err => { console.log(err) })
      this.notes = [...this.notes, res.data] 
    },  
    checkPower() {   
//      var child = window.open('file:///C:/Users/evinm/LpNum/dist/index.html','','toolbar=0,status=0,width=626,height=436');
//      child.onunload = function(){ console.log(' window '); };    
      fetch(BASE_URL + "/api/generalsettings")
        .then(response => response.json())
        .then(data => {
          (this.generalsettings = data)
          for (data of data) { 
            data.close = !data.close  //toggle button status changes every click
          //  let x = document.getElementById("power")
          //  x.style.color != x.style.color
          //  if(data.close == false){
          //     x.style.color="white"
          //  }else{
          //    x.style.color="black"
          //  }
            this.$emit("input", data.close)
            console.log(" Power Status is: ", data.close)
            axios.put(BASE_URL + '/api/generalsettings/', {
              methods: "PUT",
              close: data.close,
              id: 1
            }).catch(err => { console.log(err) })
          }
        })
        .catch(error => { console.log(error) }) 
    },
  },
  created() {
    console.log('created...')
    fetch(BASE_URL + "/api/notes")
      .then(response => response.json()).catch(err => { console.log(err) })
      .then(data => (this.subtitle = data.sort((a, b) => {
        if (a.id > b.id) return -1
        if (a.id < b.id) return 1
        return 0
      })))

    fetch(BASE_URL + "/api/generalsettings")
      .then(response => response.json())
      .then(data => {
        (this.generalsettings = data)
//        for (data of data) {  
//          if(data.close == false){
//              document.getElementById("power").style.color="white"
//          }else{
//            document.getElementById("power").style.color="black"
//          } 
//          console.log(" Power Status is: ", data.close)
//        }
      })
  }, 
}
</script>

<style scoped>
  div {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    float: center;
  }

  ul {
    margin-top: 1%
  }

  li {
    list-style-type: none;
    margin-left: -20%;
  }

  p {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-size: 160%;
  }

  .settings-icon-bar {
    margin-top: 0%;
    margin-left: -1.9%;
    width: 104%;
    background-color: grey;
    height: 30px;
  }

  .features {
    padding: 5%;
    float: left;
    margin-right: 20%;
  }

  .settings {
    margin-top: 0%;
    margin-left: 46%;
    height: 20px;
    color: white;
  }

  .title {
    padding: 1% 1% 1% 1%;
    height: 25px;
    width: 68%;
    float: left;
    margin-left: 5%;
    margin-bottom: 2%;
    border: 1px solid black;
    float: center;
  }

  .subtitle {
    padding: 1% 1% 1% 1%;
    height: 90px;
    width: 68%;
    float: left;
    margin-left: 5%;
    margin-bottom: 5%;
    border: 1px solid black;
    float: center;
  }

  .selected {
    margin-left: 5%;
    margin-top: 2%;
    width: 63%;
    float: left;
    border: 1px solid #2196F3;
    border-radius: 20px;
    height: 10%;
    font-size: 100%;
    padding: 3%;
  }

  .subtitle-button {
    background-color: #2196F3;
    border: #2196F3;
    border-radius: 20%;
    float: right;
    margin-right: 5%;
  }

  .send-text {
    font-size: 100%;
    margin-top: 9%
  }

  .refresh {
    float: left;
    border-radius: 20px;
    margin-top: 2%;
    margin-bottom: 2%;
    margin-left: 10%;
    margin-right: 30%;
    text-align: center;
    background-color: #81C784;
    border: 1px solid #81C784;
  }

  .send {
    float: right;
    height: 5%;
    padding: 1%;
    border-radius: 15px;
    margin-top: 3%;
    margin-bottom: 2%;
    margin-right: 5%;
    margin-left: 5%;
    text-align: center;
    background-color: #2196F3;
    border: 1px solid #2196F3;
  }

  .delete {
    float: right;
    height: 5%;
    padding: 1%;
    border-radius: 15px;
    margin-top: 3%;
    margin-bottom: 2%;
    margin-right: 5%;
    margin-left: 5%;
    text-align: center;
    background-color: #2196F3;
    border: 1px solid #2196F3;
  }

  .power-button {
    height: 35px;
    width: 35px;
    text-align: center;
    background-color: red;
    border: red;
    border-radius: 30px;
    float: left; 
    animation-duration: 1s; 
    animation-name: power-button;
  } 
  @keyframes power-button{
   0%{
    height: 30px;
    width: 30px;
    color: white;}
   25%{
    height: 40px;
    width: 40px;
    color: white;}
   50%{
    height: 40px;
    width: 40px;
    color: white;}
   100%{
    height: 35px;
    width: 35px;
    color: white;}
  }
  .shake {
    animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
    transform: translate3d(0, 0, 0);
  }

  @keyframes shake {

    10%,
    90% {
      transform: translate3d(-1px, 0, 0);
    }

    20%,
    80% {
      transform: translate3d(2px, 0, 0);
    }

    30%,
    50%,
    70% {
      transform: translate3d(-4px, 0, 0);
    }

    40%,
    60% {
      transform: translate3d(4px, 0, 0);
    }
  }



  .dropdown {
    width: 70%;
    height: 120%;
    margin-left: 5%;
    float: left;
    padding: 2%;
    border: 2px solid #2196F3;
    box-shadow: 2px 8px 16px 2px rgba(10, 10, 10, 0.2);
    border-radius: 15px;
  }

  .scrollable-dropdown {
    overflow-y: auto;
    max-height: 140px;
    min-height: 40px;
  }

  .dropdown-title {
    border: 1px solid grey;
    background: white;
    height: 30px;
    width: 210px;
    margin-top: 3px;
    margin-left: 3px;
    margin-right: 3px;
    padding: 1.5%;
    margin-bottom: 3px;
    font-size: 110%;
    border: 1px solid #2196F3;
    border-radius: 9px;
    box-shadow: 8px 2px 18px 6px #98bad6;
  }

  .dropdown-text {
    float: left
  }
</style>