import Ember from 'ember';
import CoreComponent from 'ember-imdt-core/component';
import layout from './template';

export default CoreComponent.extend({
  layout: layout,
  tagName: 'a',
  attributeBindings: ['data-toggle', 'data-target', 'data-parent'],
  classNames: ['dropdown-toggle'],
  classNameBindings: ['active'],
  href: '#',


  // Brute-force solutuin
  // https://github.com/alexspeller/ember-cli-active-link-wrapper/issues/4
  active: Ember.computed('childLinkViews.@each.active', function() {
    return Ember.A(this.get('childLinkViews')).isAny('active');
  }),

  isVisible: Ember.computed('childLinkViews.@each.isVisible', function() {
    const dropdownView = this.get('parentView.childViews').slice(-1)[0];
    if(dropdownView) {
      return Ember.A(dropdownView.get('childViews')).isAny('isVisible');
    }

    return true;
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
