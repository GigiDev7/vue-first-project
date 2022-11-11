import { createStore } from 'vuex';
import coachModule from './modules/coaches/index';
import requestModule from './modules/requests/index';

const store = createStore({
  state() {
    return {
      userId: 'c5',
    };
  },
  modules: {
    coaches: coachModule,
    requests: requestModule,
  },
  getters: {
    userId(state) {
      return state.userId;
    },
  },
});

export default store;
