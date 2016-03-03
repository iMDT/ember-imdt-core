import Ember from 'ember';

export default Ember.Object.extend({
  name: null,
  parent: null,

  label: null,
  icon: null,

  route: null,
  action: null,
  params: {},
  roles: [],

  active: true,
  order: 0,
});
