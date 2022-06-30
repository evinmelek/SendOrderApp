<template> 
      <div>
    <space class="background-space ">
      <div class="dropdown "><button class="dropbtn ">Background Color<span class="material-icons large "> brush </span> </button>
      <select class="color-dropbtn " v-model="selectedColor">  
          <option class="red ">Maroon</option>
          <option class="green ">Green</option>
          <option class="grey ">Silver</option>
          <option  class="blue ">Teal</option>
          <option class="yellow ">Goldenrod</option>
          <option class="purple ">Orchid</option>
          <option class="white ">White</option>
          <option class="pink ">Pink</option> 
          <option class="black "> Grey</option> 
      </select> 
      <button class="material-icons btn-blue down " @click="postColor">add</button>
      </div>   
    </space> 
    <div>
      <button class="dropbtn ">Company Logo <span class="material-icons large "> add_photo_alternate</span></button>
      <input type="file" accept="image/*" class="select-file " id="logoId" @change="uploadLogo"> 
      <button class="material-icons btn-blue " @click="sendLogo" :disabled="noLogo">add</button>
      <ul>
        <li> 
        <img :src="companylogo"><span class="material-icons small " @click="delLogo"> delete</span>
        </li>
      </ul>
    </div>
    <div>
      <button class="dropbtn ">Advertisement <span class="material-icons large"> add_photo_alternate</span></button>
      <input class="select-file " type="file" accept="image/*,video/*" id="adId" @change="uploadAd">
      <button class="material-icons btn-blue " id="button" @click="postAd" :disabled="noFile">add</button>
      <div class="preview ">
        <video class="video-preview " id="video-preview" controls v-show="file != ''" autoplay/>
        <ul>
          <li>  
          <img :src="file"><span class="material-icons small " @click="delAd"> close</span>
          </li>
        </ul> 
      </div> 
    </div>
    <div>
      <button class="dropbtn ">Change Theme <span class="material-icons large "> add_photo_alternate</span></button>
      <input type="file" accept="image/*" class="select-file " ref="file" id="themeId" @change="uploadTheme">
      <button class="material-icons btn-blue " @click="sendTheme" :disabled="noTheme">add</button>
      <ul>
        <li> 
        <img :src="image"><span class="material-icons small " @click="delTheme"> cancel_presentation</span>
        </li>
      </ul>
    </div>
  </div> 
</template>

<script> 
import axios from "axios"
const BASE_URL =  "http://192.168.1.102:3000" 

