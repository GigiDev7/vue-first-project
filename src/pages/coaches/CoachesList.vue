<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <section>
      <coach-filter @change-filter="setFilters"></coach-filter>
    </section>
    <section>
      <base-card>
        <div class="controls">
          <base-button @click="loadCoaches(true)" mode="outline"
            >Refresh</base-button
          >
          <base-button
            v-if="!isCoach && !isLoading && isLoggedIn"
            link
            to="/register"
            >Register as Coach</base-button
          >
          <base-button
            link
            to="/auth?redirect=register"
            v-if="!isLoggedIn && !isLoading"
            >Login to register as Coach</base-button
          >
        </div>
        <div v-if="isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul v-if="hasCoaches">
          <coach-item
            v-for="coach in filteredCoaches"
            :coach="coach"
            :key="coach.id"
          ></coach-item>
        </ul>
        <h3 v-if="!hasCoaches && !isLoading">No coaches found.</h3>
      </base-card>
    </section>
  </div>
</template>

<script>
//import { mapGetters } from 'vuex';
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  components: {
    CoachItem,
    CoachFilter,
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true,
      },
      isLoading: false,
      error: null,
    };
  },
  computed: {
    //...mapGetters('coaches', ['coaches']),
    filteredCoaches() {
      const coaches = this.$store.getters['coaches/coaches'];
      return coaches.filter((el) => {
        if (this.activeFilters.frontend && el.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && el.areas.includes('backend')) {
          return true;
        }
        if (this.activeFilters.career && el.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },

    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    handleError() {
      this.error = null;
    },
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    },
    async loadCoaches(isRefresh = false) {
      this.isLoading = true;
      try {
        await this.$store.dispatch('coaches/loadCoaches', {
          refresh: isRefresh,
        });
      } catch (error) {
        this.error = error.message || 'Something went wrong!';
      }
      this.isLoading = false;
    },
  },
  created() {
    this.loadCoaches();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
