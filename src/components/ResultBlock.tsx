import { Result } from "antd-mobile";

interface ResultBlockProps {
    status: 'success' | 'error' | 'info' | 'waiting' | 'warning';
    title: string;
    description?: string;
}

export default (props: ResultBlockProps) => (
    <Result
        status={props.status}
        title={props.title}
        description={props.description}
    />
)