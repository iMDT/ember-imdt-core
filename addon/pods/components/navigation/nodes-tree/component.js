import CoreComponent from 'ember-imdt-core/component';
import layout from './template';
import Ember from 'ember';

export default CoreComponent.extend({
  layout: layout,
  tagName: 'ul',
  flat: false,

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
