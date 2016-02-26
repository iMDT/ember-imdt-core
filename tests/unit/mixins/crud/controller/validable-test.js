import Ember from 'ember';
import CrudControllerValidableMixin from '../../../mixins/crud/controller/validable';
import { module, test } from 'qunit';

module('Unit | Mixin | crud/controller/validable');

// Replace this with your real tests.
test('it works', function(assert) {
  let CrudControllerValidableObject = Ember.Object.extend(CrudControllerValidableMixin);
  let subject = CrudControllerValidableObject.create();
  assert.ok(subject);
});
