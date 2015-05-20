/*
 * slush-bespoke
 * https://github.com/phdesign/slush-bespoke
 *
 * Copyright (c) 2015, Paul Heasley
 * Licensed under the MIT license.
 */

'use strict';

var gulp = require('gulp'),
    install = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename = require('gulp-rename'),
    _ = require('underscore.string'),
    inquirer = require('inquirer'),
    path = require('path');

var plugins = [
    { 
        id: 'bullets',
        name: 'Bullet lists',
        checked: true
    }, {
        id: 'backdrop', 
        name: 'Different backgrounds',
        checked: true
    }, {
        id: 'scale', 
        name: 'Responsive slide scaling',
        checked: true
    }, {
        id: 'hash', 
        name: 'Hash routing',
        checked: true
    }, {
        id: 'progress', 
        name: 'Progress bar',
        checked: true
    }, {
        id: 'forms', 
        name: 'Form elements',
        checked: true
    }
];

function suggestTitle(val) {
    return new Title(val).splitCamelCase().splitSnakeCase().toProperCase().val();
}
var Title = function(val) {
    this._val = val;
    return this;
};
Title.prototype.toProperCase = function() {
    this._val = this._val.replace(/\w\S*/g, function(s){return s.charAt(0).toUpperCase() + s.slice(1);});
    return this;
};
// Put spaces in between capital letters, e.g. SomeCamelCase becomes Some Camel Case
Title.prototype.splitCamelCase = function() {
    this._val = this._val.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    return this;
};
Title.prototype.splitSnakeCase = function() {
    this._val = this._val.replace(/[-_.]/g, ' ');
    return this;
};
Title.prototype.val = function() {
    return this._val;
};

gulp.task('default', function (done) {
    var prompts = [{
        name: 'title',
        message: 'What is the title of your presentation?',
        default: suggestTitle(path.basename(process.cwd()))
    }, {
        type: 'confirm',
        name: 'useTheme',
        message: 'Would you like to use a pre-made theme?',
        default: true
    }, {
        type: 'checkbox',
        name: 'plugins',
        message: 'Select the plugins to include',
        choices: plugins
    }, {
        type: 'confirm',
        name: 'syntax',
        message: 'Will your presentation include code samples?',
        default: true
    }];
    //Ask
    inquirer.prompt(prompts,
        function (answers) {
            plugins.forEach(function(p) {
                answers[p.id] = answers.plugins.indexOf(p.name) !== -1;
            });
            answers.shortName = _.slugify(answers.title);
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function (file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function () {
                    done();
                });
        });
});
