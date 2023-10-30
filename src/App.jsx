import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import 'react-notifications-component/dist/theme.css';
import React, { lazy, Suspense } from "react";
import Header from "./component/Header.jsx";
import Footer from "./component/Footer.jsx";

export default function App() {
  const Home = lazy(() => import("./pages/Home.jsx"));
  const Search = lazy(() => import("./pages/Search.jsx"));
  const Detail = lazy(() => import("./pages/Detail.jsx"));
  const About = lazy(() => import("./pages/About.jsx"));
  const Nx = lazy(() => import("./pages/Consoles.jsx"));
  const Err404 = lazy(() => import("./component/Err404.jsx"));
  const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy.jsx"));

  return (
    <Router>
      <ReactNotifications />
      <Header />
      <div className="container max-w-screen-xl mx-auto mt-4 flex-grow px-5 lg:px-0">
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/search/:query" element={<Search />} />
            <Route path="/about" element={<About />} />
            <Route path="/console/:consoles" element={<Nx />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="*" element={<Err404 />} />
          </Routes>
        </Suspense>
      </div>
      <Footer />
    </Router>
  );
}
