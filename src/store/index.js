import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        favoriteCount: 0,
    },
    mutations: {
        updateFavoriteCount(state, payload) {
            this.state.favoriteCount = payload;
        },
    },
    actions: {
        updateFavoriteCount({ commit }, payload) {
            commit('updateFavoriteCount', payload);
        },
    }
});
