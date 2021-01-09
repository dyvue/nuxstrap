<template>
  <div>
    <div id="main-wrapper">
      <div class="nav-header">
        <a href="javascript:void(0)" class="brand-logo">
          <img class="c-brand-hr" src="@/assets/images/logo-hr.png" alt="" />
          <img class="c-brand" src="@/assets/images/logo.png" alt="" />
        </a>

        <div class="nav-control">
          <div class="hamburger">
            <span class="line"></span><span class="line"></span
            ><span class="line"></span>
          </div>
        </div>
      </div>

      <Header v-on:fullscreen="toggleFullscreen"/>

      <Sidebar/>

      <div class="content-body">
        <div class="container-fluid">
          <Nuxt/>
        </div>
      </div>
      
      <!-- <Footer/> -->

    </div>
    <script src="/js/global/global.min.js"></script>
    <script src="/js/bootstrap-select/bootstrap-select.min.js"></script>
    <script src="/js/custom.min.js"></script>
    <script src="/js/deznav-init.js"></script>
  </div>
</template>

<script>
  import Header from "@/components/layouts/Header"
  import Sidebar from "@/components/layouts/Sidebar"
  import Footer from "@/components/layouts/Footer"

  export default {
    methods: {
      toggleFullscreen () {
        this.$fullscreen.toggle(this.$el.querySelector('#main-wrapper'), {
          wrap: false
        })
      }
    }
  };
</script>

<style scoped>
  #main-wrapper {
    background-color: #fbfbfb
  }
</style>