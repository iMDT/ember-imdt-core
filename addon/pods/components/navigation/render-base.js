import Ember from 'ember';

export default Ember.Mixin.create({
  navigationService: Ember.inject.service('navigation'),
  name: Ember.computed('navigationService.content.[]', function() {
    return this.get('navigationService').getDefaultNavigationName();
  }),

  nameDidChange: Ember.observer('name', function(){
    this.setupNavigation();
  }),

  minDepth: 0,
  maxDepth: 100,
  depth: false,
  onlyActiveBranch: false,
  onlyActiveDepth: false,

  setupNavigation: function() {
    this.set('navigation', this.get('navigationService').findNavigation(this.get('name')));
  }.on('init'),

  nodes: Ember.computed('navigation', function() {
    let min = this.get('depth') || this.get('minDepth'),
      max = this.get('depth') || this.get('maxDepth');

    return this.get('navigation').findByDepth(min, max);
  }),
  rootNodes: Ember.computed.filter('nodes', function(n) {
    return this.get('minDepth') === n.get('depth');
  }),

  actions: {
    sendAction(action) {
      this.set('action', action);
      this.sendAction.call(this, 'action', ...(Array.prototype.slice.call(arguments, 1)));
    },
  }
});
