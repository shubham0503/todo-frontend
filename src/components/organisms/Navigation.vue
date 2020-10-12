<template>
  <section>
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Hi, {{userName}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item v-for="(item, index) in navItems" :key="index" :to="item.link" link>
          <v-list-item-action>
            <v-icon>mdi-{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link @click="logout">
          <v-list-item-action>
            <v-icon>mdi-logout</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>PeerPal | To Do </v-toolbar-title>
    </v-app-bar>
  </section>
</template>
<script>
  export default {
    data: () => ({
      drawer: false,
      navItems: [
        {
          link: '/todo',
          title: 'To Do',
          icon: 'calendar'
        }
      ]
    }),
    computed: {
      userName() {
        if (localStorage.getItem('loggedInUser')) {
          let loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
          return loggedInUser.name.toUpperCase();
        }
        return [];
      },
    },
    methods: {
      async logout() {
        await this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    }
  }
</script>
