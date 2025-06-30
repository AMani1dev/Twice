import { Outlet } from "react-router-dom";

const WorkLayout = () => {
    return ( 
        <>
        <div className="work-layout ">
            <Outlet/>
        </div>
        </>
     );
}
 
export default WorkLayout;