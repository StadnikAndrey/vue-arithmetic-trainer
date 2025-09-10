<template>
  <div class="wrap">
    <div class="sidebar">
      <section class="sidebar_section">
        <h3 class="sidebar_section-title">Arithmetic operations:</h3>
        <form class="operations-form">
          <div class="form-row" v-for="(value, index) in operations" :key="index">
            <input class="form-row_input" type="radio" :value="value" name="op[]" :checked="operation === value"
              @change="changeOperation">
            <label for="">{{ value }}</label>
          </div>
        </form>
      </section>
      <section class="sidebar_section">
        <h3 class="sidebar_section-title">Range of numbers:</h3>
        <form class="range">
          <div class="range_row">
            <label class="range_label" for="">From</label>
            <input class="range_input" name="min" type="number" inputmode="numeric" pattern="[0-9]*" :value="range.min"
              @input="inputRange">
          </div>
          <div class="range_row">
            <label class="range_label" for="">To</label>
            <input class="range_input" name="max" type="number" inputmode="numeric" pattern="[0-9]*" :value="range.max"
              @input="inputRange">
          </div>
        </form>
      </section>
      <section class="sidebar_section" v-if="youResults.length > 0">
        <h3 class="result-title" @click="showModal = true">Your results</h3>
      </section>
    </div>
    <div class="content">
      <div class="progressbar">
        <div class="progressbar_content" :style="progress"></div>
      </div>
      <transition name="fade" mode="out-in">
        <Question v-if="component == 'question'" />
        <Message v-else-if="component == 'message'" />
        <Result v-else-if="component == 'result'" />
      </transition>
    </div>
    <Modal v-if="showModal" @close="showModal = false">
      <template v-slot:header>
        <p>Results table</p>
      </template>
      <template v-slot:main>
        <table class="table-results">
          <thead>
            <tr class="table-results__tr-va-top">
              <td>
                <p>Arithmetic operation</p>
              </td>
              <td>
                <p>Range of numbers</p>
              </td>
              <td>
                <p>Correct answers</p>
              </td>
              <td>
                <p>No correct answers</p>
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(obj, ind) in youResults" :key="ind">
              <td v-for="value in obj" :key="value">
                <p>{{ value }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </template>
    </Modal>
  </div>
</template>

<script>
import Question from '@/components/Question.vue';
import Message from '@/components/Message.vue';
import Result from '@/components/Result.vue';
import Modal from '@/components/Modal.vue';
import { mapGetters } from 'vuex';
export default {
  components: {
    Question,
    Message,
    Result,
    Modal
  },
  data() {
    return {
      operations: ['+', '-', '*', '/', 'random'],
      showModal: false
    }
  },
  computed: {
    ...mapGetters(['operation', 'range', 'component', 'youResults', 'totalQuestions', 'result']),
    progress() {
      let wh = ((+(this.result.success) + +(this.result.error)) / +(this.totalQuestions)) * 100 + '%';
      return { width: wh };
    }
  },
  methods: {
    changeOperation(e) {
      this.$store.dispatch('result', 'reset');
      this.$store.dispatch('component', 'question');
      this.$store.dispatch('operation', e.target.value);
    },
    inputRange(e) {
      if (e.target.getAttribute('name') == 'min') {
        this.$store.dispatch('range', { min: e.target.value });
      } else if (e.target.getAttribute('name') == 'max') {
        this.$store.dispatch('range', { max: e.target.value });
      }
      this.$store.dispatch('result', 'reset');
      this.$store.dispatch('component', 'question');
    }
  }
}
</script>

<style lang="scss">
@import url('./assets/css/reset.scss');

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.wrap {
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.sidebar {
  width: 100%;
  max-width: 300px;
  box-shadow: 0px 0px 5px 0px #c8c6c6;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin: 0 20px 0 0;
  padding: 10px;

  &_section {
    margin: 0 0 20px 0;
  }

  &_section-title {
    padding: 0 0 15px 0;
  }
}

.form-row {
  margin: 0 0 8px 0;
  display: flex;
  align-items: center;

  &_input {
    margin: 0 10px 0 0;

    &:hover {
      cursor: pointer;
    }
  }
}

.range {
  width: 100%;
  display: flex;
  justify-content: space-between;

  &_row {
    width: 48%;
  }

  &_label {
    display: block;
    padding: 0 0 5px 0;
  }

  &_input {
    width: 100%;
  }
}

.result-title {
  font-size: 14px;
  text-transform: uppercase;
  color: #97B8A3;

  &::before {
    content: '';
    display: block;
    width: 30%;
    height: 1px;
    background-color: #97B8A3;
    margin: 0 0 10px 0;
  }

  &:hover {
    cursor: pointer;
  }
}

.content {
  flex: 1;
  box-shadow: 0px 0px 5px 0px #c8c6c6;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  padding: 10px;
}

.progressbar {
  height: 15px;
  background-color: #c8c6c6;
  border-radius: 5px;
  overflow: hidden;
  margin: 0 0 20px 0;

  &_content {
    background-color: #0075ff;
    width: 0;
    height: 100%;
    transition: width .5s;
  }
}

.table-results {
  width: 100%;
  border-collapse: collapse;

  & thead {
    font-weight: bold;
  }

  & tbody {
    & p {
      word-break: break-all;
    }
  }

  & td {
    border: 1px solid;
    padding: 5px 7px;
  }

  &__tr-va-top {
    vertical-align: top;
  }
}

.fade-enter-active {
  animation: from .2s linear;
}

.fade-leave-active {
  animation: to .2s linear;
}

@keyframes from {
  from {
    transform: rotateX(90deg)
  }

  to {
    transform: rotateX(0deg)
  }
}

@keyframes to {
  from {
    transform: rotateX(0deg)
  }

  to {
    transform: rotateX(90deg)
  }
}

@media screen and (max-width: 700px) {
  .sidebar {
    max-width: 215px;
  }
}

@media screen and (max-width: 580px) {
  .wrap {
    display: block;
  }

  .sidebar {
    max-width: 100%;
    margin: 0 0 20px 0;
  }

  .operations-form {
    display: flex;
    justify-content: space-between;
  }
}

@media screen and (max-width: 400px) {
  .table-results {
    table-layout: fixed;

    & thead {
      & p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    & td {
      border: 1px solid;
      padding: 5px 7px;
    }
  }
}
</style>