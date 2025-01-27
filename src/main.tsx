import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { AnimatePresence, motion } from "framer-motion";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './index.css';
import { Home } from './pages/home';
import { Product_presentation } from "./pages/product_presentation";
import { Cart } from "./pages/cart_page";
import { Search } from "./pages/search_page";
import { PayPage } from "./pages/pay_page";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <RoutesComponent />
    </Router>
  </React.StrictMode>
);

function RoutesComponent() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.key}>
        <Route path="/" element={
          <motion.div
            initial={{ opacity: 0, x: 300 }} // Comienza desde la derecha
            animate={{ opacity: 1, x: 0 }} // Termina en su posición original
            exit={{ opacity: 0, x: 300 }} // Sale por la izquierda
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Home />
          </motion.div>
        } />
        <Route path="/ProductPresentation" element={
          <motion.div
            initial={{ opacity: 0, y: 300, rotateX: 90 }} // Comienza desde la parte inferior y "acostada"
            animate={{ opacity: 1, y: 0, rotateX: 0 }} // Termina en su posición original y "de pie"
            exit={{ opacity: 0, y: -300, rotateX: -90 }} // Sale por la parte superior y "acostada"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Product_presentation />
          </motion.div>
        } />
        <Route path="/Cart" element={
          <motion.div
            initial={{ opacity: 0, x: 300 }} // Comienza desde la derecha
            animate={{ opacity: 1, x: 0 }} // Termina en su posición original
            exit={{ opacity: 0, x: -300 }} // Sale por la izquierda
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Cart />
          </motion.div>
        } />
        <Route path="/Search" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Search />
          </motion.div>
        } />
        <Route path="/PayPage" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <PayPage />
          </motion.div>
        } />

      </Routes>
    </AnimatePresence>
  );
}