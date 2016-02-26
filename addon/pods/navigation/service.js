/* global _ */
import Ember from 'ember';

import Navigation from 'ember-imdt-core/pods/navigation/model';
import NavigationNode from 'ember-imdt-core/pods/navigation/node/model';

const DEFAULT_NAVIGATION_NAME = 'main';

export default Ember.Service.extend({
  store: Ember.inject.service('store'),
  content: Ember.A([]),

  findNavigation(name) {
    if (this.get('content').isAny('name', name)) {
      return this.get('content').findBy('name', name);
    }

    return false;
  },

  addNavigation(navigation) {
    let navigationObject = this.findNavigation(navigation.name);

    if (navigationObject) {
      return navigationObject;
    }

    navigationObject = Navigation.create(navigation);
    return this.get('content').pushObject(navigationObject);
  },

  add(nodes, navigation = DEFAULT_NAVIGATION_NAME) {
    const NavigationObject = this.addNavigation({
      name: navigation
    });

    if (!_.isArray(nodes)) {
      nodes = [nodes];
    }

    let nodesMapped = nodes.map((n) => NavigationNode.create(n));
    return NavigationObject.get('nodes').pushObjects(nodesMapped);
  },

  getDefaultNavigationName() {
    return DEFAULT_NAVIGATION_NAME;
  }
});
