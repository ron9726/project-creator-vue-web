<template>
  <div class="alphaContainer">
    <div class="alphaSearch">
      <a-input v-model:value="inputV" placeholder="输入工号/用户名/部门名称进行模糊查询" style="width: 25%; min-width: 280px"></a-input>
      <a-button type="primary" @click="search">查询</a-button>
      <a-button>重置</a-button>
    </div>
    <div class="alphaContent">
      <div class="alphaOperationArea">
        页面标题
        <a-button class="floatRight" @click="reloadTableData">刷新</a-button>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { AlphaTable, type TableConfig, generateColumns } from '@/components/alpha-components-antd';
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
        res({ rows: [{ id: 1, username: 'test', sex: '6' }] });
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

function reloadTableData() {
  if (table.value) {
    table.value.reloadTableData();
  }
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
