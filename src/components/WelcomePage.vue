<template>
    <div>
        <h1><span class="company">Lotus Pecas</span>        
        <img src="@/assets/welcome.png" crossorigin="anonymous"/>
        <span class="app">Cell App</span>
        </h1>
    </div>
</template>

<style scoped>
div{
    margin-top: 20%;
    margin-bottom: 30%;
    margin-left: 30%;
    margin-right: 30%;
    animation-name: rainbow;
    animation-duration: 5s; 
}
@keyframes rainbow {
  0%   {background-color: rgb(180, 96, 96);}
  25%  {background-color: rgb(233, 182, 105);}
  45%  {background-color: rgb(230, 230, 152);}
  50%  {background-color: rgb(106, 106, 214);}
  100% {background-color: #81C784;}
}
h1{
    font-size: 100%;
    color: #2196F3;
    font-style: italic;
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    text-shadow: rgb(20, 39, 100) 2px 2px 3px;
    border-left: 2px solid #000;      
    box-shadow: 2px 8px 16px 2px rgba(15, 15, 15, 0.6);
}
img{
    height: 200px;
    width: 200px; 
    margin-top: 10%;
    margin-bottom: 10%;
    margin-left: -15%;
    margin-right: 10%;
    animation-name: welcome;
    animation-duration: 4s;
    position: relative;
}
.app{ 
    font-size: 90%; 
    text-shadow: rgb(20, 39, 100) 1px 1px 1px;
    padding-left: 1%;
}

@keyframes welcome { 
  0%   {left:0px; top:0px;}
  25%  {left:60px; top:0px;}
  45%  {left:60px; top:100px;}
  50%  {left:10px; top:100px;}
  75%  {left:0px; top:10px;}
  100% {left:0px; top:0px;}
}
span{
    font-style: normal;
    font-size: 300%;
}
</style>