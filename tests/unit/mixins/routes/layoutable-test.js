import Ember from 'ember';
import RoutesLayoutableMixin from '../../../mixins/routes/layoutable';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/layoutable');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutesLayoutableObject = Ember.Object.extend(RoutesLayoutableMixin);
  let subject = RoutesLayoutableObject.create();
  assert.ok(subject);
});
