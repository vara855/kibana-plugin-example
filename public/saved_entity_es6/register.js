import { SavedObjectRegistryProvider } from 'ui/saved_objects/saved_object_registry';
import  './saved_entities';

SavedObjectRegistryProvider.register(function (savedEntitiesEs6) {
  return savedEntitiesEs6;
});
