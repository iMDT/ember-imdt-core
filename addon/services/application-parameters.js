import Ember from 'ember';
import ENV from 'ember-get-config';

const configs = ENV.APP.applicationParameters;

export default Ember.Service.extend({
  init() {
    for(let item in configs){
      this.set(item, configs[item]);
    }
  }
});
