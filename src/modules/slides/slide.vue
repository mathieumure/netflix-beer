<template>
  <div class="slide" :class="{ 'slide-dark': dark }">
    <img src="../../assets/netflix-beer.png" alt="netflix-beer" />
    <h1>{{ title }}</h1>
  </div>
</template>

<script>
export default {
  name: "slide",
  props: {
    title: String,
    dark: {
      type: Boolean,
      default: false
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
</style>
