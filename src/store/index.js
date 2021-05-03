import { createStore } from 'vuex';

export default createStore({
  state: {
    operation: '+',
    range: {
      min: 0,
      max: 100
    },
    component: 'question',
    operands: {
      one: null,
      two: null
    },
    operationTarget: null,
    resultCalc: null,
    result: {
      success: 0,
      error: 0,
      message: true
    },
    totalQuestions: 5,
    youResults: []
  },
  getters: {
    operation(state){
      return state.operation;
    },
    range(state) {       
      return state.range;
    },
    component(state){
      return state.component;
    },
    operands(state){
      return state.operands;
    },
    operationTarget(state){
      return state.operationTarget;
    },
    resultCalc(state){
      return state.resultCalc;
    },
    result(state){
      return state.result;
    },
    totalQuestions(state){
      return state.totalQuestions;
    },
    youResults(state){
      return state.youResults;
    }
  },
  mutations: {
    operation(state, data) {
      state.operation = data;
    },
    range(state, data){
      if (data.hasOwnProperty('min')) {
        state.range.min = data.min;
      } else if (data.hasOwnProperty('max')) {
        state.range.max = data.max;
      }
    },
    operands(state, data){
      state.operands.one =  data.one;
      state.operands.two =  data.two;
    },
    operationTarget(state, data){
      state.operationTarget = data;
    },
    resultCalc(state, data){
      state.resultCalc = data;
    },
    component(state, data){
      state.component = data;
    },
    result(state, data){
      if (data == 'success') {
        state.result.success++;
        state.result.message = true;
      }else if(data == 'error'){
        state.result.error++;
        state.result.message = false;
      }
      if (data == 'reset') {
        state.result.success = 0;
        state.result.error = 0;
        state.result.message = true;
      }
    },
    youResults(state, data){
      state.youResults.push(data);
    }
  },
  actions: {
    operation({commit}, data) {
      commit('operation', data);
    },
    range({commit}, data) {
      commit('range', data);       
    },
    operands({commit}, data){
      commit('operands', data);
    },
    operationTarget({commit}, data){
      commit('operationTarget', data);
    },
    resultCalc({commit}, data){
      commit('resultCalc', data);
    },
    component({commit}, data){
      commit('component', data);
    },
    result({ commit }, data) {
      commit('result', data);
    },
    youResults({commit}, data){
      commit('youResults', data);
    }
  }   
})