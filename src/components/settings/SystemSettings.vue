<template> 
  <div class="settings-icon-bar">
    <p class="material-icons small settings"><a class="material-icons">settings_suggest</a></p>  
  </div>    
  <div>
    <div>
      <p> Subtitle </p>
      <form method="post" v-on:submit.prevent="submitForm">
          <div class="form-group"> 
              <input type="text" class="form-control title" id="title" placeholder="Title*" maxlength="25" v-model="subtitle.title">
          </div>   
          <div class="form-group"> 
              <textarea name="text" class="form-control subtitle" id="text" rows="3" maxlength="512" placeholder="Please enter the subtitle to here"
                  v-model="subtitle.text"></textarea>
          </div>  
          <div class="form-group">
              <button class="material-icons subtitle-button" @click="postSubtitle">mode_off_on </button>
          </div>
      </form>
    </div>  
    <div>
      <button class="refresh " @click.prevent="update(); shake();">Refresh</button>
      <select v-model="subtitle" :class="{ shake: disabled }" class="card scrollable-card" >
        <option :value="subtitle" v-for="subtitle in subtitle" :key="subtitle">
          {{ subtitle.title }}
        </option>
      </select><p class="selected">Selected Subtitle: {{ subtitle.title }}</p><button @click="postSubtitle" class="button-send"><p class="send-text">Send</p></button>  
    </div>                               
    <!--div class="card">
      <div class="card-body"> 
        <div class="scrollable-card">
          <ul>
            <li>  
              <p @click="selectSubtitle" class="card-title card-text" v-for="title of title" :key="title.id">{{ title.title }} 
              <button  @click="deleteSubtitle" class="del-button material-icons">clear</button>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
      <form @click="sendSubtitle" class="add-form">
        <button type="submit" class="submit-button" >Save</button>
      </form-->
      <button type="submit" class="delete-button" @click="deleteSubtitle">Delete</button>
    </div>  
  <div>
    <p>Close Device</p> 
    <label class="label power-button"> 
      <input type="checkbox"  />
      <div class="power-button power-button-control " @click="checkPower"><span class="material-icons">power_settings_new</span></div> 
    </label>
  </div>   
</template>

<script>
import axios from 'axios'
const localhost = "http://192.168.1.109"

export default { 
    data(){
      return{
        subtitle: {
            title: '',   
            text: '', 
        },
        notes: [],  
        generalsettings: [],
        close: "", 
        title: "",
        text: "",
        disabled: false,
      }
    },
    methods:{
      shake() {
        this.disabled = true
        setTimeout(() => {
          this.disabled = false
        }, 1500)
      },
      submitForm(){
        axios.post(localhost + ':3000/api/notes', this.subtitle)
          .then(() => {  
          })
          .catch((error) => {
              console.log(error)
          }) 
      },
      deleteSubtitle($id) {
        axios.delete(localhost + ':3000/api/notes/' + $id)
          .then(res => { console.log(res)  
          this.postSubtitle()})
            .catch(err => { console.error(err) }) 
      }, 
      postSubtitle() {
        const res = axios.post(localhost + ":3000/api/notes", {
          title: this.subtitle.title,
          text: this.subtitle.text
        })
        this.notes = [...this.notes, res.data]
        this.title = this.subtitle.title
        this.text = this.subtitle.text
      },
      update() { 
      fetch(localhost + ":3000/api/notes")
        .then(response => response.json())
        .then(data => (this.subtitle = data.reverse())) 
       // axios.get("http://localhost:3000/api/notes")
      //  .then(response => console.log(response))
       // .then(data => (this.subtitle = data.reverse()))
      }, 
      checkPower() {
        this.close = !this.close
        this.$emit("input" )
        console.log(" Power is: ",this.close)

        const res = axios.post(localhost + ':3000/api/generalsettings', { 
        methods: "POST, PUT", 
        close: this.close, 
        })
        this.generalsettings = [...this.generalsettings, res.data]
      }, 
    },
    created(){     
      console.log('created...')
      fetch(localhost + ":3000/api/notes")
        .then(response => response.json())
        .then(data => (this.subtitle = data.reverse()))  
    },  
//   removeItem(id) {
//    axios.delete(`http://localhost:3000/system/${id}`)
//    this.subtitle = this.subtitle.filter(text => text.id !== id)
//   }, 
}
</script>

