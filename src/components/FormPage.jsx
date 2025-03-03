import ProcessTable from "./ProcessTable";
import ProcessForm from "./ProcessForm";

import "./FormPage.css"

const FormPage = () => {
    return (
        <div className="FormPage">
            <ProcessForm />
            <ProcessTable />
        </div>
    );
};
export default FormPage;