<template>
<div class="question">
  <p class="expression">
    {{init.intFirst}} {{init.operation}} 
    <span v-if="init.intSecond >= 0">{{ init.intSecond }}</span>
    <span v-else>( {{ init.intSecond }} )</span>
      = ?  
  </p>
  <hr>
  <div class="answer-options">
    <button class="answer-options_button"
    v-for="value in init.btn" :key="value"
    type="button"
    @click="reply($event, value)"
    >{{value}}</button>     
  </div>
</div>   
</template>

<script>
import {mapGetters} from 'vuex';
import utils from '@/utils/index';
export default {
  name: 'Qestion',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(['range', 'operation']),
    init(){
      let operations = ['+', '-', '*', '/'];
      let buttons = []; 
      let buttonValue = null;      
      let res = {
        intFirst: utils.randomInt(+(this.range.min), +(this.range.max)),
        intSecond: utils.randomInt(+(this.range.min), +(this.range.max)),
      };             
      if (this.operation != 'random') {
        res.operation = this.operation;
      }else{
        let ind = Math.floor(Math.random() * operations.length);         
        res.operation = operations[ind];         
      }
      switch (res.operation) {
        case '+':
          res.result = res.intFirst + res.intSecond;  
          break;
        case '-':
          res.result = res.intFirst - res.intSecond;  
          break;
        case '/':  
          let counterIterations = 0;                 
          while (res.intSecond === 0) {     
            if (counterIterations > 10) {
              break;
            }        
            res.intSecond = utils.randomInt(+this.range.min, +this.range.max); 
            counterIterations += 1;                                
          }
          if (res.intSecond != 0) {           
            let divisionResult = res.intFirst / res.intSecond;
            Number.isInteger(divisionResult) ? (res.result = divisionResult) : (res.result = divisionResult.toFixed(3));                     
          }else{
            res.result = 'infinity';
          }                
          break;
        case '*':
          res.result = res.intFirst * res.intSecond;  
          break;         
      }      
       
      if (res.operation != '/') { 
         buttons = [res.result];          
        for (let index = 0; buttons.length < 6; index++) {
          buttonValue = utils.randomInt((+res.result - 5), (+res.result + 5));
          if (buttons.indexOf(buttonValue) == -1) {
            buttons.push(buttonValue);           
          }                       
        }         
      }else{  
        if (res.result != 'infinity') {
          buttons = [res.result];
          for (let index = 0; buttons.length < 6; index++) {            
            if (Number.isInteger(res.result)) {
              buttonValue = utils.randomInt((+res.result - 5), (+res.result + 5));
            }else{
              buttonValue = utils.randomFloat((+res.result - 5), (+res.result + 5));
            }           
            if (buttons.indexOf(buttonValue) == -1) {
              buttons.push(buttonValue);           
            }                               
          } 
        }                   
      }
      let j = null;
      let temp = null;
      for(var i = buttons.length - 1; i > 0; i--){
        j = Math.floor(Math.random()*(i + 1));
        temp = buttons[j];
        buttons[j] = buttons[i];
        buttons[i] = temp;
      }
      res.btn = buttons;   
      
      this.$store.dispatch('operands', {one: res.intFirst, two: res.intSecond});
      this.$store.dispatch('operationTarget', res.operation);
      this.$store.dispatch('resultCalc', res.result);
       
      return res;
    }
  },
  methods:{
    reply(e, value){
      if (this.init.result == value) {
        this.$store.dispatch('result', 'success');
      }else{
        this.$store.dispatch('result', 'error');
      }
      this.$store.dispatch('component', 'message');       
    }
  }
}
</script>
 
<style scoped lang="scss">
.question{
  border-radius: 5px;
  padding: 10px;
  background-color: #E0E0E0;
}
.expression{
  font-size: 40px;
  padding: 10px 0;
}
.answer-options{
  padding: 20px 0;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  &_button{
    border: none;
    line-height: 1;
    background-color: green;
    color: #fff;
    padding: 8px 20px;
    border-radius: 5px;
    margin: 10px 5px 0 0;
    &:hover{
      cursor: pointer;  
      background-color: rgb(16, 100, 20);     
    }
  }
  &_button:last-child {
    margin: 10px 0 0 0;
  }
} 
</style>