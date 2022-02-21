// todo list 选项
export interface ITodoConfig {
  id: string | number,
  index?: number,
  completed: boolean,
  title: string
}
export interface IMunu {
  id: number,
  label: string,
  active?: boolean
}
export interface IStateList {
  todoVal: string | number,
  todoList: ITodoConfig[],
  menuList: IMunu[],
  statusList: IMunu[],
  isDrag: boolean,
  useDocVisble: boolean,
  clearVisible: boolean,
  completedList: ITodoConfig[],
  activeStatus: number,
  selectAllActive: boolean,
  secretVisble: boolean
}