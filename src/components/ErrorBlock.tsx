import { Button, Dialog, ErrorBlock, Space } from "antd-mobile";
import { ExclamationCircleFill } from "antd-mobile-icons";

interface ErrorBlockProps {
    title: string;
    description: string;
}

export default (props: ErrorBlockProps) => (
    <Space block direction='vertical' style={{ '--gap': '16px' }}>
        <ErrorBlock
            style={{
                background: 'var(--adm-color-secondary)'
            }}
            title={props.title}
            description={props.description}
            image={
                <ExclamationCircleFill
                    style={{
                        fontSize: 64,
                        color: 'var(--adm-color-warning)',
                    }}
                />
            }
        />
    </Space>


)