<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 60 60"
    :width="width"
    :height="height"
    :class="{ animated }"
  >
    <defs>
      <clipPath id="a">
        <path
          d="M31 29c0-.55.45-1 1-1 3.41 0 5.28-5.26 5.83-10H22.17c.55 4.74 2.42 10 5.83 10 .55 0 1 .45 1 1v15h2V29z"
          fill="none"
        />
      </clipPath>
    </defs>
    <g clip-path="url(#a)">
      <path
        class="next-fill-effect"
        :stroke="color"
        :fill="color"
        d="M19 36h22v24H19z"
      />
    </g>
    <path
      :stroke="color"
      :fill="color"
      class="initial-fill"
      d="M30 33l3 2c3 2 4.45 4.26 5 9H22c.55-4.74 2-7 5-9l3-2z"
    />
    <path
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-miterlimit="10"
      d="M19 13v2c0 8 3 15 8 15-5 0-8 7-8 15v2M41 13v2c0 8-3 15-8 15 5 0 8 7 8 15v2"
    />
    <path
      fill="none"
      :stroke="color"
      stroke-width="2"
      stroke-linecap="square"
      stroke-miterlimit="10"
      d="M30 47h13v2h2v4H15v-4h2v-2h13M30 7H15v4h2v2h26v-2h2V7H30"
    />
  </svg>
</template>

<script>
export default {
  name: "Wait",
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
@keyframes flip {
  0% {
    transform: rotate(0deg) scale(0);
  }
  100% {
    transform: rotate(180deg) scale(1);
  }
}

@keyframes grow {
  0% {
    transform: scale(0);
  }
  30% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes flowOut {
  0% {
    transform: translateY(-53%);
  }
  100% {
    transform: translateY(0%);
  }
}

.initial-fill {
  transform-origin: 50% 80%;
}

svg {
  display: none;
}

svg.animated {
  display: inline-block;
  animation: flip 1s;
}
svg.animated .initial-fill {
  animation: grow 2s forwards;
  animation-delay: 1s;
}
svg.animated .next-fill-effect {
  animation: flowOut 1s linear;
  animation-delay: 1s;
}
</style>
