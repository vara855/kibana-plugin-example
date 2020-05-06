import React from 'react';
import { uiModules } from 'ui/modules';
import chrome from 'ui/chrome';
import { render, unmountComponentAtNode } from 'react-dom';

import 'ui/autoload/styles';
import './less/main.less';
import { Main } from './components/main';
import './saved_entity/saved_entities';
import './saved_entity_es6/saved_entities';
const app = uiModules.get('apps/myPlugin');

app.config($locationProvider => {
  $locationProvider.html5Mode({
    enabled: false,
    requireBase: false,
    rewriteLinks: false,
  });
});
app.config(stateManagementConfigProvider =>
  stateManagementConfigProvider.disable()
);

function RootController($scope, $element, $http, savedEntitiesEs6, savedEntities) {
  const domNode = $element[0];
  // render react to DOM
  render(<Main title="my-plugin" httpClient={$http} savedEntityService={savedEntitiesEs6} />, domNode);

  // unmount react on controller destroy
  $scope.$on('$destroy', () => {
    unmountComponentAtNode(domNode);
  });
}
// Next root template required for react.
chrome.setRootTemplate(`<div id="myPlugin"></div>`);

chrome.setRootController('myPlugin', RootController);
