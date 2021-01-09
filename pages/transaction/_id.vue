<template>
  <div>
    <div class="row page-titles mx-0">
      <div class="col-sm-6 p-md-0">
        <div class="welcome-text">
          <h4>Transaksi</h4>
        </div>
      </div>
      <div class="col-sm-6 p-md-0 justify-content-sm-end mt-2 mt-sm-0 d-flex">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <a href="javascript:void(0)">Tabel</a>
          </li>
          <li class="mx-2">-</li>
          <li class="breadcrumb-item">
            <nuxt-link :to="{ name: 'transaction' }" href="javascript:void(0)"
              >Transaksi</nuxt-link
            >
          </li>
          <li class="mx-2">-</li>
          <li class="breadcrumb-item active">
            <a href="javascript:void(0)">Detail</a>
          </li>
        </ol>
      </div>
    </div>

    <div v-if="transaction.data" class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-header border-0 pb-0">
            <h5 class="card-title">Detail Transaksi</h5>
            <span
              v-if="transaction.data.status === 'waiting_for_payment'"
              class="badge light badge-primary"
              >Menunggu Pembayaran</span
            >
            <span
              v-else-if="transaction.data.status === 'pop_uploaded'"
              class="badge light badge-warning"
              >Menunggu Verifikasi Pembayaran</span
            >
            <span
              v-else-if="transaction.data.status === 'payment_verified'"
              class="badge light badge-success"
              >Pembayaran Terverifikasi</span
            >
            <span
              v-else-if="transaction.data.status === 'dispatch'"
              class="badge light badge-primary"
              >Sedang dalam pengiriman</span
            >
            <span
              v-else-if="transaction.data.status === 'arrived'"
              class="badge light badge-success"
              >Barang sudah sampai</span
            >
            <span
              v-else-if="transaction.data.status === 'done'"
              class="badge light badge-success"
              >Transaksi selesai</span
            >
            <span
              v-else-if="transaction.data.status === 'failed'"
              class="badge light badge-danger"
              >Transaksi gagal</span
            >
          </div>
          <div class="card-body">
            <div class="row mb-5">
              <div class="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <h6>Penjual:</h6>
                <div v-if="transaction.data.captured_users">
                  <strong>{{
                    transaction.data.captured_users.seller.name
                  }}</strong>
                </div>
                <div v-if="transaction.data.captured_users">
                  Email: {{ transaction.data.captured_users.seller.email }}
                </div>
                <div v-if="transaction.data.captured_users">
                  Phone:
                  {{ transaction.data.captured_users.seller.phone_number }}
                </div>
              </div>
              <div class="mt-4 col-xl-3 col-lg-3 col-md-6 col-sm-12">
                <h6>Pembeli:</h6>
                <div v-if="transaction.data.captured_users">
                  <strong>{{
                    transaction.data.captured_users.buyer.name
                  }}</strong>
                </div>
                <div v-if="transaction.data.captured_users">
                  Email: {{ transaction.data.captured_users.buyer.email }}
                </div>
                <div v-if="transaction.data.captured_users">
                  Phone:
                  {{ transaction.data.captured_users.buyer.phone_number }}
                </div>
              </div>
              <div
                class="mt-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 d-flex justify-content-lg-end justify-content-md-center justify-content-xs-start"
              >
                <div class="row align-items-center" style="font-size: 0.9rem;">
                  <div v-if="transaction.data.payment_method" class="col-auto">
                    <span class="text-primary font"><strong>{{ transaction.data.payment_method.description }}</strong></span><br><br>
                    <span><strong>{{ transaction.data.payment_method.details.account_name }}</strong></span
                    ><br />
                    <span>{{ transaction.data.payment_method.details.account_number }}</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Link Produk</th>
                    <th>Pesan</th>
                    <th class="right">Harga Barang</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="left strong">
                      <a
                        target="__blank"
                        :href="transaction.data.product_link"
                        v-if="transaction.data.product_link"
                      >
                        <template
                          v-if="transaction.data.product_link.length > 70"
                        >
                          {{
                            $helpers.cutdesc(transaction.data.product_link, 70)
                          }}
                        </template>
                        <template v-else>
                          {{ transaction.data.product_link }}
                        </template>
                      </a>
                    </td>
                    <td class="left">
                      <template v-if="transaction.data.message">
                        <template v-if="transaction.data.message.length > 70">
                          {{ $helpers.cutdesc(transaction.data.message, 70) }}
                        </template>
                        <template v-else>
                          {{ transaction.data.message }}
                        </template>
                      </template>
                    </td>
                    <td class="right">
                      <template v-if="transaction.data.sub_total">
                        {{ $helpers.currency.idr(transaction.data.sub_total) }}
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="row">
              <div class="col-lg-4 col-sm-5"></div>
              <div class="col-lg-4 col-sm-5 ml-auto text-right">
                <table class="table table-clear">
                  <tbody>
                    <tr>
                      <td class="left"><strong>Subtotal</strong></td>
                      <td class="right">
                        <template v-if="transaction.data.sub_total">
                          {{ $helpers.currency.idr(transaction.data.sub_total) }}
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td class="left"><strong>Administrasi</strong></td>
                      <td class="right">
                        <template v-if="transaction.data.sub_total">
                          {{ $helpers.currency.idr(transaction.data.additional_fee) }}
                        </template>
                      </td>
                    </tr>
                    <tr>
                      <td class="left"><strong>Total</strong></td>
                      <td class="right">
                        <strong v-if="transaction.data.grand_total">{{
                          $helpers.currency.idr(transaction.data.grand_total)
                        }}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div v-if="transaction.data.transaction_pops" class="row">
              <div class="col-12 col-md-7"></div>
              <div class="col-12 col-md-5 text-right">
                <template v-for="item of transaction.data.transaction_pops">
                  <img :src="item.pop_aws_url" alt="Proof of payment" class="proof-of-payment">
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: "Detail Transaction | Nuxtstrap"
  },
  middleware: 'auth',
  async asyncData({ params, error, redirect, store }) {
    const url = "/transaction";
    const id = params.id;
    const stored = await store.dispatch("api/show", { url, id });
    if (stored.data) {
      if (stored.data.code === 200) {
        return true;
      } else error({ statusCode: 404, message: "Post not found" });
    } else error({ statusCode: 404, message: "Post not found" });
  },
  data: () => ({
    transaction: {
      data: {},
      loader: false
    }
  }),
  mounted() {
    this.show();
    // this.clearLOG()
  },
  methods: {
    show: async function() {
      this.transaction.loader = true;
      try {
        const url = "/transaction";
        const id = this.$route.params.id;
        const __log = await this.$store.dispatch("api/show", { url, id });
        this.transaction.data = __log.data.responses.transaction.data;
        this.transaction.loader = false;
        console.log(this.transaction.data);
      } catch (err) {
        console.error(err);
        this.transaction.loader = false;
      }
    },
    clearLOG: function() {
      console.clear();
    }
  }
};
</script>

<style></style>
