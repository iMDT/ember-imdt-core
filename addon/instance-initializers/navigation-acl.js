import Ember from 'ember';

function parseRouteName(route) {
  let routes = [],
    routesTmp = [];

  route.replace(/\//, '.').split(/\./).forEach(function(e) {
    routesTmp.push(e);
    routes.push(routesTmp.join('.'));
  });

  return routes;
}

function getRoles(routes, container) {
  let roles = [];

  routes.forEach(function(routeName) {
    let route = container.lookup('route:' + routeName);

    if (!route) {
      return [];
      // throw new Error('Failed to lookup route "' + routeName + '" or it does not exist.');
    }

    let routeRoles = route.get('roles') || Ember.A([]);
    routeRoles = routeRoles.toArray();

    if (_.isEmpty(roles)) {
      roles = routeRoles;
    }

    let intersecRoles = _.intersection(roles, routeRoles);

    if (intersecRoles.length) {
      roles = intersecRoles;
    }
  });

  return roles;
}

function injectRoles(item, applicationInstance) {
  if (item.route) {
    let routes = parseRouteName(item.route);
    let roles = getRoles(routes, applicationInstance);

    item['roles'] = roles;
  }

  if (item.children) {
    item.children.forEach((child) => {
      injectRoles(child, applicationInstance);
    });
  }
}

export function initialize(applicationInstance) {
  let navigationItems = applicationInstance.lookup('application:main').get('navigation');

  Object.keys(navigationItems).forEach((navigation) => {
    navigationItems[navigation].forEach((item) => {
      injectRoles(item, applicationInstance);
    });
  });
}

export default {
  name: 'navigation-acl',
  after: 'ember-simple-auth',
  before: 'navigation',
  initialize
};
