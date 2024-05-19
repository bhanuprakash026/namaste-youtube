import './App.css';
import './components/Head'
import Head from './components/Head';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage/WatchPage'

const appRouter = createBrowserRouter([{
  path: '/',
  element: <Body />,
  children: [
    {
      path: '/',
      element: <MainContainer />,
    },
    {
      path: '/watch',
      element: <WatchPage />
    }

  ]
}])

function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <Head />
        <RouterProvider router={appRouter} />
      </div>
    </Provider>
  );
}

export default App;