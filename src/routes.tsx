import { Route, Routes } from "react-router-dom";

import AssetsPage from "./pages/assets/AssetsPage";
import SelectCompany from "./pages/company/SelectCompany";
import SelectUnity from "./pages/units/SelectUnity";

export default () => (
    <Routes>
        <Route path="/" element={<SelectCompany />} />
        <Route path="/:companyId/" element={<SelectUnity />} />
        <Route path="/:companyId/:unitId/assets/" element={<AssetsPage />} />
    </Routes>
);