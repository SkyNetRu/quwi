<template>
  <div>
    <Navbar/>
    <section id="content">
      <div class="app-projects-index">
        <div class="app-top-container top-row">
          <div class="b-center">
            <div class="b-left">
              Проекты
            </div>
          </div>
        </div>
        <div class="b-projects">
          <div class="b-project-box js-center-col" v-for="project in projects"
                 :key="project.id" @click="$router.push('/project-edit/'+project.id)">
              <div class="b-project-content">
                <div class="b-logo">
                  <div class="b-avatar">
                    <div v-if="!project.logo_url" class="e-empty-avatar m-6"
                         style="height: 51px; width: 51px; font-size: 21px;">
                      {{avatar_text(project.name)}}
                    </div>
                    <img v-else width="51" height="51" :src="project.logo_url">
                  </div>
                </div>
                <div class="b-name">
                  <div class="e-name">{{project.name}}</div>
                </div>
                <div class="b-status " :class="{'m-active': project.is_active}">
                  {{ project.is_active ? 'Active' : 'Inactive'}}
                </div>

                <div class="b-stats-container">
                  <div class="b-stats-row">
                    <div class="b-stats-row-label">
                      Time this week
                    </div>
                    <span>{{timeConvert(project.spent_time_week)}}</span>
                  </div>
                  <div class="b-stats-row">
                    <div class="b-stats-row-label">
                      This month
                    </div>
                    <span>{{timeConvert(project.spent_time_month)}}</span>
                  </div>
                  <div class="b-stats-row">
                    <div class="b-stats-row-label">
                      Total
                    </div>
                    <span>{{timeConvert(project.spent_time_all)}}</span>
                  </div>
                </div>
              </div>

            </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    async asyncData({store}) {
      await store.dispatch('projects/getAllProjects');
    },
    middleware: 'auth',
    data() {
      return {}
    },
    methods: {
      avatar_text(name) {
        let name_arr = name.split(' ', 2);
        return name_arr[0][0].toUpperCase() + name_arr[1][0].toUpperCase();
      },
      timeConvert(time) {
        if (!time) {
          return '00:00:00';
        }
        var sec_num = parseInt(time, 10);
        var hours = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        return hours + ':' + minutes + ':' + seconds;
      }
    },
    computed: {
      projects() {
        return this.$store.state.projects.projects;
      },

    }
  }
</script>

<style>

</style>

