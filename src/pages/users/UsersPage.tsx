import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button, Collapse, Loading, Space } from "antd-mobile"

import { User } from "../../models/User";
import fakeApi from "../../api/fake-api";
import Header from "../../components/Header";
import ResultBlock from "../../components/ResultBlock";
import { EditFill } from "antd-mobile-icons";

export default () => {
    const { companyId, unitId } = useParams();
    const navigate = useNavigate();

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");  

    useEffect(() => {
        getUsers();
    }, [companyId, unitId]);

    const getUsers = () => {
        if (!companyId || !unitId) {
            setErrorMessage("Erro ao buscar os usuários");
            return;
        }
        setLoading(true);

        fakeApi.getUsersByCompanyIdAndUnitId(+companyId, +unitId)
        .then(
            users => {
                setUsers(users.data);
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

    const goToUserDetails = (user: User) => {
        navigate(`/${companyId}/${unitId}/users/${user.id}`);
    }

    return (
        <Space direction='vertical' className='main-box'>
            <Header title='Usuários' goBackTo={`/${companyId}/`} />
            
            <Space direction='vertical' align='center' justify={loading || !!errorMessage || users.length === 0 ? 'center' : 'start'} className='secondary-box'>
                {loading ?
                    <Loading color='primary'></Loading>
                : !!errorMessage ?
                    <ResultBlock 
                        status='error'
                        title={errorMessage}
                    /> 
                : users.length === 0 && searched ?
                    <ResultBlock 
                        status='info'
                        title='Nenhum usuário encontrado.'
                    />
                : 
                    users.map((user: User) => (
                        <Collapse style={{width: '100vw'}}>
                            <Collapse.Panel key={user.id.toString()} title={user.name}>
                                <Space direction="vertical">
                                    {user.email}
                                    <Space direction="horizontal" justify="end" style={{width: '90vw'}}>
                                        <Button color="primary" onClick={() => goToUserDetails(user)}><EditFill /></Button>
                                    </Space>
                                </Space>
                            </Collapse.Panel>
                        </Collapse>
                    ))
                }
            </Space>
        </Space>
    )
}