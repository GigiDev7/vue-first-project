import { createStore } from 'vuex';
import coachModule from './modules/coaches/index';

const store = createStore({
  state() {
    return {
      userId: 'c5',
    };
  },
  modules: {
    coaches: coachModule,
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
