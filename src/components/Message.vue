<template>
  <div class="message" :class="bg">
    <p class="message_sucсsess" v-if="result.message">The answer is correct!</p>

    <div class="message_error" v-else>
      <p>Your answer is not correct!</p>
      <p>Correct answer:</p>
      <div>
        {{ operands.one }} {{ operationTarget }}
        <span v-if="operands.two >= 0">{{ operands.two }}</span>
        <span v-else>( {{ operands.two }} )</span>
        = {{ resultCalc }}
      </div>
    </div>

    <hr>
    
    <button class="message_button" type="button" @click="btnClick">Continue</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Message',
  props: {
    msg: String
  },
  computed: {
    ...mapGetters(['operands', 'operation', 'range', 'operationTarget', 'resultCalc', 'result', 'totalQuestions']),
    bg() {
      let cl = '';
      this.result.message ? cl = '' : cl = 'message--bg-js';
      return cl;
    }
  },
  methods: {
    btnClick(e) {
      let countQuestions = this.result.success + this.result.error;
      if (countQuestions >= this.totalQuestions) {
        let res = {
          'operation': this.operation,
          'range': `${this.range.min} - ${this.range.max}`,
          'success': this.result.success,
          'errors': this.result.error
        }
        this.$store.dispatch('youResults', res);
        this.$store.dispatch('component', 'result');
      } else {
        this.$store.dispatch('component', 'question');
      }
    }
  }
}
</script>

<style scoped lang="scss">
.message {
  border-radius: 5px;
  padding: 10px;
  background-color: #98C1AE;
  text-align: center;

  &--bg-js {
    background-color: #c39d63;
  }
}

.message_sucсsess,
.message_error {
  padding: 10px 0;
  font-size: 40px;
}

.message_button {
  border: none;
  line-height: 1;
  background-color: #0075ff;
  color: #fff;
  padding: 8px;
  border-radius: 5px;
  margin: 20px 0;

  &:hover {
    cursor: pointer;
    background-color: #2600ff;
  }
}
</style>