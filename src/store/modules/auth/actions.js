let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'sign in' });
  },
  async signup(context, payload) {
    return context.dispatch('auth', { ...payload, mode: 'sign up' });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let URL =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvDz-V4WYiAg3CI0oqIHyhu5nCNdiOfe8';
    if (mode === 'sign up') {
      URL =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvDz-V4WYiAg3CI0oqIHyhu5nCNdiOfe8';
    }

    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const error = new Error(data.message || `Failed to ${mode}`);
      throw error;
    }

    const expiresIn = +data.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', data.idToken);
    localStorage.setItem('userId', data.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 10000) {
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      });
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer);

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('didAutoLogout');
  },
};
