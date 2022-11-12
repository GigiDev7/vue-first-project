export default {
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId;
    const coach = {
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas,
    };

    const token = context.rootGetters.token;

    const response = await fetch(
      `https://vue-first-app-9bb00-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=${token}`,
      {
        method: 'PUT',
        body: JSON.stringify(coach),
      }
    );

    //const data = await response.json();

    if (!response.ok) {
      //error
    }

    context.commit('registerCoach', {
      ...coach,
      id: userId,
    });
  },

  async loadCoaches(context, payload) {
    if (!context.getters.shouldUpdate && !payload.refresh) {
      return;
    }

    const response = await fetch(
      `https://vue-first-app-9bb00-default-rtdb.firebaseio.com/coaches.json`
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to load!');
      throw error;
    }

    const coaches = [];

    for (const key in data) {
      const coach = {
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        areas: data[key].areas,
        id: key,
      };
      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
    context.commit('setFetchTime');
  },
};
