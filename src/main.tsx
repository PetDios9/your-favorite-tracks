import ReactDOM from 'react-dom/client'
import './index.css'
import './scss/app.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import TopTracks from './pages/TopTracks';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/top-tracks",
    element: <TopTracks />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

      <RouterProvider router={router} />

)
