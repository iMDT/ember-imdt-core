import Ember from 'ember';
import DS from 'ember-data';

export function filterByAtivoOrCurrent(row, related, kind) {
  if(kind === 'belongsTo') {
    if(related) {
      return row.get('id') === related.get('id') || row.get('ativo');
    }

    return row.get('ativo');
  } else if(kind === 'hasMany') {
    if(related) {
      return related.isAny('id', row.get('id')) || row.get('ativo');
    }

    return row.get('ativo');
  }

  return true;
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
      return DS.PromiseArray.create({
        promise: Promise.all([this.store.findAll(meta.type), this.get(`model.${name}`)]).then((values) => {
          let [all, related] = values;
          return all.filter(row => callback(row, related, meta.kind));
        })
      });
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
