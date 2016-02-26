import Ember from 'ember';
import CrudRouteBaseMixin from '../../../mixins/crud/route/base';
import { module, test } from 'qunit';

module('Unit | Mixin | crud/route/base');

// Replace this with your real tests.
test('it works', function(assert) {
  let CrudRouteBaseObject = Ember.Object.extend(CrudRouteBaseMixin);
  let subject = CrudRouteBaseObject.create();
  assert.ok(subject);
});
