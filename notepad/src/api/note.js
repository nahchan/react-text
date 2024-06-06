import axios from '.';
// 分页
export function getNotes(page, size) {
    return axios.get(`/note/page/${page}/${size}`);
}

// 添加note
export function addNote(note){
    return axios.post('/note',note);
}

// 删除note
export function deleteNote(id){
    return axios.delete(`/note/${id}`);
}

// 修改note
export function updateNote(id,note){
    return axios.put(`/note/${id}`,note);
}
export function getNoteListByContent(content) {
    return axios.get(`/note/content/${content}`);
}