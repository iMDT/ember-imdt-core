import Ember from 'ember';

export default Ember.Mixin.create({
  transitionToName: '',
  modelName: '',

  messages: {
    saved: 'Registro salvo com sucesso!',
    deleted: 'Registro excluido com sucesso!',
  },

  handleSaveSuccess() {
    return this.transitionTo(this.get('transitionToName'))
      .then(() => this.get('flashMessages').success(this.get('messages.saved')));
  },

  handleDeleteSuccess() {
    return this.transitionTo(this.get('transitionToName'))
      .then(() => this.get('flashMessages').success(this.get('messages.deleted')));
  },

  handleError(e) {
    console.error(e.stack);
    e.errors.forEach(error => this.get('flashMessages').danger(error.message || error.detail));
  },

  doSave() {
    return new Promise((resolve, reject) => {
      this.get('currentModel').save()
        .then((row) => {
          resolve(row);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },

  actions: {
    save() {
      this.doSave()
        .then(() => this.handleSaveSuccess())
        .catch((e) => this.handleError(e));
    },

    cancel() {
      this.transitionTo(this.get('transitionToName'));
    },

    delete() {
      this.get('currentModel').destroyRecord()
        .then(() => this.handleDeleteSuccess())
        .catch((e) => this.handleError(e));
    }
  }
});
