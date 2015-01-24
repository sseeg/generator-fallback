/* 
 * This file is part of generator-fallback, licensed under the MIT License (MIT).
 * 
 * Copyright (c) 2015 seeg_
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

'use strict';

var yeoman = require('yeoman-generator');
var yosay  = require('yosay');
var chalk  = require('chalk');
var path   = require('path');

// Load user prompts
var prompts = require('./prompts.js');

var FallbackGenerator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
    
    // Take optional argument for the name of the webapp
    this.argument('name', {
      type: String,
      required: false
    });
    
    // True if a name was provided at the command-line
    this.isNameProvided = (this.name != undefined);
    
    // Set appname appropriately
    if (this.isNameProvided) {
      this.appname = this.name;
    } else {
      this.appname = path.basename(process.cwd());
    }
  },
  
  initializing: function() {
    // Initialize Yeoman config
    this.config.save();
    
    // Tell Yeoman to say hello!
    this.log(yosay(
      'Hello!'
    ));
  },
  
  prompting: {
    // Check and confirm appname
    name: function() {
      var done = this.async();
    
      // Check if the user provided a name argument, so we can know whether we need to get a name immediately or if we should confirm
      if (this.isNameProvided) {
        this.prompt(prompts.nameconfirm(this.appname), function(response) {
          if (!response.nameconfirm) {
            // If the user declined that they want that name, prompt them for a new one
            this.prompt(prompts.name(process.cwd()), function(response) {
              // Set the appname to the new name
              this.appname = response.name;
              
              done();
            }.bind(this));
          } else {
            done();
          }
        }.bind(this));
      } else {
        // If the user did not provide a name argument, prompt them for their project name
        this.prompt(prompts.name(this.appname), function(response) {
          // Set the appname to the new name
          this.appname = response.name;
          
          done();
        }.bind(this));
      }
    },
    
    // Run the remaining prompts, and configure the generator using responses
    config: function() {
      var done = this.async();
      
      this.prompt(prompts.prompts, function(response) {
        // Bind response data to generator properties
        this.author      = response.author;
        this.buildsystem = response.buildsystem;
        this.test        = response.test;
        this.cslibs      = response.cslibs;
        
        // Define template context
        this.tplContext = {
          appname: this.appname
        }
        
        done();
      }.bind(this));
    }
  },
  
  // Write configuration and metadata files (eg. package.json, bower.json, editorconfig)
  configuring: function() {
    // Copy package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      this.tplContext
    );
    
    // Copy bower.json
    this.fs.copyTpl(
      this.templatePath('_bower.json'),
      this.destinationPath('bower.json'),
      this.tplContext
    );
  },
  
  writing: function() {
    
  },
  
  end: function() {
    this.log(yosay(
     'Thanks for using the generator! Goodbye!'
    ));
  }
});

// Export generator
module.exports = FallbackGenerator;