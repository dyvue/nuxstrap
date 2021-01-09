const baseURL = process.env.API_MAIN;
export const state = () => ({});
export const mutations = {};
export const actions = {
  async index({ commit, rootState }, { url, payload }) {
    try {
      const mainURL = baseURL + url;
      const response = await this.$axios.$get(mainURL, {
        params: payload,
        headers: {
          'Authorization': 'Bearer X-ADMIN ' + rootState.auth.token,
        },
      });
      if (response.code == 200) {
        return { data: response };
      }
      else {
        return { data: [] }
      }
    } catch (err) {
      console.log(err);
    }
  },
  async show({ commit }, { url, id }) {
    try {
      const mainURL = baseURL + url + "/" + id;
      const response = await this.$axios.$get(mainURL);
      if (response.code == 200) {
        return { data: response };
      }
      else {
        return { data: [] }
      }
    } catch (err) {
      console.log(err)
    }
  },
  async post({ commit, rootState }, { url, body }) {
    try {
      const mainURL = baseURL + url;
      const response = await this.$axios.$post(mainURL, body, {
        headers: {
          'Authorization': 'Bearer X-ADMIN ' + rootState.auth.token,
        }
      });
      return response
    } catch (err) {
      console.log(err)
    }
  }
};
