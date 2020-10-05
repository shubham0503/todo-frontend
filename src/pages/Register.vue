<template>
  <v-app id="login">
    <v-main>
      <v-img max-height="90" max-width="250" src="@/assets/peerpal.svg"></v-img>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <ValidationObserver ref="obs">
              <v-card class="elevation-12 pr-2 pl-2 pt-6 pb-6" slot-scope="{ invalid, validated }">
                <v-toolbar light flat>
                  <v-toolbar-title>Create a New Account!</v-toolbar-title>
                </v-toolbar>
                  <v-form name="form">
                    <v-card-text>
                    <ValidationProvider name="name" rules="required">
                      <v-text-field
                        slot-scope="{ errors, valid }"
                        v-model="user.name"
                        :error-messages="errors"
                        :success="valid"
                        label="Name"
                        required
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider name="email" rules="required|email">
                      <v-text-field
                        slot-scope="{ errors, valid }"
                        v-model="user.email"
                        :error-messages="errors"
                        :success="valid"
                        label="E-mail"
                        required
                        prepend-icon="mdi-account"
                      ></v-text-field>
                    </ValidationProvider>

                    <ValidationProvider name="password" rules="required">
                      <v-text-field
                        slot-scope="{ errors, valid }"
                        v-model="user.password"
                        :error-messages="errors"
                        :success="valid"
                        label="Password"
                        required
                        type="password"
                        prepend-icon="mdi-lock" 
                      />
                    </ValidationProvider>
                  </v-card-text>
                  
                  <v-card-actions>
                    <v-btn text color="deep-purple" link to="/login">Already have an account?</v-btn>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="onSubmit" :disabled="invalid || !validated">Sign Up</v-btn>
                  </v-card-actions>

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
                </v-form>
              </v-card>
            </ValidationObserver>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  import User from '@/models/User';
  import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full';

  export default {
    name: 'Register',
    components: {
      ValidationProvider,
      ValidationObserver
    },
    data() {
      return {
        user: new User('', ''),
        snackbar: {
          show: false,
          message: null
        },
        timeout: 5000
      };
    },
    computed: {
      loggedIn() {
        return this.$store.state.auth.status.loggedIn;
      }
    },
    created() {
      if (this.loggedIn) {
        this.$router.push('/profile');
      }
    },
    methods: {
      async clear() {
        this.user.name = this.user.email = this.user.password = "";
        this.$nextTick(() => {
          this.$refs.obs.reset();
        });
      },
      async onSubmit() {
        const result = await this.$refs.obs.validate();

        if (result) {
          try {
            const registerResponse = await this.$store.dispatch('auth/register', this.user);
            if (registerResponse.status === 200) {
              this.$router.push('/login');
            } else if (registerResponse.status >= 400) {
              this.snackbar.message = registerResponse.message;
              this.snackbar.show = true;
            }
          } catch (err) {
            this.snackbar.message = "Something went wrong please try again later.";
            this.snackbar.show = true;
          }
        }
      }
    }
}
</script>
<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  top: 50%;
  left: 47%;
  z-index: 99999999;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>