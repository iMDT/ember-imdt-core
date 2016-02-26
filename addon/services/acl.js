import Ember from 'ember';
import ENV from 'ember-get-config';

const ROLES = ENV.APP.roles;

export default Ember.Service.extend({
  roleAttributeName: 'roles',
  session: Ember.inject.service('session'),
  user: Ember.computed.reads('session.data.authenticated'),
  roles: ROLES,
  hasRoles(roles) {
    if (!this.get('session.isAuthenticated')) {
      return true;
    }

    const { roleAttributeName, user } = this.getProperties('roleAttributeName', 'user');
    const userRoles = user[roleAttributeName] || [];

    if (_.isEmpty(roles)) {
      return true;
    }

    let intersec = _.intersection(roles, userRoles);
    return intersec.length > 0;
  }
});
