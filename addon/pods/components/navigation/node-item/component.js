import Ember from 'ember';
import CoreComponent from 'ember-imdt-core/component';
import layout from './template';

export default CoreComponent.extend({
  acl: Ember.inject.service('acl'),

  layout: layout,
  tagName: 'li',
  classNameBindings: ['active', 'children:dropdown'],

  children: Ember.computed('content.name', function() {
    return this.get('navigation').findChildren(this.get('content.name'), this.get('nodes'));
  }),

  setupParent: function() {
    let parentNode = this.get('navigation.nodes').findBy('name', this.get('content.parent'));
    this.set('content.parentNode', parentNode);
  }.on('init'),

  setupVisibility: function() {
    const Acl = this.get('acl');
    const roles = this.get('content.roles');
    let shouldBeVisible = true;

    if(this.get('onlyActiveDepth')) {
      let parentNode = this.get('content.parentNode');
      if(parentNode) {
        shouldBeVisible = parentNode.get('active');
      }
    }


    this.set('isVisible', Acl.hasRoles(roles) && shouldBeVisible);
  }.on('init').observes('content.parentNode.active'),

  // Brute-force solutuin
  // https://github.com/alexspeller/ember-cli-active-link-wrapper/issues/4
  active: Ember.computed('childLinkViews.@each.active', function() {
    return Ember.A(this.get('childLinkViews')).isAny('active');
  }),

  activeDidChange: Ember.observer('active', function() {
    this.set('content.active', this.get('active'));
  }),

  didRender: function() {
    Ember.run.schedule('afterRender', this, function() {
      var childLinkElements = this.$('a.ember-view');

      var childLinkViews = childLinkElements.toArray().map(view =>
        this._viewRegistry[view.id]
      );

      this.set('childLinkViews', childLinkViews);
    });
  }
});
