import ReactDOM from 'react-dom/client'
import './index.css'
import './scss/app.scss'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LandingPage from './pages/LandingPage';
import TopTen from './pages/TopTen';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/top-ten",
    element: <TopTen />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(

      <RouterProvider router={router} />

)
