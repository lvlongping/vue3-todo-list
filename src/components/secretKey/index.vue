<template>
  <a-modal v-model:visible="state.visible" title="输入" @ok="handleOk" @cancel="handleOk">
    <div class="secret-wrapper">
      <span class="label">同步密钥</span>
      <a-input v-model:value="state.secretVal"></a-input>
    </div>
  </a-modal>
</template>
<script lang="ts" setup>
import {  onMounted, reactive, watch, defineProps } from "vue";
const props = defineProps({
  secretVisble: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['close']);
const state = reactive({
  visible: false,
  secretVal: ''
});
watch(
  () => props.secretVisble,
  (cur) => {
    state.visible = cur;
    console.log(cur)
  }
);
onMounted(() => {
  state.visible = props.secretVisble;
});
const handleOk = ()=> {
  state.visible = false
  emit('close')
}
</script>
<style lang="less" scoped>
.secret-wrapper {
  display: flex;
  align-items: center;
  .label {
    width: 100px;
  }
}

</style>
