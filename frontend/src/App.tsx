import  { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import { useDispatch, useSelector } from 'react-redux';
import { getCookie } from './utils/getCookie';
import { finishLoading} from './store/authSlice';
import GlobalLayout from './Components/Layouts/GlobalLayout';
import { RootState } from './store';
import { Spin } from 'antd';


function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);


  useEffect(() => {
      dispatch(finishLoading())
  }, [dispatch]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <Spin size="large" tip="Loading..." />
    </div>
  }
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<GlobalLayout />}>
          <Route index element={<Home />} />      
        </Route>

      </Routes>
    </BrowserRouter>

  );
}

export default App;