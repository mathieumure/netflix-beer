<template>
  <main class="beers-wrapper">
    <button type="button" class="left-slide-btn slide-btn" @click="slideLeft">
      &lt;
    </button>
    <button
      type="button"
      class="up-slide-btn slide-btn"
      :class="{ hidden: !detailDisplayed }"
      @click="toggleDetailDisplay"
    >
      ↑
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
    <BeerDetail
      class="beer-detail"
      :detail="slides[currentSlide]"
      :class="{ 'beer-detail--displayed': detailDisplayed }"
    />
    <button type="button" class="right-slide-btn slide-btn" @click="slideRight">
      &gt;
    </button>
    <button
      type="button"
      class="bottom-slide-btn slide-btn"
      :class="{ hidden: detailDisplayed }"
      @click="toggleDetailDisplay"
    >
      ↓
    </button>
  </main>
</template>
<script>
import Beer from "./beer";
import dayjs from "dayjs";
import BeerDetail from "./beerDetail";
import { firestore } from "../../firebase";
import _ from "lodash";

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
  components: { BeerDetail, Beer },
  data: () => ({
    slides: [createSlide(-1, 1), createSlide(0, 0), createSlide(1)],
    currentSlide: 1,
    withAnimation: true,
    detailDisplayed: false,
    payments: []
  }),
  firestore: {
    payments: firestore.collection("payments")
  },
  mounted() {
    window.addEventListener("keydown", this.handleKeyEvent.bind(this));
  },
  destroyed() {
    window.removeEventListener("keydown", this.handleKeyEvent);
  },
  computed: {
    translateAmount() {
      const translateY = this.detailDisplayed ? -100 : 0;
      return (
        "translateX(" +
        this.currentSlide * -100 +
        "%) translateY(" +
        translateY +
        "%)"
      );
    },
    nbSlides() {
      return this.slides.length;
    },
    paymentsByMonth() {
      return _.keyBy(this.payments, "month");
    }
  },
  watch: {
    detailDisplayed() {
      const currentTheme = this.detailDisplayed ? "dark" : "light";
      this.$styleVariables.applyTheme(currentTheme, ".slide-btn");
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
      if ($event.key === "ArrowDown") {
        this.displayDetail();
      }
      if ($event.key === "ArrowUp") {
        this.hideDetail();
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
    displayDetail() {
      this.withAnimation = true;
      this.detailDisplayed = true;
    },
    hideDetail() {
      this.withAnimation = true;
      this.detailDisplayed = false;
    },
    toggleDetailDisplay() {
      this.withAnimation = true;
      this.detailDisplayed = !this.detailDisplayed;
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
@keyframes fadeOut {
  from {
    opacity: 1;
    visibility: visible;
  }
  to {
    opacity: 0;
    visibility: hidden;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
}

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

  font-size: 4rem;
  font-weight: bold;
  cursor: pointer;
  color: var(--textColor);
}

.left-slide-btn {
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  z-index: 10;
  margin-left: 30px;
}

.right-slide-btn {
  top: 50%;
  transform: translateY(-50%);
  right: 0;
  margin-right: 30px;
}

.bottom-slide-btn {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.up-slide-btn {
  z-index: 1;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.hidden {
  animation: fadeOut 0.3s forwards;
}

.beer-detail {
  height: 100%;
  width: 100%;
  transition: transform 0.3s;
}
.beer-detail--displayed {
  transform: translateY(-100%);
}
</style>
