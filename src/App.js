import './App.css';
import Head from './components/Head';
import Body from './components/Body';
import { Provider } from 'react-redux';
import appStore from './redux/appStore';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainContainer from './components/MainContainer';
import WatchPage from './components/WatchPage/WatchPage';
import Channel from './components/ChannelDetails/Channel';
import ErrorPage from './components/ErrorPage';
import SearchVideosPage from './components/SearchPage/SearchVideosPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Body />,
    children: [
      {
        path: '/',
        element: <MainContainer />,
      },
      {
        path: '/watch',
        element: <WatchPage />,
      },
      {
        path: '/channel/:channelName',
        element: <Channel />,
      },
      {
        path: '/results',
        element: <SearchVideosPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

function App() {
  return (
    <Provider store={appStore}>
      <div className="App">
        <RouterProvider router={appRouter}>
          <Head />
        </RouterProvider>
      </div>
    </Provider>
  );
}

export default App;
