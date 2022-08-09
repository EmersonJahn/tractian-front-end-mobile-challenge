import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Button, Dialog, Form, Input, Loading, Space, Toast } from "antd-mobile";

import fakeApi from "../../api/fake-api";
import Header from "../../components/Header";
import ResultBlock from "../../components/ResultBlock";
import { User } from "../../models/User";


export default () => {
    const { companyId, unitId, userId } = useParams();

    const [user, setUser] = useState<User>();
    const [errorMessage, setErrorMessage] = useState<string>('');  
    const [loading, setLoading] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);

    const [form] = Form.useForm();

    useEffect(() => {
        getUser();
    }, [userId]);

    const getUser = () => {
        if (!userId) {
            setErrorMessage("Erro ao buscar os dados do usuário.");
            return;
        }
        setLoading(true);

        fakeApi.getUserById(+userId)
        .then(
            data => {
                setUser(data.data);
                setErrorMessage('');
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

    const onFinish = async () => {
        const confirm = await Dialog.confirm({
            content: "Você tem certeza que deseja salvar as alterações?",
            cancelText: "Não",
            confirmText: "Sim",
        })

        if (confirm) {
            const name = form.getFieldValue('name');
            const email = form.getFieldValue('email');

            const newUser = new User(user!.id, email, name, user!.unitId!, user!.companyId!);
            saveUser(newUser);
        }
    }

    const saveUser = (newUser: User) => {
        setSaving(true);
        fakeApi.updateUser(newUser)
        .then(
            user => {
                setSaving(false);
                setChanged(false);

                Toast.show({
                    icon: 'success',
                    content: 'Usuário salvo com sucesso!',
                    position: 'center',
                })
            }
        )
        .catch(
            error => {
                console.log('error', error);
                setSaving(false);
            }
        )
    }
    
    return (
        <Space direction='vertical' className='main-box'>
            <Header title={user?.name ? ('Editando ' + user.name) : ''} goBackTo={`/${companyId}/${unitId}/users/`} />
        
            <Space direction='vertical' align='center' justify={loading || !!errorMessage || !user ? 'center' : 'start'} className='secondary-box'>
                {loading ?
                    <Loading color='primary'></Loading>
                : !!errorMessage ?
                    <ResultBlock 
                        status='error'
                        title={errorMessage}
                    /> 
                : !user && searched ?
                    <ResultBlock 
                        status='info'
                        title='Usuário não encontrado.'
                    />
                : user ?
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onValuesChange={() => setChanged(true)}
                        initialValues={{
                            name: user.name,
                            email: user.email,
                        }}
                        layout='vertical'
                        style={{width: '100vw'}}
                        footer={
                            <Button block color='primary' type='submit' loading={saving} disabled={saving || !changed} >
                                Salvar 
                            </Button>
                        }
                    >
                        <Form.Item 
                            label='Nome'
                            name='name'
                            rules={[{ required: true, message: 'Nome deve ser informado.' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item 
                            label='Email'
                            name='email'
                            rules={[{ required: true, message: 'Email deve ser informado.' }]}
                        >
                            <Input />
                        </Form.Item>
                    </Form>
                : null}
            </Space>
        </Space>
    )
}