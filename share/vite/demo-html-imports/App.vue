<template>
  <div>
    <span>date is: {{ date }}</span>
    <button @click="updateDate">更新时间</button>
  </div>
</template>

<script>
export default {
  data() {
    date: new Date().toTimeString();
  },
  methods: {
    updateDate() {
      this.date = new Date().toTimeString();
    },
  },
};
</script>

<style></style>
