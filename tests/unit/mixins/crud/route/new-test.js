import Ember from 'ember';
import CrudRouteNewMixin from '../../../mixins/crud/route/new';
import { module, test } from 'qunit';

module('Unit | Mixin | crud/route/new');

// Replace this with your real tests.
test('it works', function(assert) {
  let CrudRouteNewObject = Ember.Object.extend(CrudRouteNewMixin);
  let subject = CrudRouteNewObject.create();
  assert.ok(subject);
});
