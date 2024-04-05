// import logo from './logo.svg';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import CoursesHome from './components/home/coursesHome.tsx';
import LogIn from './components/login/Login.tsx';
import Register from './components/register/Register.tsx';
import Professorhome from './components/home/professotHome.tsx';
import Update from './components/updateCourse/Update.tsx';
import Grades from './components/grades/grades.tsx';

function App() {
  let routers = createBrowserRouter([
    {
      path: '/', children: [
        { path: 'student', element: <CoursesHome /> },
        { path: 'prof', element: <Professorhome /> },
        { path: 'grades', element: <Grades /> },
        { path: '/:id', element: <Update /> },
        { path: 'login', element: <LogIn /> },
        { path: 'register', element: <Register /> },
        // { path: 'courses/:id', element: <SingleCourse /> },
      ]
    }
  ])

  return <>
    <RouterProvider router={routers} />
  </>
}


export default App;
