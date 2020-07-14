<template>
  <div>
    <Navbar/>
    <section id="content">
      <div data-uid="_uid" class="app-projects-edit">
        <div class="app-top-container top-row">
          <div class="b-center">
            <nuxt-link :to="{path: '/'}">
              <button type="button" class="btn btn-light-grey">Назад</button>
            </nuxt-link>
          </div>
        </div>
        <div class="b-page-content">
          <div class="b-edit-project js-center-col">
            <form class="app-form b-project">
              <div class="b-columns">
                <div class="b-left">
                  <div class="float">
                    <div class="b-row m-name">
                      <div class="b-label">
                        <label for="project_name">Name</label></div>
                      <div class="b-input">
                        <input autocomplete="false" maxlength="255" spellcheck="false" type="text"
                               name="name" id="project_name" v-model="project_name">
                        <div class="btn" style="width: 46.5px;" @click="saveProject()">
                          <span class="e-text">OK</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: "project-edit",
    validate ({ params }) {
      return /^\d+$/.test(params.id)
    },
    async asyncData({store, route}) {
      let id = route.params.id;
      await store.dispatch('projects/getProject', id);
    },
    middleware: 'auth',
    methods: {
      async saveProject () {
        await this.$store.dispatch('projects/saveProject');
        this.$router.push('/');
      }
    },
    computed: {
      project_name: {
        get: function () {
          return this.$store.state.projects.current_project.name;
        },
        set: function (name) {
          this.$store.dispatch('projects/setProjectName', name);
        }
      }
    }
  }
</script>

<style scoped>

</style>
