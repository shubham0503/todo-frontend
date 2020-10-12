import axios from 'axios';
import authHeader from './AuthHeader';

const API_URL = 'http://demoapitodo-env.eba-7dmrpzak.ap-south-1.elasticbeanstalk.com/api/todo';

class TodoService {
  async addTodo(todo) {
    const response = await axios.post(API_URL, {
      title: todo.title,
      description: todo.description,
      dueDate: todo.dueDate,
      status: todo.status
    }, await authHeader() );

    if (response) {
      return response.data;
    }
  }

  async getTodoList() {
    const response = await axios.get(API_URL, await authHeader() );

    if (response) {
      return response;
    }
  }
  
  async markStatus(currentTodo) {
    const response = await axios.patch(API_URL+'/'+currentTodo, {
      todo: currentTodo
    }, authHeader() );

    if (response) {
      return response;
    }
  }

}

export default new TodoService();
