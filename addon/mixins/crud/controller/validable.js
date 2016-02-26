import Ember from 'ember';
import EmberValidations from 'ember-validations';

export default Ember.Mixin.create(EmberValidations, {
  setupErrorProperties() {
    let validations = this.get('validations');

    let validationsArray = [];
    for(let v in validations){
      validationsArray.push(v);
    }

    validationsArray.forEach((v) => {
      this.set('firstIteration' + v, true);
      this.set(v + 'Errors', Ember.computed(v, 'errors.' + v, function() {
        if (this.get('firstIteration' + v) !== true) {
          return this.get('errors.' + v);
        }
        this.set('firstIteration' + v, false);
        return null;
      }));
    });
  },

  onModelChangeResetOrSetProps: Ember.observer('model', function(){
    this.setupErrorProperties();
  })
});
