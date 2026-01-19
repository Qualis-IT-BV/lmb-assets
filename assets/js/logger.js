/* Project: La Maison Bossché
 * Component: Logger Utility
 * Build: dev-20260119.001
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
    var levelName = config[component] || config.default || 'INFO';
    return LEVELS[levelName.toUpperCase()] || LEVELS.INFO;
  }

  // Timestamp formatter (ISO 8601 met milliseconden)
  function timestamp() {
    return new Date().toISOString();
  }

  // Logger factory
  function createLogger(componentName) {
    componentName = componentName || 'Unknown';

    function shouldLog(level) {
      var componentLevel = getLevelForComponent(componentName);
      return level >= componentLevel;
    }

    function log(level, levelName, args) {
      if (!shouldLog(level)) return;

      var prefix = timestamp();
      var color = LEVEL_COLORS[levelName];
      var allArgs = [
        '%c' + prefix + ' %c' + levelName + ' %cLMB ' + componentName,
        '', // standaard kleur voor tijd
        'color: ' + color + '; font-weight: bold', // kleur voor level
        'color: #666; font-weight: normal' // grijze kleur voor component
      ].concat(Array.prototype.slice.call(args));

      // Gebruik juiste console methode
      var method = levelName === 'DEBUG' ? 'log' :
                   levelName === 'WARN' ? 'warn' :
                   levelName === 'ERROR' ? 'error' : 'log';

      console[method].apply(console, allArgs);
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
  var selfLogger = createLogger('Logger');
  selfLogger.info('Logger utility initialized (logger.js Build: dev-20260119.001)', {
    config: getConfig()
  });

})();
