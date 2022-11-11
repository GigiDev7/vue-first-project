export default {
  registerCoach(context, payload) {
    const coach = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas,
      id: context.rootGetters.userId,
    };
    context.commit('registerCoach', coach);
  },
};
