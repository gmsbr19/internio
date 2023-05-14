import { useAuth } from "../context/AuthProvider/useAuth";

const ProtectedLayout = ({children}: {children: JSX.Element}) => {
    const auth = useAuth();

    if (!auth.email && !(auth.type === 'company')) {
        return <h1>Você não possui acesso ao painel de companhia.</h1>
    }

    return children;
}
 
export default ProtectedLayout;