/* global requirejs, require */
import Ember from 'ember';

export default Ember.Object.extend({
  modulePrefix: null,

  map: function(context) {
    const resources = {};
    const paths = {};

    Object.keys(requirejs._eak_seen)
      .filter((key) => {
        return /router$/.test(key);
      })
      .filter((key) => {
        return key.indexOf(this.modulePrefix) === -1;
      })
      .filter((key) => {
        return key.indexOf('core/') === -1 && key !== 'ember-router';
      })
      .forEach((key) => {
        var module = require(key, null, null, true);
        if (!module || !module.default) {
          throw new Error(key + ' must export a route map.');
        }

        var mapObj = module.default;

        if (typeof mapObj === 'function') {
          mapObj = {
            resource: 'root',
            map: mapObj
          };
        }

        if (!resources[mapObj.resource]) {
          resources[mapObj.resource] = [];
        }
        resources[mapObj.resource].push(mapObj.map);
        if (mapObj.path) {
          paths[mapObj.resource] = mapObj.path;
        }
      });

    // Do the root resources first
    if (resources.root) {
      resources.root.forEach((m) => m.call(context));
      delete resources.root;
    }

    var segments = {},
      standalone = [];

    Object.keys(resources).forEach((r) => {
      var m = /^([^\.]+)\.(.*)$/.exec(r);
      if (m) {
        segments[m[1]] = m[2];
      } else {
        standalone.push(r);
      }
    });

    // Apply other resources next. A little hacky but works!
    standalone.forEach((r) => {
      context.resource(r, {
        path: paths[r]
      }, () => {
        var res = this;
        resources[r].forEach((m) => m.call(res));

        var s = segments[r];
        if (s) {
          var full = r + '.' + s;
          res.resource(s, {
            path: paths[full]
          }, () => {
            var nestedRes = this;
            resources[full].forEach((m) => m.call(nestedRes));
          });
        }
      });
    });
  }
});
