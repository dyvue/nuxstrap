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
          <li class="mx-2"> - </li>
          <li class="breadcrumb-item active">
            <a href="javascript:void(0)">Transaksi</a>
          </li>
        </ol>
      </div>
    </div>

    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <h4 class="card-title">
              Data Transaksi
            </h4>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table table-responsive-md">
                <thead>
                  <tr>
                    <th style="min-width: 100px;"><strong>Kode</strong></th>
                    <th><strong>Tanggal Transaksi</strong></th>
                    <th><strong>Nama Penjual</strong></th>
                    <th><strong>Nama Pembeli</strong></th>
                    <th><strong>Status</strong></th>
                    <th><strong>Total / Metode Pembayaran</strong></th>
                    <th><strong>Opsi</strong></th>
                  </tr>
                </thead>
                <tbody v-if="transaction_status.loading">
                  <tr v-for="index of 4" :key="index">
                    <td v-for="index of 7" :key="index">
                      <span class="shine"></span>
                    </td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr v-for="(item, index) of transactions" :key="index">
                    <td><strong>#{{ item.code }}</strong></td>
                    <td>{{ $helpers.date("DD MMMM YYYY", item.created_at) }}</td>
                    <td>{{ item.captured_users.seller.name }}</td>
                    <td>{{ item.captured_users.buyer.name }}</td>
                    <td>
                      <span v-if="item.status === 'waiting_for_payment'" class="badge light badge-primary">Menunggu
                        Pembayaran</span>
                      <span v-else-if="item.status === 'pop_uploaded'" class="badge light badge-warning">Menunggu
                        Verifikasi Pembayaran</span>
                      <span v-else-if="item.status === 'payment_verified'" class="badge light badge-success">Pembayaran
                        Terverifikasi</span>
                      <span v-else-if="item.status === 'dispatch'" class="badge light badge-primary">Sedang dalam
                        pengiriman</span>
                      <span v-else-if="item.status === 'arrived'" class="badge light badge-success">Barang sudah
                        sampai</span>
                      <span v-else-if="item.status === 'done'" class="badge light badge-success">Transaksi
                        selesai</span>
                      <span v-else-if="item.status === 'failed'" class="badge light badge-danger">Transaksi gagal</span>
                    </td>
                    <td>{{ $helpers.currency.idr(item.grand_total) }} / {{ item.payment_method.name }}</td>
                    <td>
                      <div class="dropdown">
                        <button type="button" class="btn btn-success light sharp" data-toggle="dropdown">
                          <svg width="20px" height="20px" viewBox="0 0 24 24" version="1.1">
                            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                              <rect x="0" y="0" width="24" height="24" />
                              <circle fill="#000000" cx="5" cy="12" r="2" />
                              <circle fill="#000000" cx="12" cy="12" r="2" />
                              <circle fill="#000000" cx="19" cy="12" r="2" />
                            </g>
                          </svg>
                        </button>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" href="javascript:void(0)" @click="openMDLChangeStatus(item)">Ubah
                            Status</a>
                          <nuxt-link :to="{ name: 'transaction-id', params: { id: item.code } }" class="dropdown-item" href="javascript:void(0)">Selengkapnya</nuxt-link>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Paginate :total="index_payload.total" :offset="index_payload.page" :limit="index_payload.limit"
              @go_to_page="goToPage" />
          </div>
        </div>
      </div>
    </div>

    <modal name="MDLchangeStatus" height="auto">
      <div class="p-4">
        <h4>Ubah Status</h4>
        <hr>
        <form @submit.prevent="submit" class="mt-4">
          <div class="form-group">
            <label>Status <span class="text-danger">*</span></label>
            <select class="form-control" v-model="form_change_status.v_status">
              <option v-for="(item, index) of form_change_status.opt_status" :key="index" :value="item.name">
                {{ item.display_name }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label>PIN Otentikasi <span class="text-danger">*</span></label>
            <input class="form-control" type="password" name="pin" id="pin" v-model="form_change_status.v_pin" required>
          </div>
          <div class="mt-5 text-right">
            <button type="submit" class="btn btn-sm btn-primary">Submit</button>
          </div>
        </form>
      </div>
    </modal>
  </div>
</template>

<script>
  import Paginate from "@/components/basics/Paginate"
  export default {
    head: {
      title: 'Transaction | Nuxtstrap'
    },
    middleware: 'auth',
    asyncData() {
      return new Promise((resolve) => {
        setTimeout(function () {
          resolve()
        }, 100)
      })
    },
    data: () => ({
      transactions: [],
      transaction_status: {
        loading: true
      },
      index_payload: {
        page: 1,
        limit: 10,
        total: 0
      },
      form_change_status: {
        opt_status: [],
        v_status: "",
        v_code: "",
        v_pin: "",
      }
    }),
    mounted() {
      this.index()
      this.clearLOG()
    },
    methods: {
      goToPage: function (limit, offset) {
        this.index_payload.page = offset
        this.index(this.index_payload.page, this.index_payload.limit)
      },
      index: async function (page, limit) {
        this.transaction_status.loading = true
        try {
          const url = "/transaction"
          const payload = {
            page: page,
            limit: limit
          }
          const __log = await this.$store.dispatch('api/index', { url, payload })
          this.index_payload.total = __log.data.responses.transaction.total
          this.transactions = __log.data.responses.transaction.data
          this.transaction_status.loading = false
        }
        catch (err) {
          console.error(err)
          this.transaction_status.loading = false
        }
      },
      openMDLChangeStatus: function (current_item) {
        this.form_change_status.opt_status = [
          {
            name: "waiting_for_payment",
            display_name: "Menunggu Pembayaran"
          },
          {
            name: "pop_uploaded",
            display_name: "Menunggu Verifikasi Pembayaran"
          },
          {
            name: "payment_verified",
            display_name: "Pembayaran Terverifikasi"
          },
          {
            name: "dispatch",
            display_name: "Sedang dalam pengiriman"
          },
          {
            name: "arrived",
            display_name: "Barang sudah sampai"
          },
          {
            name: "done",
            display_name: "Transaksi selesai"
          },
          {
            name: "failed",
            display_name: "Transaksi gagal"
          }
        ]
        this.form_change_status.v_code = current_item.code
        this.form_change_status.v_status = current_item.status
        this.$modal.show('MDLchangeStatus')
      },
      closeMDLChangeStatus: function () {
        this.$modal.hide('MDLchangeStatus')
      },
      submit: async function () {
        try {
          const url = "/transaction/update/" + this.form_change_status.v_code,
            body = {
              status: this.form_change_status.v_status,
              pin: this.form_change_status.v_pin
            }
          const __log = await this.$store.dispatch('api/post', { url, body })
          console.log(__log)
          this.closeMDLChangeStatus()
          this.index()
        }
        catch (err) {
          console.error(err)
        }
      },

      // HELP
      clearLOG: function () {
        console.clear()
      }
    }
  }
</script>

<style>
  .shine {
    background: #f6f7f8;
    background-image: linear-gradient(to right, #f6f7f8 0%, #edeef1 20%, #f6f7f8 40%, #f6f7f8 100%);
    background-repeat: no-repeat;
    background-size: 800px 104px;
    display: inline-block;
    position: relative;

    -webkit-animation-duration: 1s;
    -webkit-animation-fill-mode: forwards;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: placeholderShimmer;
    -webkit-animation-timing-function: linear;
  }

  @-webkit-keyframes placeholderShimmer {
    0% {
      background-position: -468px 0;
    }

    100% {
      background-position: 468px 0;
    }
  }

  span.shine {
    height: 40px;
    margin: 5px 0;
    width: 100%;
    border-radius: 5px;
  }
</style>