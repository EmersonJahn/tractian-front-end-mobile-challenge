import { Route, Routes } from "react-router-dom";
import AssetDetails from "./pages/assets/AssetDetails";

import AssetsPage from "./pages/assets/AssetsPage";
import SelectCompany from "./pages/company/SelectCompany";
import SelectUnity from "./pages/units/SelectUnity";
import UserDetails from "./pages/users/UserDetails";
import UsersPage from "./pages/users/UsersPage";

export default () => (
    <Routes>
        <Route path="/" element={<SelectCompany />} />
        <Route path="/:companyId/" element={<SelectUnity />} />
        <Route path="/:companyId/:unitId/assets/" element={<AssetsPage />} />
        <Route path="/:companyId/:unitId/assets/:assetId/" element={<AssetDetails />} />
        <Route path="/:companyId/:unitId/users/" element={<UsersPage />} />
        <Route path="/:companyId/:unitId/users/:userId" element={<UserDetails />} />
    </Routes>
);