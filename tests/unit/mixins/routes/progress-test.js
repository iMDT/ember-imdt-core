import Ember from 'ember';
import RoutesProgressMixin from '../../../mixins/routes/progress';
import { module, test } from 'qunit';

module('Unit | Mixin | routes/progress');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutesProgressObject = Ember.Object.extend(RoutesProgressMixin);
  let subject = RoutesProgressObject.create();
  assert.ok(subject);
});
