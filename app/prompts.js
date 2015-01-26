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

// Prompt used to ask the user what their project should be called when no name argument is provided
exports.name = function(appname) {
  return {
    // Ask what the project will be called in package.json and similar files
    type    : 'input',
    name    : 'name',
    message : 'What shall your project be called?',
    default : appname // Default to current working directory
  };
}

// Generates and returns a prompt to confirm that the user wants the appname they provided as the first argument
exports.nameconfirm = function(appname) {
  return {
    // Confirm the appname if it was provided at the command-line
    type    : 'confirm',
    name    : 'nameconfirm',
    message : 'The project is currently called ' + appname + '. Is that okay?',
    default : true
  };
}
  
// Export an array of objects representing the prompts we need in order
exports.prompts = [
  { 
    // Ask who the user is so they can be listed in package.json and similar files
    type    : 'input',
    name    : 'author',
    message : 'What\'s your name?',
    store   : true,
    default : 'someone'
  },
  {
    // Ask the user if they want to use Gulp, or set up something theirselves
    type    : 'confirm',
    name    : 'buildsystem',
    message : 'Would you like to use Gulp as your build system?',
    store   : true,
    default : true
  },
  {
    // Should basic tests be scaffolded out?
    type    : 'confirm',
    name    : 'test',
    message : 'Should we scaffold out some basic tests using Mocha and Chai?',
    default : true
  },
  {
    // Ask what dependencies the project should start with
    type    : 'checkbox',
    name    : 'cslibs',
    message : 'What client-side libraries will your project need?',
    choices : [
      'jQuery',
      'Angular',
      'Normalize',
      'Bootstrap'
    ],
    store   : true,
    default : [
      'jQuery',
      'Bootstrap'
    ]
  }
]