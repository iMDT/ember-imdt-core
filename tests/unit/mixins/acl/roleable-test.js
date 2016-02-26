import Ember from 'ember';
import AclRoleableMixin from '../../../mixins/acl/roleable';
import { module, test } from 'qunit';

module('Unit | Mixin | acl/roleable');

// Replace this with your real tests.
test('it works', function(assert) {
  let AclRoleableObject = Ember.Object.extend(AclRoleableMixin);
  let subject = AclRoleableObject.create();
  assert.ok(subject);
});
