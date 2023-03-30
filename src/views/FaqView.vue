<script setup lang="ts">
import { ref } from 'vue';
import Faq from '@/components/Faq.vue';

const count = ref(0);
const string = ref('adsa');
console.log(count);
console.log(string);

</script>
<template>
  <main>
    <Faq/>
  </main>
  
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
