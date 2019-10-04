<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    :width="width"
    :height="height"
  >
    <circle
      class="circle"
      :class="{ animated }"
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="square"
      stroke-miterlimit="10"
      cx="30"
      cy="30"
      r="23"
    ></circle>
    <polyline
      class="check"
      :class="{ animated }"
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="square"
      stroke-miterlimit="10"
      points="20,29 28,37 42,23"
    ></polyline>
  </svg>
</template>

<script>
export default {
  name: "done",
  props: {
    color: {
      type: String,
      default: "black"
    },
    width: {
      type: String,
      default: "100px"
    },
    height: {
      type: String,
      default: "100px"
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    animated() {
      return this.visible;
    }
  }
};
</script>

<style scoped>
.circle {
  stroke-dasharray: 200;
  stroke-dashoffset: 200;
  transform: rotate(-45deg);
  transform-origin: center center;
}

.circle.animated {
  transition: all ease 0.4s;
  transition-delay: 0.4s;
  stroke-dashoffset: 0;
}

.check {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
}

.check.animated {
  transition: all ease 0.8s;
  stroke-dashoffset: 0;
}
</style>
