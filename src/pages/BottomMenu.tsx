import { useLocation, useNavigate, useParams } from "react-router-dom";

import { TabBar } from "antd-mobile"
import { HistogramOutline, UserOutline } from "antd-mobile-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

import './BottomMenu.css';

export default () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { companyId, unitId } = useParams();

    const showMenu: boolean = location.pathname.endsWith("assets/") || location.pathname.endsWith("dashboard/") || location.pathname.endsWith("users/")

    const naviteTo = (value: string) => {
        navigate(`/${companyId}/${unitId}/${value}`);
    }
    
    const tabs = [
        {
          key: 'assets/',
          title: 'Ativos',
          icon: <FontAwesomeIcon icon={faHouse} />,
        },
        {
          key: 'dashboard/',
          title: 'Dashboard',
          icon: <HistogramOutline />,
        },
        {
          key: 'users/',
          title: 'Usuários',
          icon: <UserOutline />,
        },
    ]

    return (
        showMenu ? 
            <TabBar onChange={naviteTo} className="tabsBar">
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        : null
    )
}