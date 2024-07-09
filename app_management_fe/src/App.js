import {RouterProvider, createBrowserRouter} from 'react-router-dom';
import LoginPage from './page/LoginPage';
import RedirectPage from './page/RedirectPage';
import HomePage from './page/HomePage';
import RootLayout, {loader as mainLoader} from './page/RootLayout';
import Error from "./page/ErrorPage";
import TaskRoot from './page/TaskRoot';
import Tasks, {loader as taskLoader} from './page/Tasks';
import CreateTask, {loader as roleLoader} from './page/CreateTask';
import {action as createTask} from "./components/TaskForm";
import UpdateTask, {loader as updateLoader} from './page/UpdateTask';
// import RequestPage from './page/RequestPage';
import MessageRoot from './page/MessageRoot';
import Messages from './page/Messages';
import MyRequests, {loader as requestLoader} from './page/MyRequests';
import TaskDetailPage, {loader as commentLoader} from './page/TaskDetailPage';


const router = createBrowserRouter([
  {path: "/login", element: <LoginPage />},
  {path: "/redirect", element: <RedirectPage />},
  {path: "/authorized", element: <RedirectPage />},
  {path: "/home", element: <RootLayout />, errorElement: <Error />, id: 'root', loader: mainLoader, children: [
    {index: true, element: <HomePage />},
    {path: "tasks", element: <TaskRoot />, children: [
      {index: true, element: <Tasks />, loader: taskLoader},
      {path: "created", element: <Tasks status="created" />, loader:taskLoader},
      {path: "create", element: <CreateTask />, id: "taskAction", action: createTask, loader: roleLoader},
      {path: "update", element: <UpdateTask />, action: createTask, loader: updateLoader},
      // {path: "create-request", element: <RequestPage />},
      {path: "requests", element: <MyRequests />, loader: requestLoader},
      {path: "task-detail", element: <TaskDetailPage />, loader: commentLoader}
    ]},
    {path: "messages", element: <MessageRoot />, children: [
      {index: true, element: <Messages />}
    ]}
  ]}
  ,

])

function App() {
  return <RouterProvider router={router} />;
}

export default App;
