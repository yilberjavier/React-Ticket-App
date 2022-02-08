import React, { useState } from 'react';

import { Form, Input, Button, InputNumber, Typography, Divider } from 'antd';
import { SaveOutlined } from '@ant-design/icons/lib/icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useHideMenu } from '../hooks/useHideMenu';
import { getUsuarioStorage } from '../helpers/getUsuarioStorage';
import { Redirect } from 'react-router-dom';



export const Ingresar = () => {


    const [ usuario ] = useState( getUsuarioStorage() );

    useHideMenu( false );

    const history = useHistory();

    const { Title, Text } = Typography

    const onFinish = ({agente, escritorio}) => {
        localStorage.setItem('agente', agente);
        localStorage.setItem('escritorio', escritorio);

        history.push('/Escritorio')
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    if ( usuario.agente && usuario.escritorio ) {
        return <Redirect to="/Escritorio" />
    }


    return (
        <>
            <Title lavel={ 2 }>Ingresar</Title>
            <Text>Ingrese su nombre y numero de escritorio</Text>
            <Divider />

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Nombre del agente"
                    name="agente"
                    rules={[{ required: true, message: 'Por favor ingrese su nombre!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Escritorio"
                    name="escritorio"
                    rules={[{ required: true, message: 'Ingrese el numero de escritorio!' }]}
                >
                    <InputNumber min={1} max={99} />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 14 }}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        shape='round'
                    >
                        <SaveOutlined />
                        Ingresar
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}
