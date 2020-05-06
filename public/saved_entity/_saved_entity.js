import { uiModules } from 'ui/modules';
import { createLegacyClass } from 'ui/utils/legacy_class';
import { SavedObjectProvider } from 'ui/courier';
import { kibanaDocType } from '../common/kibanaDocType';
import { mapping } from '../common/mapping';
const module = uiModules.get('app/myPlugin');

module.factory('SavedEntity', function (kbnIndex, httpService, dateFilter, Private, $http) {
  const SavedObject = Private(SavedObjectProvider);
  createLegacyClass(SavedEntity).inherits(SavedObject);

  function SavedEntity(id) {
    SavedEntity.Super.call(this, {
      type: SavedEntity.type,
      mapping: SavedEntity.mapping,
      id: id,

      defaults: {
        title: 'Default Title'
      }
    });

    this.getTitle = () => {
      return this.title;
    };
  }

  SavedEntity.type = kibanaDocType.kbn;
  SavedEntity.mapping = mapping;

  return SavedEntity;
});
