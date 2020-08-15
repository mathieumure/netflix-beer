<template>
  <main class="beers-wrapper">
    <button type="button" class="left-slide-btn slide-btn" @click="slideLeft">
      &lt;
    </button>
    <div
      class="beers-sliders"
      :style="{ transform: translateAmount }"
      :class="{ 'beers-sliders--animated': withAnimation }"
    >
      <Beer
        v-for="beer in slides"
        :key="beer.id"
        class="beer"
        :title="getDateLabel(beer.date)"
        :is-done="beer.isDone"
        :is-wait="beer.isWait"
      />
    </div>
    <button type="button" class="right-slide-btn slide-btn" @click="slideRight">
      &gt;
    </button>
  </main>
</template>
<script>
import Beer from "./beer";
import dayjs from "dayjs";

window.dayjs = dayjs;

const createDate = nbMonth => {
  return dayjs().add(nbMonth, "month");
};

const createSlide = (delta, status) => ({
  id: delta,
  delta,
  date: createDate(delta),
  isDone: status === 1,
  isWait: status === 0
});

export default {
  name: "NewBeers",
  components: { Beer },
  data: () => ({
    slides: [createSlide(-1, 1), createSlide(0, 0), createSlide(1)],
    currentSlide: 1,
    withAnimation: true
  }),
  mounted() {
    window.addEventListener("keydown", this.handleKeyEvent.bind(this));
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleKeyEvent);
  },
  computed: {
    translateAmount() {
      return "translateX(" + this.currentSlide * -100 + "%)";
    },
    nbSlides() {
      return this.slides.length;
    }
  },
  methods: {
    handleKeyEvent($event) {
      if ($event.key === "ArrowRight") {
        this.slideRight();
      }
      if ($event.key === "ArrowLeft") {
        this.slideLeft();
      }
      if ($event.key === "b") {
        this.insertSlideBefore();
      }
      if ($event.key === "a") {
        this.appendSlideAfter();
      }
    },
    slideLeft() {
      this.withAnimation = true;
      const nextSlide = this.currentSlide - 1;
      if (nextSlide >= 0) {
        this.currentSlide = nextSlide;
        if (nextSlide === 0) {
          setTimeout(this.insertSlideBefore, 300);
        }
      }
    },
    slideRight() {
      this.withAnimation = true;
      const nextSlide = this.currentSlide + 1;
      if (nextSlide < this.nbSlides) {
        this.currentSlide = nextSlide;
        if (nextSlide === this.nbSlides - 1) {
          setTimeout(this.appendSlideAfter, 300);
        }
      }
    },
    insertSlideBefore() {
      const nextDelta = this.slides[0].delta - 1;
      this.$set(this, "slides", [createSlide(nextDelta), ...this.slides]);
      this.withAnimation = false;
      this.currentSlide++;
    },
    appendSlideAfter() {
      const lastSlide = this.slides.slice(-1)[0];
      const nextDelta = lastSlide.delta + 1;

      this.slides.push(createSlide(nextDelta));
    },
    getDateLabel(date) {
      return date.format("MMM YYYY");
    }
  }
};
</script>
<style scoped>
.beers-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.beers-sliders {
  display: flex;
  flex-direction: row;
  height: 100%;
}

.beers-sliders--animated {
  transition: transform 0.3s;
}

.beer {
  width: 100%;
  flex-shrink: 0;
}

.slide-btn {
  background-color: transparent;
  border: none;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  font-size: 4rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--textColor);
}

.left-slide-btn {
  left: 0;
  z-index: 10;
  margin-left: 30px;
}

.right-slide-btn {
  right: 0;
  margin-right: 30px;
}
</style>
