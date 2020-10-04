import axios from 'axios';

const API_URL = 'http://localhost:8080/api/todo';

let userData = JSON.parse(localStorage.getItem('userData'));

const headers = {
  'x-access-token': userData?.accessToken
}

class TodoService {
  async addTodo(todo) {
    const response = await axios.post(API_URL, {
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      status: todo.status
    }, { headers } );

    if (response) {
      return response;
    }
  }

  async getTodoList() {
    const response = await axios.get(API_URL, { headers } );

    if (response) {
      return response;
    }
  }
  
  async markStatus(currentTodo) {
    const response = await axios.patch(API_URL+'/'+currentTodo, {
      todo: currentTodo
    }, { headers } );

    if (response) {
      return response;
    }
  }

}

export default new TodoService();
