import DS from 'ember-data';
import RollbackRelationships from 'ember-imdt-core/mixins/models/rollback-relationships';

export default DS.Model.extend(RollbackRelationships, {});
