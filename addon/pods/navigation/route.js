import Ember from 'ember';

export default Ember.Mixin.create({
  navigationService: Ember.inject.service('navigation'),
  activate() {
    let sideMenuName = this.get('sideMenuName');

    this.controllerFor('application').setProperties({
      showSidebar: true,
      sidebarName: sideMenuName
    });
  },
  deactivate() {
    this.controllerFor('application').set('showSidebar', false);
  }
});
