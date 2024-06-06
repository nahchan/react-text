import axios from '.';

// 分页
export function getTodos(page, size) {
    return axios.get(`/todo/${page}/${size}`);
}

// 搜索API
export function getTodoListByContent(content) {
    return axios.get(`/todo/${content}`);
}

// 添加
export function addTodo(todo){
    return axios.post('/todo',todo);
}

// 删除
export function deleteTodo(id){
    return axios.delete(`/todo/${id}`);
}

// 修改
export function updateTodo(id,todo){
    return axios.put(`/todo/${id}`,todo);
}
