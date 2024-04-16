import { Navigate, Outlet } from 'react-router-dom';
import { useAppDispatch } from '../redux/hooks';
import { protectedRouteModel } from '../redux/features/protectedRouteSlice';
import { useEffect, useState } from 'react';

const ProtectedRoutes = ({ socket }: any) => {
    const dispatch = useAppDispatch();
    const [verify, setVerify] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        socket.emit("verifytoken-client", { token: localStorage.getItem('token') });

        socket.on("verifytoken-server", (data: any) => {
            setVerify(true);
            setLoading(false);
            console.log(data);
        });

        socket.on("error", (data: any) => {
            setVerify(false);
            setLoading(false);
            console.log(data);
        });

        return () => {
            socket.off("verifytoken-server");
            socket.off("error");
        };
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    } else if (verify) {
        dispatch(protectedRouteModel(true));
        return <Outlet />;
    } else {
        dispatch(protectedRouteModel(false));
        return <Navigate to='/' />;
    }
};

export default ProtectedRoutes;
