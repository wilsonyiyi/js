<template>
  <div>
    <h1>测试css样式的解析</h1>
    <br />
    <span>date is: {{ date }}</span>
    <button @click="updateDate">更新时间</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date().toTimeString(),
    };
  },
  methods: {
    updateDate() {
      this.date = new Date().toTimeString();
    },
  },
};
</script>

<style></style>
