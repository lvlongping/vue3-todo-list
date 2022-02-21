<template>
  <a-upload
    name="file"
    list-type="text"
    accept=".json"
    :multiple="false"
    :show-upload-list="false"
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    :headers="headers"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <slot></slot>
  </a-upload>
</template>
<script lang="ts" setup>
import { message } from 'ant-design-vue';
import { defineEmits } from 'vue'
const emit = defineEmits(['success']);
const headers = { authorization: 'application/json' }
const handleChange =(info: any) => {
      if (info.file.status === 'uploading') return
      if (info.file.status === 'done') {
        console.log(info)
      }
    }
const  beforeUpload = (file: any) => {
  const isJpgOrPng = file.type === 'application/json'
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt20M = file.size / 1024 / 1024 < 20;
  if (!isLt20M) {
    message.error('Image must smaller than 2MB!');
  }
  let reader = new FileReader();  
  reader.readAsText(file);  
  reader.onload = function (e) {
    
    // console.log(JSON.parse(e.target?.result)
    emit('success', e.target?.result)
  //  return e.target?.result
  }
  return isJpgOrPng && isLt20M;
}
</script>
