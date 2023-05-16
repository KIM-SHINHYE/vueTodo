<template>
  <div class="about">
    <button id="auth" @click="showModal">권한 설정</button>
  </div>
</template>

<script setup lang="ts">
const showModal = () => {
  
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
