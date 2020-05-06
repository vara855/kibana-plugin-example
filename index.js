import exampleRoute from './server/routes/example';

export default function (kibana) {
  return new kibana.Plugin({
    require: ['elasticsearch'],
    name: 'my_plugin',
    uiExports: {
      app: {
        title: 'My Plugin',
        description: 'An awesome Kibana plugin',
        main: 'plugins/my_plugin/app',
        savedObjectTypes: [
          'plugins/my_plugin/saved_entity/register',
          'plugins/my_plugin/saved_entity_es6/register'
        ]
      },
      hacks: [
        'plugins/my_plugin/hack'
      ]
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
      }).default();
    },

    init(server, options) { // eslint-disable-line no-unused-vars
      // Add server routes and initialize the plugin here
      exampleRoute(server);
    }
  });
}
