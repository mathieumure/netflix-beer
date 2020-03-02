<template>
  <div class="slide">
    <img src="../../assets/netflix-beer.png" alt="netflix-beer" />
    <h1>{{ title }}</h1>
    <div class="slide-description">
      <button type="button" class="empty" @click="toggleDetail">
        <Done :color="color" :visible="!scrolling" v-if="isDone" />
        <Wait :color="color" :visible="!scrolling" v-else-if="isWait" />
        <No :color="color" :visible="!scrolling" v-else />
      </button>
      <div class="slide-details" v-if="displayDetail && !scrolling">
        <div
          v-for="detail in data.paymentInfo"
          :key="detail.id"
          class="slide-detail"
        >
          <Done
            :color="color"
            :visible="displayDetail && !scrolling"
            v-if="detail.accepted"
          />
          <No :color="color" :visible="displayDetail && !scrolling" v-else />
          {{ detail.id }}
          <div class="spacer"></div>
          <button type="button">CTA</button>
        </div>
      </div>
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
  data: () => ({
    displayDetail: false
  }),
  computed: {
    title() {
      return _capitalize(dayjs(this.data.month, "YYYY-MM").format("MMMM YYYY"));
    },
    theme() {
      return this.even ? "dark" : "light";
    },
    isDone() {
      return this.data.paymentInfo.every(it => it.accepted);
    },
    isWait() {
      return this.data.paymentInfo.findIndex(it => it.accepted) !== -1;
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
  },
  methods: {
    toggleDetail() {
      this.displayDetail = !this.displayDetail;
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
  min-height: 300px;
  min-width: 80vw;
}

.slide-details {
  border: solid 1px;
  border-radius: 12px;
  padding: 13px;
  width: 100%;
}

.slide-detail {
  display: flex;
  align-items: center;
}
.slide-detail svg {
  height: 50px;
  width: 50px;
  margin-right: 20px;
}

.empty {
  background: none;
  border: none;
  cursor: pointer;
}
.spacer {
  flex-grow: 1;
}
</style>
