import { createStore } from 'vuex';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ws.audioscrobbler.com/2.0',
});

const store = createStore({
  state () {
    return {
      user: null
    }
  },
  getters: {
    getUser (state) {
      return state.user;
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    }
  },
  actions: {
    setUser ({ commit }, user) {
      commit('setUser', user);
    },
    fetchSongByTitle (_, title) {
      return axiosInstance.get(`?method=track.search&track=${title}&api_key=${process.env.VUE_APP_API_KEY}&format=json`);
    }
  },

});

export default store;
