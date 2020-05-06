import { savedObjectManagementRegistry } from 'plugins/kibana/management/saved_object_registry';
import { SavedObjectsClientProvider } from 'ui/saved_objects';
import { SavedObjectLoader } from 'ui/courier/saved_object/saved_object_loader';
import { uiModules } from 'ui/modules';
import _ from 'lodash';
import { kibanaDocType } from '../common/kibanaDocType';
import './_saved_entity';
savedObjectManagementRegistry.register({
  service: 'SavedEntity',
  title: kibanaDocType.kbn
});

uiModules
  .get('app/myPlugin', ['kibana'])
  .service('savedEntities', function (Promise, SavedEntity, Private, kbnIndex, kbnUrl, $http, chrome) {

    const savedObjectClient = Private(SavedObjectsClientProvider);
    const savedEntityLoader = new SavedObjectLoader(
      SavedEntity,
      kbnIndex,
      kbnUrl,
      $http,
      chrome,
      savedObjectClient);
    savedEntityLoader.type = SavedEntity.type;
    savedEntityLoader.loaderProperties = {
      name: 'saved_entity',
      noun: 'saved_entity',
      nouns: 'saved_entities'
    };

    savedEntityLoader.get = function (id) {
      return (new SavedEntity(id)).init();
    };

    savedEntityLoader.delete = function (ids) {
      ids = !_.isArray(ids) ? [ids] : ids;
      return Promise.map(ids, (id) => {
        return (new SavedEntity(id)).delete();
      });
    };
    return savedEntityLoader;
  });
