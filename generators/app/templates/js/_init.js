// Initialize our application

(function(fallback, window, undefined) {
  'use strict';
  
  var init = {};
  
  init.go = function() {
    cfg(this.config);
    
    req(['app'], function() {
      console.log('Bootstrapped!');
    });
  }
  
  init.config = {
    'libs': {
      'angular': {
        // Fallbacks to load angular
        'urls': [
          'https://ajax.googleapis.com/ajax/libs/angularjs/1.0.1/angular.min.js',
          '/public/components/angularjs/angular.min.js'
        ]
      },
      
      'jQuery': {
        'alias': '$',
        
        'urls': [
          'http://code.jquery.com/jquery-2.1.1.min.js',
          '/public/components/jquery/dist/jquery.min.js'
        ]
      },
      
      'bootstrap': {
        'check': function() {
          if (typeof($.fn.modal) === 'undefined') {
            return false;
          } else {
            return true;
          }
        },
        
        'deps': 'jQuery',
        
        'urls': [
          'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js',
          '/public/components/bootstrap/dist/js/bootstrap.min.js'
        ]
      },
                 
      'app': {
        'deps': [
          'angular',
          'jQuery',
          'bootstrap'
        ],
        
        'urls': '/public/js/app.min.js'
      }
    }
  };
  
  // Load the app!
  init.go();
  
  
  // Expose the initializer
  window.appInit = init;
  
})(fallback, window);