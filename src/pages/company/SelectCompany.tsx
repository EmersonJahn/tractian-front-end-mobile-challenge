import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import { List, Loading, Space } from 'antd-mobile';

import './SelectCompany.css'

import fakeApi from '../../api/fake-api';
import { Company } from '../../models/Company';
import ResultBlock from '../../components/ResultBlock';
import Header from '../../components/Header';

export default () => {
    let navigate = useNavigate();

    const [companies, setCompanies] = useState<Company[]>([]);
    const [loading, setLoading] = useState<boolean>(true);   
    const [errorMessage, setErrorMessage] = useState<string>("");  

    useEffect(() => {
        fakeApi.getCompanies()
            .then(
                companies => {
                    setCompanies(companies.data);
                    setLoading(false);
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
    }, []);

    const selectCompany = (company: Company) => {
        navigate(`/${company.id}`);
    }

    return (
        <Space direction='vertical' align='center' className='main-box main-box-select-company'>
            <Header title="Empresas" />

            <h1 className='welcome-text'>Bem vindo</h1>

            {loading ?
                <Loading color='primary'></Loading>
            : !!errorMessage ?
                <ResultBlock 
                    status='error'
                    title={errorMessage}
                />
            : 
                <List header="Selecione uma empresa" className='companies-list'>
                    {companies.map((company: Company) => (
                        <List.Item 
                            key={company.id} 
                            onClick={() => selectCompany(company)} 
                        >
                            {company.name}
                        </List.Item>
                    ))}
                </List>
            }

        </Space>
    );
}