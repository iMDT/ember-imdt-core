import Ember from 'ember';
import CrudRouteBaseMixin from './base';

export default Ember.Mixin.create(CrudRouteBaseMixin, {
  model() {
    return this.store.createRecord(this.get('modelName'));
  },
  deactivate() {
    this.get('currentModel').rollbackAttributes();
  },
});
