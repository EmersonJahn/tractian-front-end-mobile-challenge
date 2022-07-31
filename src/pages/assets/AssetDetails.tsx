import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Asset } from "../../models/Asset";

export default () => {
    const teste = useParams();
    const location: any = useLocation();
    const asset: Asset = location.state.asset;
    
    useEffect(() => {
        console.log('teste', teste);
        console.log('location', location);
        console.log('asset', asset);
    }, [])

    return (
        <div>AssetDetails-{asset.name}</div>
    );
}