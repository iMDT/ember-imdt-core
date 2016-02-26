import Ember from 'ember';
import ENV from 'ember-get-config';

export default Ember.Service.extend({
  config: {
    namespace: '',
    baseURL: ENV.API.baseURL,
  },

  /**
    Our own $.ajax method. Makes sure the .then method executes in an Ember runloop
    for performance reasons. Also automatically adjusts the URL to ENV.API.baseURL.
    @method execute
  **/
  execute: function() {
    var self = this;
    var url, args;

    if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') {
        url = arguments[0];
        args = {};
      } else {
        args = arguments[0];
        url = args.url;
        delete args.url;
      }
    } else if (arguments.length === 2) {
      url = arguments[0];
      args = arguments[1];
    }

    if (args.success) {
      throw 'ajax should use promises, received \'success\' callback';
    }
    if (args.error) {
      throw 'DEPRECATION: ajax should use promises, received \'error\' callback';
    }

    var performAjax = function(resolve, reject) {
      args.headers = args.headers || {};

      args.success = function(data) {
        Ember.run(null, resolve, data);
      };

      args.error = function(xhr, textStatus, errorThrown) {
        // If it's a authentication, don't reject
        if (xhr.status === 401) {
          console.error('Erro 401 deveria ir pro login');
        }

        // If it's a parsererror, don't reject
        if (xhr.status === 500) {
          console.error('Erro 500');
        }

        // If it's a parsererror, don't reject
        if (xhr.status === 200) {
          return args.success(xhr);
        }

        // Fill in some extra info
        xhr.jqTextStatus = textStatus;
        xhr.requestedUrl = url;

        Ember.run(null, reject, Ember.merge({
          jqXHR: xhr,
          textStatus: textStatus,
          errorThrown: errorThrown,
        }, xhr.responseJSON));
      };

      // We default to JSON on GET. If we don't, sometimes if the server doesn't return the proper header
      // it will not be parsed as an object.
      if (!args.type) {
        args.type = 'GET';
      }
      if (!args.dataType) {
        args.dataType = 'json';
      }
      if (!args.contentType) {
        args.contentType = 'application/json; charset=UTF-8';
      }
      if (args.type === 'GET' && args.cache !== true) {
        args.cache = false;
      }

      var realUrl = self.config.baseURL.concat(self.config.namespace, url);
      Ember.$.ajax(realUrl, args);
    };

    return new Ember.RSVP.Promise(performAjax);
  },
  get: function() {
    var url, args;

    if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') {
        url = arguments[0];
        args = {};
      } else {
        args = arguments[0];
        url = args.url;
        delete args.url;
      }
    } else if (arguments.length === 2) {
      url = arguments[0];
      args = arguments[1];
    }

    args.method = 'get';

    return this.execute(url, args);
  },
  post: function() {
    var url, args;

    if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') {
        url = arguments[0];
        args = {};
      } else {
        args = arguments[0];
        url = args.url;
        delete args.url;
      }
    } else if (arguments.length === 2) {
      url = arguments[0];
      args = arguments[1];
    }

    args.method = 'POST';

    return this.execute(url, args);
  },
  put: function() {
    var url, args;

    if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') {
        url = arguments[0];
        args = {};
      } else {
        args = arguments[0];
        url = args.url;
        delete args.url;
      }
    } else if (arguments.length === 2) {
      url = arguments[0];
      args = arguments[1];
    }

    args.method = 'PUT';

    return this.execute(url, args);
  },
  delete: function() {
    var url, args;

    if (arguments.length === 1) {
      if (typeof arguments[0] === 'string') {
        url = arguments[0];
        args = {};
      } else {
        args = arguments[0];
        url = args.url;
        delete args.url;
      }
    } else if (arguments.length === 2) {
      url = arguments[0];
      args = arguments[1];
    }

    args.method = 'DELETE';

    return this.execute(url, args);
  }
});
