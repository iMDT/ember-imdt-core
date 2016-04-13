import Ember from 'ember';

export function filterByAtivoOrCurrent(model, name, meta) {
  let filter = {
    id: {
      value: meta.kind === 'belongsTo' ? model.get(`${name}.id`) : model.hasMany(name).ids().join(','),
      logic: 'or'
    },
    ativo: true
  };

  return filter;
}

export function findAllRelationships(model) {
  let promises = [];

  model.eachRelationship((name, meta) => {
    promises.push(this.store.findAll(meta.type));
  });

  return promises;
}

export function filterAllRelationships(model, callback, excludedRelations = []) {
  let properties = {};

  model.eachRelationship((name, meta) => {
    if(excludedRelations.contains(name)) {
      return;
    }

    properties[name] = Ember.computed(`model.id`, function() {
      return this.store.fetch(meta.type, callback(model, name, meta), 'nome');
    });

    // properties[name] = DS.PromiseArray.create({
    //   promise: Promise.all([this.store.findAll(meta.type), model.get(name)]).then((values) => {
    //     let [all, related] = values;
    //     return all.filter(row => callback(row, related, meta.kind));
    //   })
    // });
  });

  return properties;
}
