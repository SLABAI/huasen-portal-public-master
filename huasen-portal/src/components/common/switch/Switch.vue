<template>
  <div class="h-switch">
    <input type="checkbox" @click="changeSwitch" :value="value" />
  </div>
</template>
<script>
export default {
  name: "HSwitch",
  data() {
    return {};
  },
  props: {
    value: {
      type: Boolean,
      default: ()=> {
        return false
      }
    }
  },
  methods: {
    changeSwitch() {
      this.$emit('update:value', !this.value)
      if(this.value) {
        this.$emit('onOpen', this.value)
      }else {
        this.$emit('onClose', this.value)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.h-switch {
  display: flex;
  align-items: center;
  input[type="checkbox"] {
    width: 40px;
    height: 20px;
    appearance: none;
    outline: none;
    border-radius: 20px;
    transition: 0.5s;
    transition-delay: 0.25s;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background-color: #c6c6c6;
    position: relative;
    cursor: pointer;
    &:checked[type="checkbox"] {
      background-color: #03a9f4;
    }
    &::before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      top: 0;
      left: 0;
      background-color: #fff;
      transform: scale(0.8);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: 0.5s;
    }
    &:checked[type="checkbox"]::before {
      left: 20px;
    }
  }
}
</style>