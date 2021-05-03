<template>
<div class="result">
  <p class="result_text">Верно: {{result.success}}</p>
  <p class="result_text">Неверно: {{result.error}}</p>
  <hr>
  <button class="result_button" type="button" @click="btnClick">Продолжить</button>
</div>     
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: 'Result',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(['result'])
  },
  methods:{
    btnClick(e){
      this.$store.dispatch('result', 'reset');
      this.$store.dispatch('component', 'question');
    }
  }
}
</script>
 
<style scoped lang="scss">
.result{
  border-radius: 5px;
  padding: 10px;
  background-color: #e88565;   
}
.result_text{   
  font-size: 40px;
}
.result_button{
  border: none;
  line-height: 1;   
  padding: 8px;
  border-radius: 5px;
  margin: 20px 0;  
  background-color: #fff; 
  &:hover{
    cursor: pointer; 
    background-color: #fff;    
  }
} 
</style>