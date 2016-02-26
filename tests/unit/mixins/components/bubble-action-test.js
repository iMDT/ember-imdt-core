import Ember from 'ember';
import ComponentsBubbleActionMixin from '../../../mixins/components/bubble-action';
import { module, test } from 'qunit';

module('Unit | Mixin | components/bubble action');

// Replace this with your real tests.
test('it works', function(assert) {
  let ComponentsBubbleActionObject = Ember.Object.extend(ComponentsBubbleActionMixin);
  let subject = ComponentsBubbleActionObject.create();
  assert.ok(subject);
});
