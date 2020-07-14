// State
export const state = () => ({
  user  : null
});


// Mutations
export const mutations = {
  setUser(state, user) {
    state.user = user;
  },
}

// Actions
export const actions = {
  setUser({commit}, user) {
    commit('setUser', user);
  }
}
