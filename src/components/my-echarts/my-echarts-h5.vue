<template>
    <div id="maychar" :style="{width, height}"></div>
</template>
   
<script lang="ts" setup>
import { ref, onMounted, watch, markRaw } from "vue"; // 主要  
import echarts from '@/utils/echarts.ts';
// 该组件目前仅支持h5/app端,暂不支持微信小程序
const echartsData = ref<any>()
const props = defineProps({
    isDark: {
        type: Boolean,
        default: false
    },
    data: {
        type: Object,
        default: () => {}
    },
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '100%'
    }
})
let timer:any = null
onMounted(() => {
    echartsData.value = markRaw(echarts.init(document.getElementById("maychar"), (props.isDark ? 'dark' : '')));
    window.addEventListener("resize", () => {
        clearTimeout(timer)
        timer = setTimeout(() => {
            echartsData.value?.resize();   
        }, 500)
    })
    getEcarts()
})
watch(():object => props.data, ()=> {
    getEcarts()
}, {deep: true})
const getEcarts = () => {
    echartsData.value.clear()
    echartsData.value.setOption(props.data)
}
</script>

<style lang="scss" scoped>
</style>