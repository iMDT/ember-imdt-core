import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service('session'),

  actions: {
    authenticate() {
      let { identification, password } = this.getProperties('identification', 'password');

      this.get('session')
        .authenticate('authenticator:imdt', identification, password)
        .then(() => {
          this.get('flashMessages').clearMessages();
        })
        .catch((/*reason*/) => {
          this.get('flashMessages').danger('Usuário ou senha inválidos.');
        });
    }
  }
});
