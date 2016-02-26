import Ember from 'ember';
import CrudRouteBaseMixin from './base';

export default Ember.Mixin.create(CrudRouteBaseMixin, {
  model(param) {
    return this.store.findRecord(this.get('modelName'), param.id, { reload: true });
  },
  actions: {
    willTransition() {
      this.get('currentModel').rollbackAttributes();
    }
  }
});
