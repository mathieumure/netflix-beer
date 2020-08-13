<template>
  <section>
    <img src="../../assets/netflix-beer.png" alt="netflix-beer" />
    <h2>{{ title }}</h2>
  </section>
</template>
<script>
export default {
  name: "beer",
  props: {
    title: {
      type: String,
      required: true
    }
  }
};
</script>
<style>
body {
  background-color: var(--secondaryColor);
}
</style>
<style scoped>
section {
  height: 100%;
  width: 100%;
  background-color: var(--primaryColor);
  color: var(--textColor);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h2 {
  font-size: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
