import { FC } from "react";
import { Link } from "react-router-dom";

const LandingPage: FC = () => {
    return (
        <div className="flex flex-col">
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
        </div>
    );
}
 
export default LandingPage;