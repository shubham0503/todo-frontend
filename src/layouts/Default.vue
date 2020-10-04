<template>
  <div class="default-layout">
    <Navigation />
    <slot />
    <Footer />
  </div>
</template>

<script>
  import Navigation from '@/components/organisms/Navigation';
  import Footer from '@/components/organisms/Footer';

  export default {
    components: {
      Navigation,
      Footer
    }
  }
</script>

<style>

</style>