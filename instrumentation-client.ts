import { initBotId } from 'botid/client/core';
 
// Define the paths that need bot protection.
initBotId({
  protect: [
    // Admin endpoints
    {
      path: '/api/admin/opportunities',
      method: 'GET',
    },
    {
      path: '/api/admin/opportunities',
      method: 'POST',
    },
    {
      path: '/api/admin/opportunities/*',
      method: 'PUT',
    },
    {
      path: '/api/admin/opportunities/*',
      method: 'DELETE',
    },
    {
      path: '/api/admin/suggestions',
      method: 'GET',
    },
    {
      path: '/api/admin/suggestions',
      method: 'PUT',
    },
    {
      path: '/api/admin/suggestions',
      method: 'DELETE',
    },
    {
      path: '/api/admin/feedback/*',
      method: 'GET',
    },
    // Public submission endpoints
    {
      path: '/api/submit',
      method: 'POST',
    },
    {
      path: '/api/feedback',
      method: 'POST',
    },
  ],
});