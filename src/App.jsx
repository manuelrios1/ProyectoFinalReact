import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout/Layout';
import './App.css';
import Inicio from "./pages/Inicio";
import Escenario from "./pages/Escenario/Escenario";
import Productos from "./pages/Catalogo/Productos";
import Contacto from "./pages/Contacto/Contacto";
import { ThemeProvider } from "./context/ThemeContext";
import { CartProvider } from "./context/CartContext";
import Carrito from "./pages/Carrito/Carrito";
import Login from "./components/Auth/Login";
import Que_Hice from "./pages/QueHice/QueHice";

function App() {
  return (
    <ThemeProvider>
        <CartProvider> {/*embolvemos todos los componentes dentro del context nuevo*/} 
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Inicio />} />
                        <Route path="/escenario" element={<Escenario />} />
                        <Route path="/catalogo" element={<Productos />} />
                        <Route path="/contacto" element={<Contacto />} />
                        <Route path="/carrito" element={<Carrito />} />
                        <Route path="/login" element={<Login />}/>
                        <Route path="/quehice" element={<Que_Hice />}/>

                    </Routes>
                </Layout>
            </BrowserRouter>
        </CartProvider>
    </ThemeProvider>
  );
}

export default App;