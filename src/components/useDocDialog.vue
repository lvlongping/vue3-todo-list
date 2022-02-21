<template>
  <a-modal v-model:visible="state.visible" title="使用文档" @ok="handleOk" @cancel="handleOk">
    <p>导出列表：导出todo列表为json文件，可在其它地点导入使用</p>
    <p>导入列表：导入使用导出列表功能导出的json文件，初始化todo列表</p>
    <p>同步上传：同步本地todo列表到服务器，并生成密钥</p>
    <p>同步下载：同步服务器todo列表到本地</p>
  </a-modal>
</template>
<script lang="ts" setup>
import {  onMounted, reactive, watch, defineProps } from "vue";
const props = defineProps({
  useDocVisble: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['close']);
const state = reactive({
  visible: false,
});
watch(
  () => props.useDocVisble,
  (cur) => {
    state.visible = cur;
  }
);
onMounted(() => {
  state.visible = props.useDocVisble;
});
const handleOk = ()=> {
  state.visible = false
  emit('close')
}
</script>
