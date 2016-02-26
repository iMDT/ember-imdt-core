import ENV from 'ember-get-config';
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export const ROLES = ENV.APP.roles;

export default Ember.Mixin.create(AuthenticatedRouteMixin, {
  acl: Ember.inject.service('acl'),

  roles: Ember.computed(function() {
    return Ember.A();
  }),

  beforeModel: function() {
    this._super(...arguments);

    const roles = this.get('roles');
    const Acl = this.get('acl');

    if (!Acl.hasRoles(roles)) {
      this.transitionTo('unauthorized');
    }
  },
});
