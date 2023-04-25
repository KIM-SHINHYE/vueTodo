import { defineStore } from 'pinia'
import { type Ref, ref } from 'vue'

type Content = {
  id: number
  title: string
  content: string
  writer: string
  regDate: string
}

export const useStore = defineStore('boardStore', () => {
  // content하나만 가지고 업데이트 할거니까
  let updateContent: Ref<Content> = ref({
    id: 0,
    title: '',
    content: '',
    writer: '',
    regDate: ''
  })

  const propContent = (content: Content) => {
    updateContent.value = content
  }
  
  return { updateContent, propContent }
})
