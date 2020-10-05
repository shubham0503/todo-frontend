<template>
  <v-row>
    <v-dialog v-model="dialog" persistent max-width="600px" class="align-content-end">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="mx-2 add-btn" fab dark large color="primary" v-bind="attrs" v-on="on">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <ValidationObserver ref="obs">
        <v-card slot-scope="{ invalid, validated }">
          <v-card-title>
            <span class="headline custom-headline">Add New Todo</span>
            <v-card-text class="custom-subtitle">
              <small>Create new todo to keep track of duedates and keep informed..</small>
            </v-card-text>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="8">
                  <ValidationProvider name="title" rules="required">
                    <v-text-field
                      v-model="title"
                      prepend-icon="mdi-pencil"
                      label="Title*"
                      slot-scope="{errors, valid}"
                      :error-messages="errors"
                      :success="valid"
                      required
                    ></v-text-field>
                  </ValidationProvider>
                </v-col>
                <v-col cols="12" sm="12" md="4">
                  <v-menu v-model="dueDateMenu" :close-on-content-click="false" :nudge-right="40"
                    transition="scale-transition" offset-y max-width="290px" min-width="290px">
                    <template v-slot:activator="{ on }">
                      
                      <ValidationProvider name="dueDate" rules="required">
                        <v-text-field
                          v-model="dueDateVal"
                          label="Due Date*"
                          prepend-icon="mdi-calendar"
                          readonly
                          :value="dueDateDisp"
                          slot-scope="{errors, valid}"
                          :error-messages="errors"
                          :success="valid"
                          required
                          v-on="on"
                        ></v-text-field>
                      </ValidationProvider>
                    </template>
                    <v-date-picker locale="en-in" :min="minDate" v-model="dueDateVal" no-title
                      @input="dueDateMenu = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <ValidationProvider name="description">
                    <v-textarea
                      v-model="description"
                      prepend-icon="mdi-text"
                      label="Description"
                      slot-scope="{errors, valid}"
                      :error-messages="errors"
                      :success="valid"
                      rows="2"
                    ></v-textarea>
                  </ValidationProvider>
                </v-col>
              </v-row>
            </v-container>
            
            <small>
              <v-icon small>
                mdi-information
              </v-icon> *Indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-btn color="deep-purple" text @click="dialog = false" ref="closeBtn">
              Close
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="addTodo" :disabled="invalid || !validated">Save</v-btn>
          </v-card-actions>
        </v-card>
      </ValidationObserver>
    </v-dialog>
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
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>
<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';

  export default {
    data: () => ({
      dialog: false,
      dueDateMenu: false,
      dueDateVal: null,
      description: '',
      title: '',
      snackbar: {
        show: false,
        message: null
      },
      timeout: 5000
    }),
    components: {
      ValidationProvider,
      ValidationObserver
    },
    computed: {
      minDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();

        return today = yyyy +'-'+ mm +'-'+ dd;
      },
      dueDateDisp() {
        return this.dueDateVal;
      }
    },
    methods: {
      async addTodo() {      
        const result = await this.$refs.obs.validate();

        const todoObj = {
          title: this.title,
          description: this.description,
          dueDate: this.dueDateVal
        }

        if (result) {
          try {
            const todoResponse = await this.$store.dispatch('todo/addTodo', todoObj);
            if (todoResponse?.status === 200) {
              this.snackbar.message = "Todo created.";
              this.snackbar.show = true;
              this.clear();
              this.$refs.closeBtn.$el.click();
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
      async clear() {
        this.title = this.description = this.dueDate = this.dueDateVal = "";
        this.$nextTick(() => {
          this.$refs.obs.reset();
        });
      }
    }
  }
</script>
<style scoped>
  .align-content-end {
    justify-content: flex-end;
  }

  .add-btn {
    position: fixed;
    bottom: 10%;
    right: 1%;
  }

  .custom-headline {
    color: #616161;
  }

  .custom-subtitle {
    padding: 0px;
    color: #757575;
  }
</style>