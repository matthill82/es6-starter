import angular from 'angular';

let componentsModule = angular.module('app.components', []);

// Components (and directives)
import ListErrors from './list-errors.component';
componentsModule.component('listErrors', ListErrors);

// Directives
import ShowAuthed from './show-auth.directive';
componentsModule.directive('showAuthed', ShowAuthed);

export default componentsModule;
