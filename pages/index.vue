<template>
  <div>
    <div class="row page-titles mx-0">
      <div class="col-sm-6 p-md-0">
        <div class="welcome-text">
          <h4>Dashboard</h4>
        </div>
      </div>
      <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Home</a>
          </li>
          <li class="mx-2"> - </li>
          <li class="breadcrumb-item active">
            <a href="javascript:void(0)">Index</a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  asyncData () {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve()
      }, 100)
    })
  },
  mounted() {
    this.clearLOG()
  },
  methods: {
    clearLOG: function() {
      console.clear()
    }
  }
}
</script>