import CoreComponent from 'ember-imdt-core/component';
import NavigationRenderBaseComponent from 'ember-imdt-core/pods/components/navigation/render-base';
import layout from './template';

export default CoreComponent.extend(NavigationRenderBaseComponent, {
  layout: layout,
  onlyActiveBranch: true,
  flat: true
});
