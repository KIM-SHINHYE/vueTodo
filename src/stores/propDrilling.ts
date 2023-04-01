import { defineStore } from "pinia";
import { computed, ref, type Ref } from "vue";

export const usePropDrillingStore = defineStore('usePropDrillingStore', () => {
  let storeMessage:Ref<string> = ref('');

  const putMessage = (msg : string) => {
    storeMessage.value = msg;
  }
  const storeMsg = computed(() => storeMessage.value);

  return {storeMsg, putMessage};
})