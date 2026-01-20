/* Project: La Maison Bossché
 * Component: Logger Utility
 * Build: dev-20260120.003
 * First Release: lmb-assets unreleased
 * Last Change: -
 * Source: Custom development
 * 
 * Purpose: 
 * Centralized logging utility for all LMB scripts.
 * Supports configurable log levels per component via window.LMB_LOG_CONFIG.
 * 
 * Usage:
 * var logger = window.LMB.createLogger('Wishlist');
 * logger.debug('Details...'); // Only shows if Wishlist >= DEBUG
 * logger.info('Info message');
 * logger.warn('Warning!');
 * logger.error('Error!');
 */


(function () {
  'use strict';

  // === Versie/commit info ophalen ===
  var loaderVersion = (window.LMB_LOADER_VERSION || (window.LMB_TEST_CONFIG && window.LMB_TEST_CONFIG.version) || 'dev');
  var logger = { info: function(){} };
  try {
    logger = createLogger('Logger');
  } catch(e) {}
  if (logger && typeof logger.info === 'function') {
    logger.info('Component initialized (Build/Version): ' + loaderVersion);
  }

  // Log levels (numeriek voor eenvoudige vergelijking)
  var LEVELS = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    SILENT: 99
  };

  var LEVEL_NAMES = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
  var LEVEL_COLORS = {
    DEBUG: '#999',
    INFO: '#2196F3',
    WARN: '#FF9800',
    ERROR: '#F44336'
  };

  // Minimale fallback (logger.js wordt normaal geladen via logger-config.js)
  var DEFAULT_CONFIG = {
    default: 'INFO'
  };

  // Verkrijg configuratie van window of gebruik defaults
  function getConfig() {
    return window.LMB_LOG_CONFIG || DEFAULT_CONFIG;
  }

  // Verkrijg log level voor specifiek component
  function getLevelForComponent(component) {
    var config = getConfig();
    // Maak componentnaam lowercase voor lookup
    var key = component ? component.toLowerCase() : '';
    // Maak alle config keys lowercase voor veilige lookup
    var configLower = {};
    for (var k in config) {
      if (config.hasOwnProperty(k)) {
        configLower[k.toLowerCase()] = config[k];
      }
    }
    var levelName = configLower[key] || configLower['default'] || 'INFO';
    var numericLevel = LEVELS[(levelName + '').toUpperCase()];
    return (typeof numericLevel === 'number') ? numericLevel : LEVELS.INFO;
  }

  // Timestamp formatter (ISO 8601 met milliseconden)
  function timestamp() {
    return new Date().toISOString();
  }

  // Logger factory
  function createLogger(componentName) {
    componentName = (componentName || 'unknown').toLowerCase();

    function shouldLog(level) {
      var componentLevel = getLevelForComponent(componentName);
      return level >= componentLevel;
    }

    function log(level, levelName, args) {
      if (!shouldLog(level)) return;

      // Uniforme logstring: ISO-timestamp LEVEL LMB component actie - data
      var prefix = timestamp();
      var msg = '';
      if (args.length > 0 && typeof args[0] === 'string') {
        msg = args[0];
        if (args.length > 1) {
          // Voeg extra data toe als string
          msg += ' - ' + Array.prototype.slice.call(args, 1).map(function(a){
            if (typeof a === 'object') {
              try { return JSON.stringify(a); } catch(e) { return '[object]'; }
            }
            return String(a);
          }).join(' ');
        }
      } else {
        msg = Array.prototype.slice.call(args).map(function(a){
          if (typeof a === 'object') {
            try { return JSON.stringify(a); } catch(e) { return '[object]'; }
          }
          return String(a);
        }).join(' ');
      }
        // Kleur voor loglevel
        var color = LEVEL_COLORS[levelName] || '#333';
        var logFormat = '%s %c%s%c LMB %s %s';
        // timestamp, kleur voor level, level, reset kleur, component, message
        var method = levelName === 'DEBUG' ? 'log' :
                     levelName === 'WARN' ? 'warn' :
                     levelName === 'ERROR' ? 'error' : 'log';
        console[method](
          logFormat,
          prefix,
          'color:' + color + ';font-weight:bold;',
          levelName,
          '', // reset kleur
          componentName,
          msg
        );
    }

    return {
      debug: function () {
        log(LEVELS.DEBUG, 'DEBUG', arguments);
      },
      info: function () {
        log(LEVELS.INFO, 'INFO', arguments);
      },
      warn: function () {
        log(LEVELS.WARN, 'WARN', arguments);
      },
      error: function () {
        log(LEVELS.ERROR, 'ERROR', arguments);
      },
      // Convenience methods
      group: function (title) {
        if (shouldLog(LEVELS.DEBUG) && console.group) {
          console.group(timestamp() + ' [LMB ' + componentName + '] ' + title);
        }
      },
      groupEnd: function () {
        if (shouldLog(LEVELS.DEBUG) && console.groupEnd) {
          console.groupEnd();
        }
      }
    };
  }

  // Initialiseer window.LMB namespace
  window.LMB = window.LMB || {};
  window.LMB.createLogger = createLogger;
  window.LMB.LEVELS = LEVELS;

  // Logger voor de logger zelf

  var loaderVersion = window.LMB_LOADER_VERSION || 'unknown';
  var selfLogger = createLogger('Logger');
  selfLogger.info('Logger utility initialized (logger.js Build: dev-20260120.003, Loader: ' + loaderVersion + ')', {
    config: getConfig()
  });

})();
