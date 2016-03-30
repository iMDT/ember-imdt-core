import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';

const {
  isEmpty
} = Ember;

export default Base.extend({
  ajax: Ember.inject.service('ajax'),
  serverAuthenticateEndpoint: '/service/auth/login',
  serverInvalidateEndpoint: '/service/auth/logout',
  resourceName: 'name',
  identificationAttributeName: 'login',
  tokenAttributeName: 'session_token',

  restore(data) {
    const tokenAttributeName = this.get('tokenAttributeName');
    const userToken = data[tokenAttributeName];

    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!isEmpty(userToken)) {
        resolve(data);
      } else {
        reject();
      }
    });
  },
  authenticate(identification, password) {
    const serverAuthenticateEndpoint = this.get('serverAuthenticateEndpoint');
    const basicAuth64 = btoa(`${identification}:${password}`);

    let request = {
      url: serverAuthenticateEndpoint,
    };
    if(identification || password) {
      request.headers = {
        Authorization: `Basic ${basicAuth64}`
      };
    }
    return this.get('ajax').get(request);
  },
  invalidate(data) {
    const serverInvalidateEndpoint = this.get('serverInvalidateEndpoint');
    const tokenAttributeName = this.get('tokenAttributeName');
    const userToken = data[tokenAttributeName];

    return new Promise((resolve) => {
      this.get('ajax').get({
        url: serverInvalidateEndpoint,
        headers: {
          'Authorization': `Token ${userToken}`
        }
      }).then(function() {
        resolve(...arguments);
      }).catch(function(reason) {
        console.error('Error when invalidating the authentication. Invalidating session anyways.', reason);
        resolve(...arguments);
        // never reject, we always want the user to logout
        // even when failed to remove the session
        // reject(reason);
      });
    });
  }
});
