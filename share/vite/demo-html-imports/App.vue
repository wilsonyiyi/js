<template>
  <div>
    <span>count is: {{ count }}</span>
    <button @click="count++">click me</button>
  </div>
</template>

<script>
export default {
  data() {
    count: 0;
  },
};
</script>

<style></style>
