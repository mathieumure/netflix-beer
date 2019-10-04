<template>
  <div
    class="slide-container"
    :class="{ 'slide-container-smooth': afterMounted }"
    @scroll="onScroll"
  >
    <Slide
      :data="slideData"
      v-for="(slideData, id) in slides"
      :key="slideData.id"
      :even="id % 2 === 0"
      :scrolling="scrolling"
    />
  </div>
</template>

<script>
import Slide from "./slide";
import _debounce from "lodash/debounce";

export default {
  name: "slideContainer",
  components: { Slide },
  props: {
    slides: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      afterMounted: false,
      scrolling: false,
      INTERNAL_resizeListener: null
    };
  },
  computed: {
    nbSlides() {
      return this.slides.length;
    }
  },
  mounted() {
    const middleSlideOffset = Math.floor(this.nbSlides / 2);
    const slideWidth = this.$el.scrollWidth / this.nbSlides;
    this.$el.scrollTo(slideWidth * middleSlideOffset, 0);
    this.afterMounted = true;
    this.INTERNAL_resizeListener = window.addEventListener(
      "resize",
      this.onScrollEnd
    );
  },
  destroyed() {
    window.removeEventListener("resize", this.INTERNAL_resizeListener);
  },
  methods: {
    onScroll() {
      this.scrolling = true;
      this.onScrollEnd();
    },
    onScrollEnd: _debounce(function() {
      const slideWidth = this.$el.scrollWidth / this.nbSlides;
      this.scrolling = false;
      const currentSlideOffset = this.$el.scrollLeft % slideWidth;
      const halfSlideSize = slideWidth / 2;
      if (currentSlideOffset > halfSlideSize) {
        this.$el.scrollTo(
          this.$el.scrollLeft + slideWidth - currentSlideOffset,
          0
        );
      } else {
        this.$el.scrollTo(this.$el.scrollLeft - currentSlideOffset, 0);
      }
    }, 300)
  }
};
</script>

<style scoped>
.slide-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: scroll;
}

.slide-container-smooth {
  scroll-behavior: smooth;
}
</style>
