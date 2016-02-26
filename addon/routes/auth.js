import Ember from 'ember';
import LayoutableRoute from 'ember-imdt-core/mixins/routes/layoutable';
import ProgressIndicator from 'ember-imdt-core/mixins/routes/progress';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(ProgressIndicator, LayoutableRoute, UnauthenticatedRouteMixin, {
  layout: 'auth',

  beforeModel() {
    this.transitionTo('auth.login');
  },

  setupController(controller, model){
    this._super(controller, model);
  }
});
