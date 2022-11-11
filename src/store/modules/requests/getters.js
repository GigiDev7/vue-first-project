export default {
  requests(state, _, _2, rootGetters) {
    const coachId = rootGetters.userId;
    return state.requests.filter((el) => el.coachId === coachId);
  },
  hasRequests(_, getters) {
    return getters.requests.length > 0;
  },
};
