<template>
  <transition name="modal">
    <div class="wrap_modal" @click="$emit('close')">
      <div class="container_modal">
        <div class="header_modal">
          <div class="title_modal">
            <slot name="header">Title</slot>
          </div>
        </div>
        <div class="main_modal">
          <div class="content_main_modal">
            <slot name="main">Main content of the modal window</slot>
          </div>
        </div>
        <div class="footer_modal">
          <button type="button" class="button_modal" @click="$emit('close')">
            <slot name="footer">Close</slot>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal'
}
</script>

<style scoped lang="scss">
.wrap_modal {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(127, 127, 127, .6);
  ;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
}

.container_modal {
  width: 394px;
  background: #ffff;
  border-radius: 2px;
}

.header_modal {
  padding: 15px 10px 16px 17px;
  border-bottom: 2px solid #ECEEF1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title_modal {
  font-size: 24px;
  line-height: 29px;
}

.main_modal {
  padding: 16px 10px 16px 17px;
  border-bottom: 2px solid #ECEEF1;
}

.content_main_modal {
  font-size: 16px;
  line-height: 24px;
  color: #4C4B4B;
}

.footer_modal {
  padding: 16px 16px 16px 16px;
}

.button_modal {
  border: none;
  font-size: 16px;
  line-height: 24px;
  display: block;
  outline: none;
  padding: 7px 19px 7px 19px;
  background: #EF5B4C;
  color: #fff;
  margin-left: auto;
  border-radius: 5px;
  transition: .1s;

  &:hover {
    cursor: pointer;
    background-color: #d24335;
  }
}

@media screen and(max-width: 410px) {
  .container_modal {
    width: 100%;
  }

  .wrap_modal {
    padding: 0 15px;
  }
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>