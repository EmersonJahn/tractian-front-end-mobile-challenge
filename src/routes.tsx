import { Route, Routes } from "react-router-dom";
import SelectCompany from "./pages/company/SelectCompany";
import SelectUnity from "./pages/units/SelectUnity";

export default () => (
    <Routes>
        <Route path="/" element={<SelectCompany />} />
        <Route path="/:companyId/" element={<SelectUnity />} />
    </Routes>
);