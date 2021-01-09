import VueCookie from "vue-cookie";
import CookieParser from "cookieparser";

const baseURL = process.env.API_MAIN;

export const state = () => ({
  auth: {
    data: null,
    token: null
  }
});

export const mutations = {
  SET_AUTH_USER(state, { user, token }) {
    state.auth = {
      data: user,
      token: token
    }
  }
};

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    if (req && req.headers && req.headers.cookie) {
      const cookie_parsed = CookieParser.parse(req.headers.cookie);
      const auth_data = cookie_parsed._____AuthData,
      auth_token = cookie_parsed._____AuthToken
      commit("SET_AUTH_USER", { user: auth_data, token: auth_token});
    }
  },
  async login({ commit }, payload) {
    try {
      const url = baseURL + "/admin/login/attempt"
      const response = await this.$axios.$post(url, payload);
      if (response.code == 200) {
        const auth_data = JSON.stringify(response.responses.admin.data),
        auth_token = response.responses.admin_token.data.token
        VueCookie.set("_____AuthData", auth_data)
        VueCookie.set("_____AuthToken", auth_token)
        commit("SET_AUTH_USER", { user: auth_data, token: auth_token});
        return { data: response };
      }
    } catch (error) {
      throw error;
    }
  },
  async logout({ commit }) {
    try {
      VueCookie.delete("_____AuthData")
      VueCookie.delete("_____AuthToken")
      commit("SET_AUTH_USER", { user: null, token: null});
    } catch (error) {
      console.error(error);
    }
  }
};