export default {
  data(){
    return{
      backgroundsettings: {
        color: "",
        image: "",
        id: ""
      },
      generealsettings: {
        companylogo: "",
        id: ""
        
      },
      advertisements: { 
        file: "", 
        id: "" 
      },  
      image: "",  
      file: "",
      companylogo: "",
      selectedColor: "",
      noFile: true,
      noLogo: true,
      noTheme: true 
    }
  },
  methods:{
    postColor() { 
        const res = axios.put(BASE_URL + "/api/backgroundsettings", { 
          id: 1,
          color: this.selectedColor, 
        }).catch(error=>(console.log(error)))
        this.backgroundsettings = [...this.backgroundsettings, res.data]
        this.color = this.selectedColor   
      },
    uploadLogo(e) {
      //this.companyLogo = this.$refs.file.files[0] 
        this.noLogo = !e.target.files.length
        var files = e.target.files || e.dataTransfer.files
      if (!files.length>20045)
        return
      this.createLogo(files[0])
    },
    createLogo(file) { 
      var reader = new FileReader()
      var show = this

      reader.onload = (e) => {
        show.companylogo = e.target.result
      }
      reader.readAsDataURL(file)
    },
    delLogo() {  
      this.companylogo = ''
    },
    sendLogo() { 
      const res = axios.put(BASE_URL + "/api/generalsettings", { 
        id: 1,
        companylogo: this.companylogo,
      }).catch(err=>{console.log(err)})
      this.generalsettings = [...this.generalsettings, res.data]
      this.companylogo = ""

      //document.getElementById("logoId").files[0].path // no need to add everywhere  ***file path(we can use .name instead of .path)
      //var filepath = window.document.getElementById("logoId") ***this is getting file path
      //console.log(filepath.value) 
    },  
    uploadAd(e) {
      this.noFile = !e.target.files.length
      var files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return;
      this.createAd(files[0])
    },
    createAd(file) { 
      let video = document.getElementById('video-preview')
      var reader = new FileReader()
      var show = this

      reader.onload = (e) => {
        show.file = e.target.result
      }
      reader.readAsDataURL(file)
      reader.addEventListener('load', function(){
        video.src = reader.result
    })
    },
    delAd() {
      this.file = ''
    },
    postAd() {
      document.getElementById('button').addEventListener('click', function() {
      var files = document.getElementById('adId').files;
      if (files.length > 0) {
        getBase64(files[0])
      }
    })
    function getBase64(file) {
      var reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = function () {
        console.log(reader.result)
      }
      reader.onerror = function (error) {
        console.log('Error: ', error)
      }
    }
      const res = axios.put(BASE_URL + '/api/advertisements', { 
        id: 1,
        file: this.file
    }).catch(error => {console.log(error)})
      this.advertisement = [...this.advertisement, res.data]
      this.file = this.reader.result
    },

    uploadTheme(e) {
      // this.theme = this.$refs.file.files
        this.noTheme = !e.target.files.length
        var files = e.target.files || e.dataTransfer.files
      if (!files.length)
        return
      this.createTheme(files[0])
    },
    createTheme(file) { 
      var reader = new FileReader()
      var show = this

      reader.onload = (e) => {
        show.image = e.target.result
      };
      reader.readAsDataURL(file)
      console.log(typeof(file))
    }, 
    delTheme() {
      this.image = ''
    },  
    async sendTheme() { 
      const res = await axios.put(BASE_URL + "/api/backgroundsettings", {  
        id: 1,
        image: this.image  
      }).catch(error => {console.log(error)})
      this.backgroundsettings = [...this.backgroundsettings, res]
      this.image = ""  
    }, 
  },
}

</script>

<style scoped>
div {
  margin-top: 4%;
  padding: 2% 2%; 
} 
img {
  height: 50px;
  width: 50px; 
  border: 1px solid black;
  margin-left: 0%; 
}
li {
  list-style-type:none;
} 
.container{ vertical-align: middle;}
.preview{
  float: center;
}
option{ 
  font-size: 80%;  
}
.video-preview{
  height: 56px;
  width: 87px;
  margin-top: 5%;
  float: right;
  margin-right: 25%;
  border: 1px solid black;
}
.background-space{margin-right: 90%;}
.dropbtn { 
  color: black;
  padding: 0%  0% 2% 0%;
  font-size: 140%;
  border: none;
  background-color: white;
  float: left;
  margin-left: 2%;  
  border-radius: 15px;  
  width: 70%;
  height: 120%; 
  margin:  auto; 
  margin-top: 2%;
}
.color-dropbtn { 
  color: black;
  padding: 0%  0% 0% 0%;
  font-size: 140%;
  border: none; 
  float: left;
  margin-left: 2%;  
  background-color: white;
  border-radius: 25px;  
  width: 74%;
  height: 40px; 
  margin:  auto; 
  margin-top: 2%; 
  box-shadow: 2px 8px 16px 2px rgba(10, 10, 10, 0.2); 
  border: 1px solid black;
}   
.red{background-color: maroon;}
.green{background-color: green;}
.grey{background-color: silver;}
.blue{background-color: teal;}
.yellow{background-color: goldenrod;}
.purple{background-color: orchid;}
.white{background-color: white;}
.pink{background-color: pink; }  
.black{background-color: grey; color: white; content: "Black";}

.btn-blue {
  background-color: #2196F3;
  border: #2196F3;
  border-radius: 20%;
  float: right;
} 
.select-file {
  height: 20%;
  width: 70%;
  border: 1px solid grey;
  float: center;
}
.select-drop {  
  padding: 1% 5% 2% 0%;
  width: 3%;
  border: 1px solid white;  
  margin: auto;
  float: left;
}
.down{
  margin-top: 5%;
}

</style>