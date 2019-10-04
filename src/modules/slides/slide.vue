<template>
  <div class="slide">
    <img src="../../assets/netflix-beer.png" alt="netflix-beer" />
    <h1>{{ title }}</h1>
    <div class="slide-description">
      <Done :color="color" :visible="!scrolling" />
      <No :color="color" :visible="!scrolling" />
      <Wait :color="color" :visible="!scrolling" />
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import _capitalize from "lodash/capitalize";
import Done from "../icons/Done";
import No from "../icons/No";
import Wait from "../icons/Wait";
export default {
  name: "slide",
  components: { Wait, No, Done },
  props: {
    data: {
      type: Object,
      required: true
    },
    even: {
      type: Boolean,
      default: false
    },
    scrolling: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    title() {
      return _capitalize(dayjs(this.data.month, "YYYY-MM").format("MMMM YYYY"));
    },
    theme() {
      return this.even ? "dark" : "light";
    },
    paymentInfo() {
      return this.data.paymentInfo;
    },
    color() {
      return this.$styleVariables.colors(this.theme).textColor;
    }
  },
  mounted() {
    this.$styleVariables.applyTheme(this.theme, this.$el);
  },
  watch: {
    dark() {
      if (!this.$el) {
        return null;
      }
      this.$styleVariables.applyTheme(this.theme, this.$el);
    }
  }
};
</script>

<style scoped>
.slide {
  flex: 0 0 100%;
  background-color: var(--primaryColor);
  color: var(--textColor);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.slide-dark {
  background-color: var(--secondaryColor);
  color: var(--tertiaryColor);
}

img {
  max-width: 100%;
  height: auto;
  flex-grow: 0;
  flex-shrink: 0;
}

h1 {
  font-size: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}

.slide-description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
</style>
