import TodoService from '../services/Todo';

const state = {
  todos: [],
  newTodo: ''
}

const getters = {
  getTodo(state) {
    return state.todos;
  }
}

const mutations = {
  GET_TODO(state, todo){
    state.todos = todo
  },
  ADD_TODO(state, todo){
    state.todos.push({
      ...todo,
      status: 0 //Not Completed
    })
  },
  COMPLETE_TODO(){
    this.dispatch('todo/fetchTodo');
  }
}

const actions = {
  async fetchTodo({commit}){
    try {
      const todoResponse = await TodoService.getTodoList();
      if (todoResponse?.status === 200) {
        commit('GET_TODO', todoResponse.data.data);
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  },
  async addTodo({commit}, todo){
    try {
      const todoResponse = await TodoService.addTodo(todo);

      if (todoResponse.status === 200) {
        let newTodo = {
          createdAt: todoResponse.data.createdAt,
          description: todoResponse.data?.description ? todoResponse.data.description : '',
          title: todoResponse.data.title,
          dueDate: todoResponse.data.dueDate,
          status: todoResponse.data.status,
          _id: todoResponse.data._id
        }
        commit('ADD_TODO', newTodo);
      }
      return todoResponse;
    } catch (err) {
      console.log(err);
    }
  },
  async markStatus({commit}, currentTodo) {
    try {
      const todoResponse = await TodoService.markStatus(currentTodo);
      if (todoResponse?.status === 200) {
        commit('COMPLETE_TODO', currentTodo);
      }
      return true;
    } catch (err) {
      console.log(err);
    }
  }
}

export const todo = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
