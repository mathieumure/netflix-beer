<template>
  <section>
    <img src="../../assets/netflix-beer.png" alt="netflix-beer" />
    <h2>{{ title }}</h2>
    <Done v-if="isDone" />
    <Wait v-else-if="isWait" />
    <No v-else />
  </section>
</template>
<script>
import Done from "../icons/Done";
import Wait from "../icons/Wait";
import No from "../icons/No";

export default {
  name: "beer",
  components: { Done, Wait, No },
  props: {
    title: {
      type: String,
      required: true
    },
    isDone: {
      type: Boolean,
      default: false
    },
    isWait: {
      type: Boolean,
      default: false
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
