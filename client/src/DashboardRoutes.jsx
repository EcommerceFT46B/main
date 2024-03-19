import { Routes,Route } from "react-router-dom"
import AdminUsers from "./Components/pages/Dashboard/AdminUser/AdminUsers"
import HomeDashboard from "./Components/pages/Dashboard/HomeDashboard/HomeDashboard"
import CreateCategory from "./Components/pages/Dashboard/Creation/CreateCategory"
import CreateProduct from "./Components/pages/Dashboard/Creation/CreateProduct"
import AdminProducts from "./Components/pages/Dashboard/AdminProducts/AdminProducts"
import ModificationProduct from "./Components/pages/Dashboard/Modification/ModificationProduct"
import CreateFabricante from "./Components/pages/Dashboard/Creation/CreateFabricante"
import CreateMarca from "./Components/pages/Dashboard/Creation/CreateMarca"
import AdminCatFabMarc from "./Components/pages/Dashboard/AdminCatFabMarc/AdminCatFabMarc"


const DashboardRoutes = () => {
    return (
      <Routes>
        <Route path="/" element={<AdminUsers />} />
        <Route path="/HomeDashboard" element={<HomeDashboard />} />
        <Route path="/creationCategory" element={<CreateCategory />} />
        <Route path="/creationProduct" element={<CreateProduct />} />
        <Route path="/modifications/products/:id" element={<ModificationProduct />} />
        <Route path="/adminProducts" element={<AdminProducts />} />
        <Route path="/adminCatFabMarc" element={<AdminCatFabMarc />} />
        <Route path="/creationFabricante" element={<CreateFabricante />} />
        <Route path="/creationMarca" element={<CreateMarca />} />
      </Routes>
    );
  };
  
  export default DashboardRoutes;