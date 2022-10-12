import Layout from 'components/LoginSignUp/Layout';
import { NextPage } from 'next';
import LoginForm from '../../components/LoginSignUp/LoginForm';

const LoginPage : NextPage = () => {
    return (
        <Layout>
            <LoginForm />
        </Layout>
    )
}

export default LoginPage;