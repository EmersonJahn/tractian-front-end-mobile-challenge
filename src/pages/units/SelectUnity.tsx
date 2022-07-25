import { useParams } from "react-router-dom"

export default () => {
    const { companyId } = useParams();

    return (
        <div>
            SelectUnity {companyId}
        </div>
    );
}