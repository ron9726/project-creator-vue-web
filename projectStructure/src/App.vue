<script setup lang="ts">
import { provide, ref } from 'vue';
import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN';
import 'dayjs/locale/zh-cn';
zh_CN;

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
const topLoading = ref(false);
const spinTip = ref();
function setLoadingStatusTo(value, msg?) {
  spinTip.value = msg;
  topLoading.value = value;
}
provide('loadingStatusSetter', setLoadingStatusTo);
</script>

<template>
  <a-config-provider :locale="zh_CN" :autoInsertSpaceInButton="false">
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <div class="alphaMask" v-if="topLoading">
      <a-spin :tip="spinTip" class="alphaSpin"></a-spin>
    </div>
  </a-config-provider>
</template>

<style lang="less">
::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 10px;
}
::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: @alpha-font-assist-1;
}

#app {
  height: 100%;
}

.alphaContainer {
  width: 100%;
  height: 100%;
  position: relative;
}

.alphaSearch {
  height: 80px;
  width: 100%;
  background-color: #ffffff;
  line-height: 80px;
  padding-left: 24px;
  border-radius: 8px;
  & > *:not(& > *:first-child) {
    margin-left: 8px;
  }
}

.alphaContent {
  height: calc(100% - 104px);
  width: 100%;
  margin-top: 16px;
  border-radius: 8px;
  background-color: #ffffff;
  padding: 24px 24px;
}

.alphaClearfix::after {
  display: block;
  content: '';
  clear: both;
}

.alphaOperationArea {
  width: 100%;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: #15192c;
  height: 32px;
  line-height: 32px;
  &::before {
    content: '';
    width: 4px;
    height: 18px;
    background: #2f54eb;
    border-radius: 8px;
    display: inline-block !important;
    vertical-align: middle;
  }
  .floatRight {
    float: right;
  }
  & > *:not(& > *:last-child) {
    //alphaOperationArea 中除了最后一个子元素的其他元素的左边距为8px; float的情况下，从左到右，左边第一个是文档中的最后一个浮动元素
    margin-left: 8px;
  }
}

.alphaFlexContainer {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  & > * {
    flex: 1;
    padding-right: 20px;
  }
}

.alphaCenter {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
}

.ant-table-wrapper .ant-btn {
  padding: 4px 6px !important;
}

.alphaActive {
  background-color: #f0f5ff;
}
.ant-collapse {
  border: none !important;
}

.unsetLineHeightFlag .ant-form-item-label-wrap {
  line-height: unset; //删除这个样式会出现表单label和它的值存在1px的高度差
}

.ant-input-textarea .ant-input {
  padding-right: 20px !important;
}

.alphaMask {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 1500;
  background-color: rgba(255, 255, 242, 0.2);
}
.alphaSpin {
  position: absolute !important;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.operationBtnContainer {
  & > *:not(& > *:first-child) {
    margin-left: 8px;
  }
}
</style>
