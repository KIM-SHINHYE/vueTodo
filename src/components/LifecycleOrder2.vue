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

console.log('Child 2> setup() => beforeCreated, created')

onBeforeMount(() => {
  console.log('Child 2> onBeforeMount')
})

onMounted(() => {
  console.log('Child 2> onMounted')
})

onBeforeUpdate(() => {
  console.log('Child 2> onBeforeUpdate')
})

onUpdated(() => {
  console.log('Child 2> onUpdated')
})

onBeforeUnmount(() => {
  console.log('Child 2> onBeforeUnmount')
})

onUnmounted(() => {
  console.log('Child 2> onUnmounted')
})

onRenderTracked(() => {
  console.log('Child 2> onRenderTracked')
})

onRenderTriggered(() => {
  console.log('Child 2> onRenderTriggered')
})

onActivated(() => {
  console.log('Child 2> onActivated')
})

onDeactivated(() => {
  console.log('Child 2> onDeactivated')
})

onServerPrefetch(() => {
  console.log('Child 2> onServerPrefetch')
})

</script>

<template>
  <div>
    <h3>Child Component2</h3>
    <div>
      <h3>{{ count }}</h3>
      <button @click="plus">+</button>
      <button @click="minus">-</button>
    </div>
  </div>
  
</template>

<style>

</style>