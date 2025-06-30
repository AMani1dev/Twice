import { lazy } from 'react';
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from './Layout/RootLayout';
import WorkLayout from './Layout/WorkLayout';
import InitLoader from './components/structure/InitLoader';

import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Services = lazy(() => import('./pages/Services'));
const TwoPercent = lazy(() => import('./pages/Two-percent'));
const GeneralTerms = lazy(() => import('./pages/GeneralTerms'));

const Work = lazy(() => import('./pages/Work/index.jsx'));
import { workLoader } from './loaders/workLoader.js';

const Details = lazy(() => import('./pages/Work/Details.jsx'));
import { detailsLoader } from './loaders/detailsLoader.js';


const NotFound = lazy(() => import('./pages/NotFound'));


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />} path='/'>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />
      <Route path='services' element={<Services />} />
      <Route path='two-percent' element={<TwoPercent />} />
      <Route path='general-terms' element={<GeneralTerms />} />

      <Route path='work' element={<WorkLayout />}>
        <Route index element={<Work />} loader={workLoader} />
        <Route path=':id' element={<Details />} loader={detailsLoader} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Route>
  ),
);

const App = () => {
  return (
    <InitLoader>
      <RouterProvider router={router} />
    </InitLoader>
  );
};

export default App;