import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Location } from 'history';

import { Button, Dialog, Form, Image, Input, List, Loading, Selector, Space, Tag, Toast } from 'antd-mobile';
import { HeartFill } from 'antd-mobile-icons';

import './AssetDetails.css'

import { Asset } from '../../models/Asset';
import fakeApi from '../../api/fake-api';
import ResultBlock from '../../components/ResultBlock';
import Header from '../../components/Header';
import { User } from '../../models/User';
import { AssetStatus } from '../../models/AssetStatus';
import { AssetSpecification } from '../../models/AssetSpecification';

export default () => {
    const { companyId, unitId, assetId } = useParams();

    const [asset, setAsset] = useState<Asset>();
    const [users, setUsers] = useState<User[]>([]);

    const [errorMessage, setErrorMessage] = useState<string>('');  
    const [loading, setLoading] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [searched, setSearched] = useState<boolean>(false);
    const [changed, setChanged] = useState<boolean>(false);

    const [form] = Form.useForm();
    
    useEffect(() => {
        getUsers();
        getAsset();
    }, [assetId]);

    const getAsset = () => {
        setLoading(true);

        fakeApi.getAssetById(+assetId!)
        .then(
            asset => {
                setAsset(asset);
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

    const getUsers = () => {
        if (!companyId || !unitId) {
            return;
        }

        fakeApi.getUsersByCompanyIdAndUnitId(+companyId, +unitId)
        .then(
            users => {
                setUsers(users.data);
                setLoading(false);
            }
        )
        .catch(
            error => {
                console.error(error);
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
            const model = form.getFieldValue('model');
            const healthscore = form.getFieldValue('healthscore');
            const status = form.getFieldValue('status');
            const inChargeId = form.getFieldValue('inChargeId');
            // const sensors = form.getFieldValue('sensors');
            // const metrics = form.getFieldValue('metrics');
            // const specifications = form.getFieldValue('specifications');
            const maxTemp = form.getFieldValue('maxTemp');
            const power = form.getFieldValue('power');
            const rpm = form.getFieldValue('rpm');

            const newAsset = new Asset(asset!.id, asset!.sensors, model, new AssetStatus(status), healthscore, name, asset!.image, new AssetSpecification({maxTemp, power, rpm}), asset!.metrics, asset!.unitId, asset!.companyId, inChargeId);
            saveAsset(newAsset);
        }
    }

    const saveAsset = (newAsset: Asset) => {
        setSaving(true);
        fakeApi.updateAsset(newAsset)
        .then(
            asset => {
                // setAsset(asset);
                setSaving(false);
                setChanged(false);

                Toast.show({
                    icon: 'success',
                    content: 'Ativo salvo com sucesso!',
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
            <Header title={asset?.name ? asset.name : ''} goBackTo={`/${companyId}/${unitId}/assets/`} />
            
            <Space direction='vertical' align='center' justify='center' className='secondary-box'>
                {loading ?
                    <Loading color='primary'></Loading>
                : !!errorMessage ?
                    <ResultBlock 
                        status='error'
                        title={errorMessage}
                    /> 
                : !asset && searched ?
                    <ResultBlock 
                        status='info'
                        title='Ativo não encontrado.'
                    />
                : asset ?
                    <>
                        <Image src={asset!.image} alt='Imagem do ativo' style={{padding: '24px'}} />
                        <Form
                            form={form}
                            onFinish={onFinish}
                            onValuesChange={() => setChanged(true)}
                            initialValues={{
                                name: asset.name,
                                model: asset.model,
                                healthscore: asset.healthscore,
                                status: asset.status.status,
                                inChargeId: asset.inChargeId,
                                // sensors: asset.sensors,
                                // metrics: asset.metrics,
                                // specifications: asset.specifications,
                                maxTemp: asset.specifications.maxTemp,
                                power: asset.specifications.power,
                                rpm: asset.specifications.rpm,
                            }}
                            layout='vertical'
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
                                label='Modelo'
                                name='model'
                                rules={[{ required: true, message: 'Modelo deve ser informado.' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item 
                                label={<>Nivel de saude <HeartFill color='red' /></>}
                                name='healthscore'
                                rules={[{ required: true, message: 'Nível de saúde deve ser informado.' }]}
                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item
                                label='Status'
                                name='status'
                                rules={[{ required: true, message: 'Status deve ser selecionado.' }]}
                            >
                                <Selector 
                                    columns={3}
                                    options={[
                                        {label: 'Em Alerta', value: 'inAlert'},
                                        {label: 'Em Operação', value: 'inOperation'},
                                        {label: 'Em Parada', value: 'inDowntime'},
    
                                    ]}
                                    defaultValue={[asset.status.status]}
                                />
                            </Form.Item>
                            <Form.Item
                                label='Responsável'
                                name='inCharge'
                            >
                                <Selector 
                                    columns={3}
                                    options={
                                        users.map((user: User) => (
                                            {label: user.name, value: user.id}
                                        ))
                                    }
                                    defaultValue={asset.inChargeId ? [asset.inChargeId] : []}
                                />
                            </Form.Item>
                            <Form.Item 
                                label='Temperatura máxima (°C)'
                                name='maxTemp'
                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item 
                                label='Potência (kWh)'
                                name='power'
                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item 
                                label='RPM'
                                name='rpm'
                            >
                                <Input type='number' />
                            </Form.Item>
                            <Form.Item 
                                label='Sensores'
                                // name='sensors'
                            >
                                {asset.sensors.map((sensor: string, index: number) => (
                                    <Tag key={index} color='primary'>{sensor}</Tag>
                                ))}
                                {/* <List>
                                    {asset.sensors.map((sensor: string, index: number) => (
                                        <List.Item 
                                            key={index} 
                                            className='asset-item'
                                        >
                                            {sensor}
                                        </List.Item>
                                    ))}
                                </List> */}
                            </Form.Item>
                            {/* {Object.keys(asset.specifications).length > 0 ?
                                <Form.Item
                                    label='Especificações'
                                    name='specifications'
                                    className='specifications'
                                >
                                    {asset.specifications.maxTemp ? 
                                        <p>Temperatura máxima: {asset.specifications.maxTemp} °C</p>
                                    : null}
                                    {asset.specifications.power ? 
                                        <p>Potência: {asset.specifications.power} kWh</p>
                                    : null}
                                    {asset.specifications.rpm ? 
                                        <p>RPM: {asset.specifications.rpm}</p>
                                    : null}                
                                </Form.Item>
                            : null} */}
                            <Form.Item
                                label='Métricas'
                                // name='metrics'
                                className='metrics'
                            >
                                <p><span>Total de coletas: </span>{asset.metrics.totalCollectsUptime}</p>
                                <p><span>Total de horas de coletas: </span>{asset.metrics.totalUptime.toFixed()}</p>
                                <p><span>Última coleta: </span>{asset.metrics.lastUptimeAt.toLocaleString()}</p>
                            </Form.Item>
                        </Form>
                    </>
                : null}
            </Space>
        </Space>
    );
}