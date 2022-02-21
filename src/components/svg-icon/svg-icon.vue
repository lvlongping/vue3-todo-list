<template>
  <svg v-bind="$attrs" class="svg-icon" :style="getStyle" aria-hidden="true">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed, type CSSProperties } from 'vue';

  const props = defineProps({
    prefix: {
      type: String,
      default: 'svg-icon',
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [Number, String],
      default: 16,
    },
  });

  const symbolId = computed(() => `#${props.name}`);

  const getStyle = computed((): CSSProperties => {
    const { size } = props;
    const s = `${size}`.replace('px', '').concat('px');
    return {
      width: s,
      height: s,
    };
  });
</script>

<style lang="less">
  .svg-icon {
    width: 100%;
    height: 100%;
    overflow: hidden;
    vertical-align: -0.15em;
    fill: currentColor;
  }
</style>
