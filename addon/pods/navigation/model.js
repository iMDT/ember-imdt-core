import Ember from 'ember';

function mapDepth(nodes, depth) {
  nodes.forEach((node) => {
    node.set('depth', depth);
    mapDepth.call(this, this.findChildren(node.get('name')), depth + 1);
  });
}

export default Ember.Object.extend({
  init() {
    this.set('nodes', Ember.A([]));
    this._super(...arguments);
  },

  name: null,
  rootNodes: Ember.computed.filterBy('nodes', 'parent', null),

  nodeParentDidChange: Ember.observer('nodes.[]', function() {
    mapDepth.call(this, this.get('rootNodes'), 0);
  }),

  findChildren(parentName, nodes) {
    return (nodes || this.get('nodes')).filterBy('parent', parentName);
  },

  findByDepth(min, max) {
    return this.get('nodes').filter((node) => {
      return node.get('depth') >= min && node.get('depth') <= max;
    });
  }
});
