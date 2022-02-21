<template>
  <div class="container">
    <h1>Todos</h1>
    <div class="main">
      <div class="input-wrapper">
        <a-input v-model:value="state.todoVal" placeholder="What needs to be done?" @pressEnter="handleAdd()">
          <template #prefix>
            <SvgIcon name="icon-xiala" class="select-icon" :class="{'select-all-active': state.todoList.some(item => item.completed) }" @click="selectAll"/>
          </template>
        </a-input>
      </div>
      <div class="list-wrapper">
        <template v-if="state.todoList?.length">
          <!-- todo list -->
          <ul class="todo-list">
            <draggable
              :list="todoOptions"
              :animation="500"
              item-key="id"
              group="people"
              @start="state.isDrag = true"
              @end="state.isDrag = false"
            >
              <template #item="{ element }">
                <li class="todo-item" :key="element.id">
                  <SvgIcon :name="element.completed ? 'icon-danxuankuang1' : 'icon-danxuankuang'" class="radio-icon" @click="checkItem(element)"/>
                  <a-input v-model:value="element.title" class="item-input"></a-input>
                  <SvgIcon name="icon-tuodong" class="drag-icon"/>
                  <SvgIcon name="icon-guanbi" class="close-icon" @click="delItem(element.index - 1)"/>
                </li>
              </template>
            </draggable>
          </ul>
          <!-- 底部操作 -->
          <div class="list-footer">
            <span class="num">{{ state.todoList.filter(item => !item.completed)?.length }} items left</span>
            <ul class="footer-list">
              <li v-for="ele in state.statusList" class="footer-item" :class="{'acitve': ele.active}" :key="ele.id" @click="handleActive(ele)">{{ ele.label }}</li>
            </ul>
            <div class="clear-wrap" v-if="completeOptions.length" @click="clearCompleted">Clear Completed</div>
          </div>
        </template>
        <!-- 右侧菜单 -->
        <div class="menu-wrapper">
          <ul class="menu-list">
            <li
              class="menu-item"
              v-for="item in state.menuList"
              :key="item.id"
              @click="handleClick(item.id)"
            >
              <uploadFile v-if="item.id === 3" @success="handleSuccess">
                <div class="upload-btn">{{ item.label }}</div>
              </uploadFile>
              <span v-else>{{ item.label }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <useDocDialog :useDocVisble="state.useDocVisble" @close="handleClose" />
  <secretKeyDialog :secretVisble="state.secretVisble" @close="handleCloseSecret" />
</template>
<script setup lang="ts">
import draggable from "vuedraggable";
import secretKeyDialog from '@/components/secretKey/index.vue'
import uploadFile from '@/components/upload/index.vue'
import useDocDialog from "@/components/useDocDialog.vue";
import { nanoid } from 'nanoid'
import { ITodoConfig, IStateList, IMunu } from '@/types'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
import { reactive, computed, createVNode, watchEffect } from 'vue'
import { message, Modal } from 'ant-design-vue';
import FileSaver from 'file-saver'
const state = reactive<IStateList>({
  todoVal: '',
  todoList: [],
  menuList: [
    {
      id: 1,
      label: "使用文档",
    },
    {
      id: 2,
      label: "导出列表",
    },
    {
      id: 3,
      label: "导入列表",
    },
    {
      id: 4,
      label: "同步上传",
    },
    {
      id: 5,
      label: "同步下载",
    },
  ],
  statusList: [
    {
      id: 1,
      label: 'All',
      active: true
    },
    { 
      id: 2,
      label: 'Active',
      active: false
    },
    { 
      id: 3,
      label: 'Completed',
      active: false
    }
  ],
  isDrag: false,
  useDocVisble: false,
  clearVisible: false,
  completedList: [],
  activeStatus: 1,
  selectAllActive: false,
  secretVisble: false
});
const completeOptions = computed(() => state.todoList.filter((item:ITodoConfig) => item.completed))
const todoOptions = computed(() => {
  const { activeStatus,  todoList } = state
  switch (activeStatus) {
    case 1:
      return todoList
      break;
    case 2:
      return todoList.length && todoList.filter((item:ITodoConfig) => !item.completed)
      break
    case 3:
      return todoList.filter((item:ITodoConfig) => item.completed)
  }
})    
// 添加todolist
const handleAdd = () => {
  if(!state.todoVal) return
  const obj = {
    id: nanoid(),
    completed: false,
    title: state.todoVal
  }
  state.todoList.push(obj)
  state.todoVal = ''
}
watchEffect(() => {
  state.todoList.forEach((ele: ITodoConfig, index: number) => {
    ele.index = index + 1
  })
})
// 选中选项
const checkItem = (item: ITodoConfig)=> {
  item.completed = !item.completed
}
// 删除选项
const delItem = (index: number) => {
  state.todoList.splice(index, 1)
}
// 关闭使用文档弹框
const handleClose = () => {
  state.useDocVisble = false;
}
const handleCloseSecret = () => {
  state.secretVisble = false;
}
const handleActive = (item: IMunu)=> {
  state.statusList.forEach((ele: IMunu) => {
    ele.active = ele.id === item.id
  })
  state.activeStatus = item.id
}
const selectAll = () => {
  state.selectAllActive = !state.selectAllActive
  state.todoList.forEach((item:ITodoConfig) => item.completed = state.selectAllActive)
}
// 导入列表成功回调
const handleSuccess = (value: string) => {
  if (!Array.isArray(JSON.parse(value)) || !JSON.parse(value)[0].title) {
    return message.error('列表格式错误吖！！！')
  }
  state.todoList = state.todoList.concat(JSON.parse(value))
}
//清除已完成
const clearCompleted = () => {
  Modal.confirm({
    title: '提示',
    icon: createVNode(ExclamationCircleOutlined),
    content: 'clear completed?',
    okText: '确认',
    cancelText: '取消',
    onCancel() {},
    onOk() {
      state.todoList = state.todoList.filter((item:ITodoConfig) => !item.completed)
    }
  });
}
// 右侧menu
const handleClick = (type: number)=> {
  switch (type) {
    case 1:
      state.useDocVisble = true;
      break;
    case 2:
      const data = JSON.stringify(state.todoList)
      const blob = new Blob([data], { type: 'application/json' })
      FileSaver.saveAs(blob, `todos.json`)
      break;
    case 4:
    case 5:
      state.secretVisble = true;
  }
}
</script>
<style lang="less" scoped>
.container {
  user-select: none;
  width: 750px;
  margin: 0 auto;
  h1 {
    font-size: 100px;
    font-weight: 100;
    text-align: center;
    color: rgba(175, 47, 47, 0.15);
    -webkit-text-rendering: optimizeLegibility;
    -moz-text-rendering: optimizeLegibility;
    text-rendering: optimizeLegibility;
  }
  .main {
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
    .input-wrapper {
      position: relative;
      .select-icon {
        height: 24px !important;
        width: 24px !important;
        cursor: pointer;
      }
      .select-all-active {
        color: rgb(4, 190, 189)
      }
      /deep/ .ant-input {
        padding: 16px 16px 16px 20px;
        background: rgba(0, 0, 0, 0.003);
        ::selection {
          color: #fff;
          background: red;
        }
      }
    }
    .list-wrapper {
      position: relative;
      .todo-list {
        border-top: 1px solid #e6e6e6;
        margin-bottom: 0;
        .todo-item {
          position: relative;
          font-size: 18px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          border-bottom: 1px solid #ededed;
          &:last-child {
            border: none;
          }
          .radio-icon,.drag-icon {
            width: 30px !important;
            height: 30px !important;
            color: #4d4d4d;
            cursor: pointer;
          }
          /deep/ .ant-input {
            padding: 15px 15px 15px 20px;
            border: none;
            height: 40px;
            outline: none;
            box-shadow: none;
            color: #4d4d4d;
          }
          /deep/ .ant-input-affix-wrapper {
            border: none ;
            outline: none;
            box-shadow: none;
          }
          .close-icon {
            margin-left: 10px;
            color: #cc9a9a;
            cursor: pointer;
            width: 24px !important;
            height: 24px !important;
          }
        }
      }
      .list-footer {
        padding: 10px 15px;
        display: flex;
        align-items: center;
        color: #777;
        border-top: 1px solid #e6e6e6;
        .num {
          width: 100px;
        }
        .footer-list {
          display: flex;
          align-self: center;
          margin-bottom: 0;
          justify-content: center;
          flex: 1;
          text-align: center;
          .footer-item {
            color: inherit;
            margin: 3px;
            padding: 3px 20px;
            text-decoration: none;
            border: 1px solid transparent;
            border-radius: 3px;
            cursor: pointer;
            &:hover {
              border: 1px solid #cc9a9a;
            }
          }
          .acitve {
            border: 1px solid #cc9a9a;
          }
        }
        .clear-wrap {
          cursor: pointer;
        }
      }
      .menu-wrapper {
        width: 106px;
        box-sizing: border-box;
        position: absolute;
        background-color: #fff;
        top: 0px;
        right: -130px;
        border: 1px solid #ededed;
        .upload-btn {
          font-size: 12px;
          color: #2c3e50;
        }
        .menu-item {
          border-bottom: 1px solid #ededed;
          padding: 10px 25px;
          cursor: pointer;
          &:hover {
            color: #cc9a9a;
          }
          &:last-child {
            border: none;
          }
        }
      }
    }
  }
}
</style>
