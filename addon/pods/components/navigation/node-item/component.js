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

  setupVisibility: function() {
    const Acl = this.get('acl');
    const roles = this.get('content.roles');

    this.set('isVisible', Acl.hasRoles(roles));
  }.on('init'),

  // Brute-force solutuin
  // https://github.com/alexspeller/ember-cli-active-link-wrapper/issues/4
  active: Ember.computed('childLinkViews.@each.active', function() {
    return Ember.A(this.get('childLinkViews')).isAny('active');
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
