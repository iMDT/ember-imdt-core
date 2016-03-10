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
    console.error(e);
    this.get('currentModel.errors.base').forEach(error => this.get('flashMessages').danger(error.message || error.detail));
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
      return this.doSave()
        .then(() => this.handleSaveSuccess())
        .catch((e) => this.handleError(e));
    },

    cancel() {
      return this.transitionTo(this.get('transitionToName'));
    },

    delete() {
      return this.get('currentModel').destroyRecord()
        .then(() => this.handleDeleteSuccess())
        .catch((e) => this.handleError(e));
    }
  }
});
