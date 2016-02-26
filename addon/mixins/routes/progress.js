/* globals NProgress */
import Ember from 'ember';

export default Ember.Mixin.create({
  actions: {
    loading() {
      NProgress.start();
      this.router.one('didTransition', () => {
        NProgress.done();
      });
      this._super(...arguments);
      return true;
    },
    error() {
      NProgress.done();
      this._super(...arguments);
      return true;
    }
  }
});
