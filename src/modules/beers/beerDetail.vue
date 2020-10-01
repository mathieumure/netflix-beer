<template>
  <div class="beer-detail">
    <h3>{{ detail.date.format("MMMM YYYY") }}</h3>
    <p v-if="detail.isDone">
      Paid the {{ detail.date.format("MMMM YYYY") }} at {{ "Hopstore" }}
    </p>
    <p v-else-if="detail.isWait">
      Waiting for Mathieu to approve
    </p>
    <div v-else>
      <p>
        Not paid
      </p>
      <input type="text" placeholder="Location" />
      <button type="button">Beer paid</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "beerDetail",
  props: { detail: { type: Object, required: true } },
  mounted() {
    this.$styleVariables.applyTheme("dark", ".beer-detail");
  }
};
</script>

<style scoped>
.beer-detail {
  background-color: var(--primaryColor);
  color: var(--textColor);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h3 {
  font-size: 3rem;
}

p {
  font-size: 1.5rem;
  margin-top: 50px;
  margin-right: 70px;
  margin-left: 70px;
}
</style>
