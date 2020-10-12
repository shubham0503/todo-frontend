<template>
  <v-app id="todo">
    <Navigation />
    <v-main>
      <br>
      <br>
      <br>
      <v-card class="mx-auto" max-width="900">
        <v-toolbar color="primary" dark>
          <v-toolbar-title>All Todo List</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-text-field class="mx-3 search-box" flat label="Search" prepend-inner-icon="mdi-magnify" solo-inverted v-model="search" clearable ></v-text-field>
        </v-toolbar>
        <v-list two-line>
          <v-list-item-group>
            <template v-for="(todo, index) in filteredTodoList">
              <v-list-item :key="todo.title">
                <template>
                  <v-list-item-content>                    
                    <v-list-item-title v-text="todo.title"></v-list-item-title>

                    <v-list-item-subtitle class="text--primary" v-text="parseDate(todo.dueDate)"></v-list-item-subtitle>

                    <v-list-item-subtitle v-text="todo.description"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-list-item-action-text v-if="todo.status == 1">
                      <v-chip
                        class="ma-2"
                        color="success"
                        x-small
                      >
                        Completed
                      </v-chip>
                    </v-list-item-action-text>
                    <v-list-item-action-text v-else>
                      <v-chip
                        class="ma-2"
                        color="warning"
                        x-small
                      >
                        Pending
                      </v-chip>
                    </v-list-item-action-text>
                    <v-list-item-action-text v-if="isExpired(todo.dueDate)">
                      <v-chip
                        class="ma-2"
                        color="red"
                        text-color="white"
                        x-small
                      >
                        Expired
                      </v-chip>
                    </v-list-item-action-text>
                    <span v-if="todo.status != 1">
                      <v-checkbox :value="todo._id" v-model="checkedTodos" @click="markTodoStatus" />
                    </span>
                  </v-list-item-action>
                </template>
              </v-list-item>
              <v-divider v-if="index < todo.length - 1" :key="index"></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card>
      <TodoForm />
      <v-snackbar
        max-width="100%"
        v-model="snackbar.show"
        :timeout="timeout"
        shaped
      >
        {{ snackbar.message }}
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue"
            text
            v-bind="attrs"
            @click="snackbar.show = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
  import Navigation from '@/components/organisms/Navigation';
  import Footer from '@/components/organisms/Footer';
  import TodoForm from '@/components/organisms/TodoForm';
  import { mapGetters } from 'vuex';
  import _ from 'lodash';

  export default {
    data: () => ({
      search: '',
      checkedTodos: [],
      snackbar: {
        show: false,
        message: null
      },
      timeout: 5000
    }),
    computed: {
      ...mapGetters({
        todoList: 'todo/getTodo'
      }),
      filteredTodoList() {
        return _.orderBy(this.todoList.filter(item => {
          if(!this.search) return this.todoList;
          return (
            item.title.toLowerCase().includes(this.search.toLowerCase()) ||
            item.description.toLowerCase().includes(this.search.toLowerCase())
          );
        }), ['dueDate'],['asc']);
      }
    },
    methods: {
      parseDate(dateString) {
        let dateObj = new Date(dateString);
        return dateObj.toLocaleString('default', { month: 'short' }) + ' ' + dateObj.getDate();
      },
      isExpired(dateString) {
        let dateObj = new Date(dateString);
        let today = new Date();

        if (today > dateObj) {
          return true;
        } else {
          return false;
        }
      },
      async markTodoStatus() {
        let currentTodo = this.checkedTodos[0];
        this.checkedTodos = [];

        try {
          const todoResponse = await this.$store.dispatch('todo/markStatus', currentTodo);
          if (todoResponse) {
            this.snackbar.message = "Todo completed.";
            this.snackbar.show = true;
          } else {
            this.snackbar.message = "Something went wrong. Please try again later.";
            this.snackbar.show = true;
          }
        } catch (err) {
          this.snackbar.message = "Something went wrong. Please try again later.";
          this.snackbar.show = true;
        }
      }
    },
    components: {
      Navigation,
      Footer,
      TodoForm
    },
    props: {
      source: String,
    },
    created() {
      this.$store.dispatch('todo/fetchTodo');
    }
  }
</script>
<style scoped>
  .v-list{
    height:400px;/* or any height you want */
    overflow-y:auto
  }
  .search-box {
    margin-top: 30px;
  }
</style>
