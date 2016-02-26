import Ember from 'ember';

export default Ember.Mixin.create({
  action: 'sendAction',
  actions: {
    sendAction() {
      this.sendAction.call(this, 'action', ...arguments);
    },
  }
});
