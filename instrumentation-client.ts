import { initBotId } from 'botid/client/core';
 
// Define the paths that need bot protection.
initBotId({
  protect: [
    // Public submission endpoints
    {
      path: '/api/submit',
      method: 'POST',
    },
    {
      path: '/api/feedback',
      method: 'POST',
    },
    // Search endpoint
    {
      path: '/api/search',
      method: 'GET',
    },
  ],
});