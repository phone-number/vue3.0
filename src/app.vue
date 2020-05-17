<template>
<!-- vue3.0支持代码碎片 -->
  <div> {{title}} </div>
  <div>{{name + '-----' + age}}</div>
  <div>{{outher.name + '-----' + outher.age}}</div>
  <div ref="devRef">{{count}}</div>
  <div>{{'两倍的count' + '----' + doubleCount}}</div>
  <div>{{ `x= ${mousePosition.x}    y=${mousePosition.y}` }}</div>
  <button @click="add">自增</button>
  <Button @button-click="buttonClick" text="Buton组件" :a="title" />
</template>

<script>
import { defineComponent, ref, reactive, toRefs, nextTick, onMounted, computed, onUnmounted } from 'vue'
import Button from '_c/button.vue'
function moveHandler() {
  const state = reactive({x: 0, y: 0})
  const move = (e) => {
    state.x = e.pageX
    state.y = e.pageY
  }
  onMounted(() => {
    window.addEventListener('mousemove', move)
  })
  onUnmounted(() => {
    window.removeEventListener('mousemove', move)
  })
  return {
    ...toRefs(state)
  }
}

export default defineComponent({
  components: {
    Button
  },
  setup () {
    let count = ref(0)
    let doubleCount = computed(() => count.value * 2)
    let devRef = ref() // dom元素的ref使用
    let outher = reactive({
      age: 18,
      name: 'wzl'
    })
    const add = async () => {
      count.value ++
      outher.age++
      await nextTick()
      console.log(devRef.value.innerText)

    }
    const mousePosition =  moveHandler()
    onMounted (() => {
      console.log('挂载结束生命周期')
    })

    const buttonClick = () => {
      console.log('Button组件自定义事件')
    }
    // 返回值中的成员可以在template中使用
    return {
      title: 'Vue.js 3.0',
      devRef,
      add,
      count,
      doubleCount,
      outher,
      mousePosition,
      buttonClick,
      ...toRefs(outher)
    }
  }
})
</script>

<style>
div {
  color: blue;
}
</style>