<style scoped>  
div{
  font-family: Avenir, Helvetica, Arial, sans-serif; 
  margin-left: 4%; 
} 
ul{
  margin-top: 1%
}
li{
  list-style-type: none; 
  margin-left: -20%;
}
p{
  font-family: Avenir, Helvetica, Arial, sans-serif; 
  font-size: 160%;
  margin-top: 13%;
}
.settings-icon-bar {
  margin-top: 0%;
  margin-left: -1.9%;
  width: 104%; 
  background-color: grey; 
  height: 30px; 
}  
.settings {
  margin-top: 0%;
  margin-left: 46%; 
  height: 20px;  
  color: white;
} 
.title{
  padding: 1% 1% 1% 1%;
  height: 25px;
  width: 68%;
  margin-left: 5%;
  margin-bottom: 2%;
  border: 1px solid black;
  float: center;
}
.subtitle{
  padding: 1% 1% 1% 1%;
  height: 90px;
  width: 68%;
  margin-left: 5%;
  margin-bottom: 5%;
  border: 1px solid black;
  float: center;
}
.selected{
  margin-left: 5%;
  margin-top: 2%; 
  width: 63%;  
  border: 1px solid #2196F3;
  border-radius: 20px;
  height: 10%; 
  font-size: 100%;
  padding: 3%;
} 

.subtitle-button{
  width: 12%;
  background-color: #2196F3;
  border: #2196F3;
  border-radius: 20%;
  float: right;
  margin-right: 5%; 
  margin-top: -14%;
} 
.send-text{
  font-size: 100%;
  margin-top: -20%
  }
.button-send{
  width: 15%;
  height: 30px; 
  float: right;
  margin-right: 5%; 
  margin-top: -14%;
  background-color: #2196F3;
  border: #2196F3;
  border-radius: 20px;
  text-align: center;
  -webkit-transition-duration: 0.4s; 
  transition-duration: 0.4s;
  text-decoration: none;
  overflow: hidden;
  cursor: pointer;
}
.button-send:after {
  content: "🚀";
  background: #2196F3;
  border-radius: 20px;
  display: block; 
  padding-top: 500%;
  padding-left: 350%;
  margin-left: -15px!important;
  margin-top: -1100%; 
  opacity: 0;
  transition: all 1.5s
}

.button-send:active:after {
  padding: 0;
  margin: 0;
  opacity: 2;
  transition: 0s
}
.refresh{ 
  margin-right: 10%;
  margin-left: 6%;
  border-radius: 20px;
  background-color: #81C784;
  border: 1px solid #81C784;
}
 .delete-button{
  height: 30px;
  width: 14%;
  padding: 0%;
  background-color: #2196F3; 
  border: #2196F3;
  border-radius: 20px;
  float: right;
  margin-right: 5%;
  margin-top: -28%; 
} 
.power-button .power-button-control {  
  border-radius: 50%;
  background-color: red; 
  float: right;   
  height: 35px;
  width: 35px;
  margin-top: -15%;
  margin-right: 5%;  
  padding-left: 3%;
  padding-top: 2.3%;
}
.power-button .power-button-control:after {   
  margin-right: 5%;  
  float: right;
  background-color: red; 
  border-radius: 50%;
  height: 35px;
  width: 30px;  
}
.power-button input {
  display: none;
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



.card{
  width: 70%;
  height: 120%;
  margin:  auto;
  margin-left: 5%;
  margin-top: 2%;
  border: 2px solid #2196F3;
  box-shadow: 2px 8px 16px 2px rgba(10, 10, 10, 0.2); 
  border-radius: 15px;
}
.scrollable-card{
  overflow-y: auto;
  max-height: 140px; 
  min-height: 40px;
}
.card-title{
  border: 1px solid grey;
  background: white;
  height: 30px;
  width: 210px;
  margin-top: 3px; 
  margin-left: 3px;
  padding: 1.5%; 
  margin-bottom: 3px; 
  font-size: 110%; 
  border: 1px solid #2196F3;
  border-radius: 9px;
  box-shadow: 8px 2px 18px 6px #98bad6; 
}
.card-text{
  float: left
}
</style>