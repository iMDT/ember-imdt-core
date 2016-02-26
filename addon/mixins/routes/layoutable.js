import Ember from 'ember';

export default Ember.Mixin.create({
  layout: Ember.computed(() => 'main'),
  renderTemplate: function() {
    this.render('layouts.' + this.get('layout'));
  }
});
