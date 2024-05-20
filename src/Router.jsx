import React, {useEffect} from "react";
import { Route, Routes, useLocation} from "react-router-dom";
import Layout from "./components/Layout";
import NotFoundPage from "./views/NotFoundPage";
import Index from "./views/Index";




const Router = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Index/>} exact />
          <Route path="*" element={<NotFoundPage/>} />
        </Route>
      </Routes>
    </ScrollToTop>
  );
};

const ScrollToTop = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return children;
};



export default Router;