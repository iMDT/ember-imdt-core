import Ember from 'ember';

export default Ember.Mixin.create({
  /* DIRTY FIX FOR ROLLBACK ON RELANTIONSHIPS */
  rollbackAttributes() {
    this._super(...arguments);
    this.rollbackRelationships();
  },

  rollbackRelationships() {
    let model = this;
    model.eachRelationship((name, meta) => {
      if (meta.kind === 'belongsTo') {
        model.belongsTo(name).reload();
      } else if (meta.kind === 'hasMany') {
        model.hasMany(name).reload();
      }
    });
  },
});
