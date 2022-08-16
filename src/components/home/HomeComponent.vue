<template>
  <div class="container ">
    <div>
      <input type="number" v-model="value" placeholder="NUM" />
    </div>
    <div class="consecutive ">
      <button class="pre " @click="sendPre1" :orderno="pre">{{ pre1 }}</button>
      <button class="pre " @click="sendPre2" :orderno="pre">{{ pre2 }}</button>
      <button class="pre " @click="sendPre3" :orderno="pre">{{ pre3 }}</button>
      <button class="pre " @click="sendPre4" :orderno="pre">{{ pre4 }}</button>
    </div>
    <div class="container-a ">
      <div class="numeric-keyboard ">
        <button @pressed="value = $event" :orderno="value" v-for="key in keys" :key="key" @click="press(key)"
          class="btn " :class="keyTheme">{{ key }}
        </button>
        <button class="btn btn-c " :class="buttonTheme" @click="clear('all')">C</button>
        <button class="btn btn-del " :class="buttonTheme" @click="clear()"><span
            class="material-icons large ">backspace</span></button>
        <button class="btn btn-call " :class="buttonTheme" @click="send(); clear('all'); " type="submit"
          :disabled="isDisable(value)"><span class="material-icons large ">send</span></button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const BASE_URL = "http://localhost:3000"

export default {
  data() {
    return {
      orders: [],
      value: '',
      total: "",
      keys: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],  //we are define numbers in our numeric keyboard keys from here
      keyTheme: 'btn-keyboard',
      buttonTheme: 'container',
    }
  },
  methods: {
    press(key) {
      this.value = `${this.value}${key}`
      this.total = `${this.value}`
      this.pre0 = this.total++ //when delete this the first pre-number is the same as orderno
      this.pre1 = this.total++ //these are prediction numbers 
      this.pre2 = this.total++
      this.pre3 = this.total++
      this.pre4 = this.total++
    },
    clear(type) {
      if (type === 'all') this.value = '' // we are deleting all input values(numbers) in here
      else this.value = this.value.substring(0, this.value.length - 1)
    },
    async send() {
      const res = await axios.post(BASE_URL + "/api/orders", {
        orderno: this.value,
      }).catch(err => { console.log(err) })
      this.orders = [...this.orders, res.data]
      this.orderno = ""
    },
    isDisable() {
      return this.value.length == 0 // for disable button if input value is empty, this way we are not sending empty data
    },
    async sendPre1() {
      this.value = this.pre1
    },
    async sendPre2() {
      this.value = this.pre2
    },
    async sendPre3() {
      this.value = this.pre3
    },
    async sendPre4() {
      this.value = this.pre4
    },
  },
  created() {
  //  window.addEventListener('beforeunload', () => {
  //    console.log(this.anything);
  //  }, false)
  },
  watch: {
  //  value() {
  //    this.$emit('pressed', this.value)
  //  },
  //  orderno() {
  //    this.value = this.orderno
  //  },
  },
  computed: {
  },
}
</script>

<style scoped>
 .container {
   height: auto;
   width: 80%;
   float: center;
   margin: auto;
   padding: 0%;
 }

 input {
   padding: 10% 10% 10% 10%;
   width: 73%;
   margin-left: 3%;
   margin-top: 5%;
   margin-bottom: 0%;
   font-size: 460%;
   align-content: center;
   border-radius: 15px;
 }

 .consecutive {
   display: flex;
   flex-direction: row;
   justify-content: center;
 }

 .pre {
   border: 2px solid rgb(180, 179, 179);
   border-radius: 30px;
   padding: 2%;
   margin-left: 4%;
   margin-right: 4%;
   margin-top: 2%;
 }

 button {
   width: 25%;
   background-color: rgb(241, 240, 240);
   margin-right: 8%;
 }

 .container-a {
   padding: 10% 0% 0% 0%;
   float: center;
   margin: auto;
 }

 .numeric-keyboard {
   display: grid;
   grid-template-columns: 30% 30% 30%;
   grid-gap: 6%;
 }

 .numeric-keyboard .btn {
   font-size: 180%;
   font-weight: bold;
   border: white;
   border-radius: 10px;
   color: white;
   margin-bottom: 14%;
   margin-top: 0%;
   margin-left: -1%;
 }

 .btn-keyboard {
   background-color: grey;
   color: black;
   height: 120%;
   width: 99%;
 }

 .btn-call {
   background-color: #81C784;
   height: 170%;
   width: 340%;
 }

 .btn-del {
   background-color: #2196F3;
   height: 123%;
   width: 99%;
 }

 .btn-c {
   background-color: rgb(141, 171, 182);
   height: 123%;
   width: 99%;
 }
</style>
