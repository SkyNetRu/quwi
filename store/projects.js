
// State
export const state = () => ({
  projects  : [],
  current_project: null
});


// Mutations
export const mutations = {
  setProjects(state, projects) {
    state.projects = projects;
  },
  setCurrentProject (state, project) {
    state.current_project = project;
  },
  setProjectName (state, name) {
    state.current_project.name = name;
  }
}

// Actions
export const actions = {

  setProjectName ({commit}, name) {
    commit('setProjectName', name);
  },
  async getProject ({commit}, id) {
    try {
      let response = await this.$axios.$get("/projects-manage/" + id);
      commit('setCurrentProject', response.project);

    } catch (e) {
      console.log('e', e);
    }
  },
  async getAllProjects ({commit}) {
    try {
      let response = await this.$axios.$get("/projects-manage/index");
      commit('setProjects', response.projects);

    } catch (e) {
      console.log('e', e);
    }
  },
  async saveProject ({commit, state}) {
    try {
      await this.$axios.$post("/projects-manage/update?id="+ state.current_project.id, {name : state.current_project.name});
    } catch (e) {
      console.log('e', e);
    }
  }
}
