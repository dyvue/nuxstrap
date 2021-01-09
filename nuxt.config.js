require('dotenv').config()

export default {
  head: {
    title: "Nuxstrap",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.png" }],
    script: [
      { src: "/js/global/global.min.js", body: true },
      { src: "/js/bootstrap-select/bootstrap-select.min.js", body: true },
      { src: "/js/custom.min.js", body: true },
      { src: "/js/deznav-init.js", body: true },
    ]
  },
  css: [
    "@/assets/css/style.css",
    "@/assets/css/bootstrap-select/bootstrap-select.min.css",
    "@/assets/css/custom.css"
  ],
  plugins: [
    { src: '@/plugins/vue@fullscreen', ssr: false },
    { src: '@/plugins/vue@modal', ssr: false },
    { src: '@/plugins/helpers/index' }
  ],
  components: true,
  buildModules: [],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],
  env: {
    API_MAIN: process.env.API_MAIN
  },
  build: {},
};
