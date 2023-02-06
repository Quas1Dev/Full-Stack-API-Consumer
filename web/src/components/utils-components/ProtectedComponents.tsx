import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface Props {
    user: string;
    redirectPath: string;
    children?: JSX.Element;
}

const ProtectedRoute: FC<Props> = ({user, redirectPath, children }) => {
    if (!user) {
        return <Navigate to={redirectPath} />
    }
    return children ? children : <Outlet />;
};

export default ProtectedRoute;