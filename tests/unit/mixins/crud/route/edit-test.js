import Ember from 'ember';
import CrudRouteEditMixin from '../../../mixins/crud/route/edit';
import { module, test } from 'qunit';

module('Unit | Mixin | crud/route/edit');

// Replace this with your real tests.
test('it works', function(assert) {
  let CrudRouteEditObject = Ember.Object.extend(CrudRouteEditMixin);
  let subject = CrudRouteEditObject.create();
  assert.ok(subject);
});
