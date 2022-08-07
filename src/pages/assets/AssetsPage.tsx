import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Card, Form, Grid, Image, Input, Loading, Space, Tag } from "antd-mobile";

import './AssetsPage.css'

import fakeApi from "../../api/fake-api";
import Header from "../../components/Header";
import ResultBlock from "../../components/ResultBlock";
import { Asset } from "../../models/Asset";

export default () => {
    const { companyId, unitId } = useParams();
    const navigate = useNavigate();

    const defaultUrlParams = `?companyId=${companyId}&unitId=${unitId}`;

    const [urlParams, setUrlParams] = useState<string>(defaultUrlParams);
    const [loading, setLoading] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [assets, setAssets] = useState<Asset[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>("");  

    useEffect(() => {
        getAssets();
    }, [urlParams]);

    const getAssets = () => {
        setLoading(true);

        fakeApi.getAssetsWithUrlParams(urlParams)
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

    const handleNameChange = (n: string) => {      
        setName(n);
        
        if (!!n) {
            setUrlParams(`${defaultUrlParams}&name_like=${n}`);
        } else {
            setUrlParams(`${defaultUrlParams}`);
        }
    }

    const goToAssetsDetails = (asset: Asset) => {
        // navigate(`/${companyId}/${unitId}/assets/${asset.id}`, {state: {asset: asset}});
        navigate(`/${companyId}/${unitId}/assets/${asset.id}`);
    }
    
    return (
        <Space direction='vertical' className='main-box'>
            <Header title="Ativos" goBackTo={`/${companyId}/`} />

            <Form layout='vertical'>
                <Form.Item name='name'>
                    <Input 
                        clearable 
                        placeholder="Buscar por nome"
                        value={name} 
                        onChange={handleNameChange}
                        onClear={() => handleNameChange} 
                        onEnterPress={getAssets} 
                    />
                </Form.Item>
            </Form>

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
                        status='info'
                        title='Nenhum ativo encontrado.'
                    />
                : 
                    <Grid columns={2} gap={4}>
                        {assets.map((asset: Asset) => (
                            <Grid.Item key={asset.id}>
                                <Card title={asset.name} onBodyClick={() => goToAssetsDetails(asset)}>
                                    <Space justify="end" className="tag-box">
                                        <Tag color={asset.status.color}>{asset.status.statusInPortuguese}</Tag>
                                    </Space>
                                    <Image src={asset.image} />
                                </Card>
                            </Grid.Item>
                        ))}
                    </Grid>
                }
            </Space>

        </Space>
    );
}