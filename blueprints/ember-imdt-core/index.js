'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    var _this = this;

    return this.addBowerPackagesToProject([{
      name: 'bootstrap-switch',
      target: '^3.3.2'
    }, {
      name: 'selectize',
      target: '~0.12.1'
    }, {
      name: 'bootstrap',
      target: '3.3.6'
    }, {
      name: 'bootswatch',
      target: '3.3.6'
    }, {
      name: 'bootstrap-sass',
      target: 'latest'
    }, {
      name: 'selectize-scss',
      target: 'latest'
    }, {
      name: 'bootstrap-datepicker',
      target: 'latest'
    }, {
      name: 'font-awesome',
      target: 'latest'
    }]).then(function() {
      return _this.addPackagesToProject([{
        name: 'ember-cli-selectize',
        target: '0.4.3'
      }, {
        name: 'ember-power-select',
        target: '0.7.2'
      }, {
        name: 'ember-bootstrap-switch',
        target: '0.2.0'
      }, {
        name: 'ember-imdt-magic-crud',
        target: 'latest'
      }, {
        name: 'ember-cli-sass',
        target: 'latest'
      }, {
        name: 'ember-validations',
        target: '^2.0.0-alpha.4'
      }, {
        name: 'ember-cli-flash',
        target: '1.3.7'
      }, {
        name: 'ember-simple-auth',
        target: '1.0.1'
      }, {
        name: 'ember-imdt-table',
        target: 'latest'
      }, {
        name: 'ember-cli-font-awesome',
        target: 'latest'
      }, {
        name: 'ember-cli-bootstrap-datepicker',
        target: 'latest'
      }, {
        name: 'ember-get-config',
        target: 'latest'
      }]);
    });
  }
};
