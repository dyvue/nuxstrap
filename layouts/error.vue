<template>
  <div class="container c-mt-blank-page">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-5">
        <div class="form-input-content text-center error-page">
          <h1 class="error-text font-weight-bold">404</h1>
          <h4>
            <i class="fa fa-exclamation-triangle text-warning"></i> The page
            you were looking for is not found!
          </h4>
          <p>You may have mistyped the address or the page may have moved.</p>
          <div>
            <a href="/" class="btn btn-primary">Back to Home</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "blank",
  head: {
    title: "The page you were looking for is not found",
  },
};
</script>