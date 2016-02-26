/* Fix for https://github.com/dockyard/ember-validations/issues/366 */

import Ember from 'ember';

export function initialize(application) {
  let i18n = application.container.lookup('service:i18n');
  i18n.set('locale', 'pt-br'); //set your default locale or compute it
  Ember.I18n = i18n;
}

export default {
  name: 'locale',
  initialize: initialize
};
