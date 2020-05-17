<template>
  <button @click="clickHandle">{{props.text}}</button>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  props: {text: String, a: String}, // 不定义setup中props取不到值，定义之后页面可以直接使用text
  setup (props, ctx) {
    const clickHandle = () => {
      ctx.emit('button-click')
    }
    console.log(props)
    return {
      props,
      clickHandle
    }
  }
})
</script>