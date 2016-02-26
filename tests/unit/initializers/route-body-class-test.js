import Ember from 'ember';
import RouteBodyClassInitializer from '../../../initializers/route-body-class';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | route body class', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  RouteBodyClassInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
