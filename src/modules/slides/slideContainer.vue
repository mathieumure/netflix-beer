<template>
  <div class="slide-container" @scroll="onScroll">
    <Slide
      :title="`netflixBeer-${slideId}`"
      v-for="slideId in nbSlides"
      :key="slideId"
      :dark="slideId % 2 === 0"
    />
  </div>
</template>

<script>
import Slide from "./slide";
import _debounce from "lodash/debounce";

export default {
  name: "slideContainer",
  components: { Slide },
  data() {
    return {
      nbSlides: 2
    };
  },
  computed: {
    slideWidth() {
      return this.$el.scrollWidth / this.nbSlides;
    }
  },
  mounted() {
    const middleSlideOffset = Math.floor(this.nbSlides / 2);
    this.$el.scrollTo(this.slideWidth * middleSlideOffset, 0);
  },
  methods: {
    onScroll() {
      this.onScrollEnd();
    },
    onScrollEnd: _debounce(function() {
      const currentSlideOffset = this.$el.scrollLeft % this.slideWidth;
      const halfSlideSize = this.slideWidth / 2;
      if (currentSlideOffset > halfSlideSize) {
        this.$el.scrollTo(
          this.$el.scrollLeft + this.slideWidth - currentSlideOffset,
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
  scroll-behavior: smooth;
}
</style>
