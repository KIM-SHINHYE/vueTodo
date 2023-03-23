<script setup lang="ts">
import { onActivated, onBeforeMount, onBeforeUnmount, onBeforeUpdate, onDeactivated, onMounted, onRenderTracked, onRenderTriggered, onServerPrefetch, onUnmounted, onUpdated, ref, type Ref } from 'vue';

let count:Ref<number> = ref(0);

function plus() {
  console.log('++++++Plus++++++')
  count.value++
}

function minus() {
  console.log('------Minus------')
  count.value--
}

console.log('Child 1> setup() => beforeCreated, created')

onBeforeMount(() => {
  console.log('Child 1> onBeforeMount')
})

onMounted(() => {
  console.log('Child 1> onMounted')
})

onBeforeUpdate(() => {
  console.log('Child 1> onBeforeUpdate')
})

onUpdated(() => {
  console.log('Child 1> onUpdated')
})

onBeforeUnmount(() => {
  console.log('Child 1> onBeforeUnmount')
})

onUnmounted(() => {
  console.log('Child 1> onUnmounted')
})

onRenderTracked(() => {
  console.log('Child 1> onRenderTracked')
})

onRenderTriggered(() => {
  console.log('Child 1> onRenderTriggered')
})

onActivated(() => {
  console.log('Child 1> onActivated')
})

onDeactivated(() => {
  console.log('Child 1> onDeactivated')
})

onServerPrefetch(() => {
  console.log('Child 1> onServerPrefetch')
})

</script>

<template>
  <div>
    <h3>Child Component1</h3>
    <div>
      <h3>{{ count }}</h3>
      <button @click="plus">+</button>
      <button @click="minus">-</button>
    </div>
  </div>
  
</template>

<style>

</style>