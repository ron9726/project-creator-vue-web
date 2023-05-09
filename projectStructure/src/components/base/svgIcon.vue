<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

interface SvgIcon {
  iconClass: string;
  className?: string;
}

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true,
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props: SvgIcon) {
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => `svg-icon ${props.className}`);
    return {
      iconName,
      svgClass,
    };
  },
});
</script>

<style lang="less" scoped>
.svg-icon {
  position: relative;
  width: 16px;
  height: 16px;
  vertical-align: -0.2em;
  fill: currentColor;
  overflow: hidden;
  // color: rgba(89,89,89,1);

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    pointer-events: none;
    cursor: pointer;
    z-index: 1;
  }
}
</style>
