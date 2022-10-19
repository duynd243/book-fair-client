import LoginSignUpLayout from 'components/Layouts/LoginSignUpLayout';
import { NextPage } from 'next';
import LoginForm from '../../components/AuthForms/LoginForm';

const LoginPage: NextPage = () => {
    return (
        <LoginSignUpLayout>
            <LoginForm />
        </LoginSignUpLayout>
    );
};

export default LoginPage;
