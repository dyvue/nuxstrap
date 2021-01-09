<template>
  <div class="deznav">
    <div class="deznav-scroll">
      <ul class="metismenu" id="menu">
        <li :class="listName('index')">
          <nuxt-link to="/" class="ai-icon" aria-expanded="false">
            <i class="flaticon-381-home"></i>
            <span class="nav-text">Dashboard</span>
          </nuxt-link>
        </li>
        <li :class="listName('transaction')">
          <nuxt-link to="/transaction" class="ai-icon" aria-expanded="false">
            <i class="flaticon-381-folder-3"></i>
            <span class="nav-text">Transaction</span>
          </nuxt-link>
        </li>
      </ul>
      <div class="copyright mt-5">
        <p>
          <strong>Nuxstrap</strong> <br> © 2020 All Rights
          Reserved
        </p>
        <p><a target="blank" href="https://romadhanedy.my.id">Romadhan Edy Prasetyo</a></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    listName(parr_route_name) {
      const curr_route_name = this.$route.name.split("-")[0]
      if (parr_route_name === curr_route_name) return "mm-active"
      else return ""
    }
  }
}
</script>