<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
  import { get } from 'lodash'
  import DefaultLayout from '@/layouts/Default'
  import MinimalLayout from '@/layouts/Minimal'

  export default {
    name: 'App',
    components: {
      DefaultLayout,
      MinimalLayout
    },
    computed: {
      layout () {
        return `${get(this.$route, 'meta.layout', 'default')}-layout`
      }
    }

  };
</script>
