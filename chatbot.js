// schemas/chatbot.js
export default {
  name: 'chatbot',
  type: 'document',
  title: 'Chatbot Configuration',
  fields: [
    {
      name: 'enabled',
      type: 'boolean',
      title: 'Enable Chatbot',
      initialValue: true,
    },
    {
      name: 'scriptUrl',
      type: 'url',
      title: 'Chatbot Script URL',
      description: '"https://insights.elishatelecom.com/aichat/public/snippet_assets/js/include-chatbot.min.js',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'embedUrl',
      type: 'url',
      title: 'Chatbot Embed URL',
      description: 'https://insights.elishatelecom.com/aichat/embedded-chatbot?key=guXJzVN2UnYvtbBf70C3GKEpDF5wZ9',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'apiKey',
      type: 'string',
      title: 'API Key (Optional)',
      description: 'If the chatbot requires an API key',
    },
  ],
};