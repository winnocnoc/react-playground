import { createBrowserRouter } from 'react-router-dom';
import { postsRoutes } from './posts';

export const routers = createBrowserRouter([...postsRoutes], {
  basename: '/seller',
});
