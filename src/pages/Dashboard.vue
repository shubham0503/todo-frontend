<template>
  <v-app id="dashboard">
    <Navigation/>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col class="text-center">
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
  import Navigation from '@/components/organisms/Navigation'
  import Footer from '@/components/organisms/Footer'

  export default {
    components: {
      Navigation,
      Footer
    },
    props: {
      source: String,
    }
  }
</script>