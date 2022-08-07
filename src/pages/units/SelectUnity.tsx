import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

import { List, Loading, Space } from "antd-mobile";

import './SelectUnity.css'

import fakeApi from "../../api/fake-api";
import { Unity } from "../../models/Unity";
import ResultBlock from "../../components/ResultBlock";
import Header from "../../components/Header";

export default () => {
    const { companyId } = useParams();
    let navigate = useNavigate();

    const [units, setUnits] = useState<Unity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);   
    const [errorMessage, setErrorMessage] = useState<string>("");  

    useEffect(() => {
        if (!companyId) {
            navigate("/");
        }

        fakeApi.getUnitsByCompanyId(+companyId!)
            .then(
                units => {
                    setLoading(false);
                    setUnits(units.data);
                    setErrorMessage("");
                }
            )
            .catch(
                error => {
                    console.error(error);
                    setLoading(false);
                    setErrorMessage(error.message);
                }
            )
    }, [companyId]);

    const selectUnity = (unity: Unity) => {
        navigate(`/${companyId}/${unity.id}/assets/`);
    }

    return (
        <Space direction='vertical' className='main-box'>
            <Header title="Unidades" goBackTo="/" />

            <Space direction='vertical' align='center' justify='center' className='secondary-box'>
                {loading ?
                    <Loading color='primary'></Loading>
                : !!errorMessage ?
                    <ResultBlock 
                        status='error'
                        title={errorMessage}
                    />
                : units.length === 0 ?
                    <ResultBlock 
                        status='info'
                        title='Nenhuma unidade encontrada para a empresa selecionada.'
                    />
                : <List header="Selecione uma unidade" className='units-list'>
                        {units.map((unity: Unity) => (
                            <List.Item 
                                key={unity.id} 
                                onClick={() => selectUnity(unity)} 
                            >
                                {unity.name}
                            </List.Item>
                        ))}
                    </List>
                }
            </Space>
        </Space>
    );
}