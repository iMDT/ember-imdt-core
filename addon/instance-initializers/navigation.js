export function initialize(applicationInstance) {
  const Navigation = applicationInstance.lookup('service:navigation');
  const navigationItems = applicationInstance.lookup('application:main').get('navigation');
  const addChildren = function(item, navigation){
    if(item.children){
      item.children.forEach((child) => {
        child.parent = item.name;
        Navigation.add(child, navigation);
        if(child.children){
          addChildren(child, navigation);
        }
      });
    }
  };

  Object.keys(navigationItems).forEach((navigation) => {
    navigationItems[navigation].forEach((item) => {
      addChildren(item, navigation);
    });
    Navigation.add(navigationItems[navigation], navigation);
  });
}

export default {
  name: 'navigation',
  after: 'navigation-acl',
  initialize
};
