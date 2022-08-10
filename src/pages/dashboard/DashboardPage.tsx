import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Loading, Space } from "antd-mobile";

import fakeApi from "../../api/fake-api";
import Header from "../../components/Header";
import ResultBlock from "../../components/ResultBlock";
import { Asset } from "../../models/Asset";
import StatusChart from "./StatusChart";
import HealthscoreChart from "./HealthscoreChart";


export default () => {
    const { companyId, unitId } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [assets, setAssets] = useState<Asset[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>(""); 
    
    useEffect(() => {
        getAssets();
    }, [companyId, unitId ]);

    const getAssets = () => {
        if (!companyId || !unitId) {
            setErrorMessage("Erro ao buscar os dados.");
            return;
        }
        setLoading(true);

        fakeApi.getAssetsByCompanyIdAndUnitId(+companyId, +unitId)
        .then(
            assets => {
                setAssets(assets);
                setErrorMessage("");
                setSearched(true); // para nao mostrar a mensagem de nao encontrado antes de buscar pela primeira vez
                setLoading(false);
            }
        )
        .catch(
            error => {
                console.error(error);
                setErrorMessage(error.message);
                setSearched(true); // para nao mostrar a mensagem de nao encontrado antes de buscar pela primeira vez
                setLoading(false);
            }
        )
    }
    
    return (
        <Space direction='vertical' className='main-box'>
            <Header title="Dashboard" goBackTo={`/${companyId}/`} />

            <Space direction='vertical' align='center' justify={loading || !!errorMessage || assets.length === 0 ? 'center' : 'start'} className='secondary-box'>
                {loading ?
                    <Loading color='primary'></Loading>
                : !!errorMessage ?
                    <ResultBlock 
                        status='error'
                        title={errorMessage}
                    /> 
                : assets.length === 0 && searched ?
                    <ResultBlock 
                        status='error'
                        title='Erro ao buscar os dados.'
                    />
                : 
                    <Space direction='vertical' align='center' style={{width: '100vw'}}>
                        <StatusChart assets={assets} />
                        <HealthscoreChart assets={assets} />
                    </Space>
                }
            </Space>

        </Space>

    )
}