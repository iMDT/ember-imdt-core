import Ember from 'ember';
import BubbleAction from 'ember-imdt-core/mixins/components/bubble-action';

import layout from './template';

export default Ember.LinkComponent.extend(BubbleAction, {
  layout: layout,
  tagName: 'a',
  click() {
    var action = this.get('content.action'),
      params = this.get('content.params');

    // this.get('parentView').set('active', true);

    if (action) {
      this.sendAction('action', action, params);
      return;
    }

    this._super(...arguments);
  },
});
