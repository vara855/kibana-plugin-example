import { uiModules } from 'ui/modules';
import { SavedObjectProvider } from 'ui/courier';
import { kibanaDocType } from '../common/kibanaDocType';
import { mapping } from '../common/mapping';
const module = uiModules.get('app/myPlugin');


module.factory('SavedEntityEs6', function (kbnIndex, httpService, dateFilter, Private, $http) {
  const SavedObject = Private(SavedObjectProvider);

  class SavedEntityEs6 extends SavedObject {
    static type = kibanaDocType.es6;
    static mapping = mapping;
    constructor(id) {
      super({
        type: SavedEntityEs6.type,
        mapping: SavedEntityEs6.mapping,
        id,
        defaults: {
          title: 'Default Title'
        }
      });
    }

    getTitle() {
      console.log('get title method');
      return this.title;
    }
  }
  return SavedEntityEs6;
});
