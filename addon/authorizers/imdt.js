import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { isEmpty } = Ember;

export default Base.extend({
  tokenAttributeName: 'session_token',

  authorize(data, block) {
    const tokenAttributeName = this.get('tokenAttributeName');
    const userToken          = data[tokenAttributeName];

    if (!isEmpty(userToken)) {
      block('Authorization', `Token ${userToken}`);
    }
  }
});
