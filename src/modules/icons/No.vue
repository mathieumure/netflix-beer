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
    />
    <path
      class="cross"
      :class="{ animated }"
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="square"
      stroke-miterlimit="10"
      d="M23 23l14 14M37 23L23 37"
    />
  </svg>
</template>
<script>
export default {
  name: "No",
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
@keyframes bounceIn {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.circle {
  transform-origin: center center;
  transform: scale(0);
}

.cross {
  transform-origin: center center;
  transform: scale(0);
}

.circle.animated {
  animation: bounceIn 0.4s linear forwards;
}

.cross.animated {
  animation: bounceIn 0.2s linear forwards;
  animation-delay: 0.2s;
}
</style>
