<template>
  <div class="alphaContainer">
    <div class="alphaSearch">
      <Search>
        <a-form-item label="test">
          <a-input placeholder="test placeholder" />
        </a-form-item>
        <a-form-item label="test">
          <a-input placeholder="test placeholder" />
        </a-form-item>
        <a-form-item label="test">
          <a-input placeholder="test placeholder" />
        </a-form-item>
        <a-form-item label="test">
          <a-input placeholder="test placeholder" />
        </a-form-item>
        <a-form-item label="test">
          <a-input placeholder="test placeholder" />
        </a-form-item>
        <a-form-item label="test">
          <a-input style="width: 350px" placeholder="test placeholder" />
        </a-form-item>
        <a-form-item label="test">
          <a-input style="width: 350px" placeholder="test placeholder" />
        </a-form-item>
        <a-form-item label="test">
          <a-input style="width: 350px" placeholder="test placeholder" />
        </a-form-item>
      </Search>
      <!-- <a-input v-model:value="inputV" placeholder="输入工号/用户名/部门名称进行模糊查询" style="width: 25%; min-width: 280px"></a-input>
      <a-button type="primary" @click="search">查询</a-button>
      <a-button>重置</a-button> -->
    </div>
    <div class="alphaContent">
      <div class="alphaOperationArea">
        页面标题
        <a-button class="floatRight" @click="reloadTableData">显示/隐藏取消按钮</a-button>
        <a-button class="floatRight" @click="changeVisible">显示/隐藏Loading</a-button>
      </div>
      <AlphaTable :columns="columns" :table-config="tableConfig" ref="table">
        <template v-slot="{ column, record, reloadTableData }">
          <template v-if="column.key === 'actions'">
            <a-button type="link">测试操作</a-button>
          </template>
          <template v-else-if="column.key === 'sex'">
            {{ record['sex'] === 6 ? '男' : '女' }}
          </template>
        </template>
      </AlphaTable>
      <Loading message="文件上传中，进度50%" :visible="visibility" :cancelable="cancelable" @cancel=""></Loading>
    </div>
  </div>
</template>

<script setup lang="ts">
import AlphaTable from '@/components/table';
import { generateColumns } from '@/components/table/utils/helper';
import type { TableConfig } from '@/components/table';
import Search from '@/components/search';
import Loading from '@/components/loading';
import { ref } from 'vue';
const columns = generateColumns([
  ['id', 'id'],
  ['username', '名字'],
  ['sex', '性别'],
]);

const tableConfig = ref<TableConfig>({
  rowKey: 'id',
  fetchTableData: () => {
    return new Promise((res) => {
      setTimeout(() => {
        const rows: any = [];
        let index = 0;
        do {
          rows.push({ id: index++, username: 'test', sex: '6' });
        } while (index < 100);
        res({ rows });
      }, 2000);
    });
  },
  queryParams: {
    test: 234,
  },
  pageSizeOptions: [],
  // paginationSize:'small',
  scrollConfig: {
    x: true,
    y: 800,
    scrollToFirstRowOnChange: false,
  },
  rowSelection: {
    selectedRowKeys: [],
  },
});

const table = ref();
const cancelable = ref(false);
const visibility = ref(false);
function reloadTableData() {
  cancelable.value = !cancelable.value;
}

function changeVisible() {
  visibility.value = !visibility.value;
}

function getSelectedKeys() {
  console.log(table.value.getSelectedRowKeys());
}

function clearSelectedRowKeys() {
  table.value.clearSelectedRowKeys();
}

function insertSelectedData() {
  tableConfig.value.rowSelection?.selectedRowKeys.push(1);
}

const inputV = ref(123);
function search() {
  tableConfig.value.queryParams!.test = inputV.value;
}
</script>

<style scoped></style>
