import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const {
  isEmpty
} = Ember;

const getCookie = function(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length === 2) {
    return parts.pop().split(";").shift();
  }
};

export default Base.extend({
  tokenAttributeName: 'session_token',

  authorize(data, block) {
    const tokenAttributeName = this.get('tokenAttributeName');
    const userToken = data[tokenAttributeName];

    if (!isEmpty(userToken) && getCookie('PD-S-SESSION-ID')) {
      block('Authorization', `Token ${userToken}`);
    }
  }
});
