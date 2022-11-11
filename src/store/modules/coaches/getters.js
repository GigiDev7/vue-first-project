export default {
  coaches(state) {
    return state.coaches;
  },
  hasCoaches(state) {
    return state.coaches.length > 0;
  },
  isCoach(_, getters, _2, rootGetters) {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;

    return coaches.some((el) => el.id === userId);
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) {
      return true;
    }

    const currentTime = new Date().getTime();
    const diff = currentTime - lastFetch;

    return diff / 1000 > 60;
  },
};
