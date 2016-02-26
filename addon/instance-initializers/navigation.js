export function initialize(applicationInstance) {
  const Navigation = applicationInstance.lookup('service:navigation');
  const navigationItems = applicationInstance.lookup('application:main').get('navigation');

  Object.keys(navigationItems).forEach((navigation) => {
    Navigation.add(navigationItems[navigation], navigation);
  });
}

export default {
  name: 'navigation',
  after: 'navigation-acl',
  initialize
};
