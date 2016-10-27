import Ember from 'ember';
import CrudRouteBaseMixin from './base';

export default Ember.Mixin.create(CrudRouteBaseMixin, {
  model(param) {
    return this.store.findRecord(this.get('modelName'), param.id);
  },
  actions: {
    willTransition() {
      if(!this.get('currentModel').get('isDeleted')) {
        this.get('currentModel').rollbackAttributes();
      }
    }
  }
});
