<script setup lang="ts">

</script>

<template>
  <!-- name을 붙이지않으면 부모 컴포넌트에서 default로 주면 됨 -->
  
  <div>
    <slot name="child-header"></slot>
    <slot></slot>
    <slot name="child-footer"></slot>
    <slot name="left-button"></slot>
    <slot name="right-button"></slot>
  </div>

  
</template>
