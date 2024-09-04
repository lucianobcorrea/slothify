import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './context/Auth.context';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer theme="dark" />
    </AuthProvider>
  );
}

export default App;