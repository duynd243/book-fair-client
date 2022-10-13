import Layout from 'components/LoginSignUp/Layout';
import { NextPage } from 'next';
import LoginForm from '../../components/LoginSignUp/LoginForm';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        (async () => {
            if (user) {
                await router.push('/');
            }
        })().catch((err) => console.log(err));
    }, [user, router]);
    return (
        <Layout>
            <LoginForm />
        </Layout>
    );
};

export default LoginPage;
