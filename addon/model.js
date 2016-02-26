import DS from 'ember-data';

export default DS.Model.extend({
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
