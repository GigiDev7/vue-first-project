export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };

    const response = await fetch(
      `https://vue-first-app-9bb00-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to send request!');
      throw error;
    }

    newRequest.id = data.name;
    newRequest.coachId = payload.coachId;

    context.commit('addRequest', newRequest);
  },

  async fetchRequests(context) {
    const coachId = context.rootGetters.userId;

    const response = await fetch(
      `https://vue-first-app-9bb00-default-rtdb.firebaseio.com/requests/${coachId}.json`
    );

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || 'Failed to fetch requests!');
      throw error;
    }

    const requests = [];

    for (const key in data) {
      const req = {
        id: key,
        coachId,
        userEmail: data[key].userEmail,
        message: data[key].message,
      };
      requests.push(req);
    }

    context.commit('setRequests', requests);
  },
};
