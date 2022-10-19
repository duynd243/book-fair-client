import { NextPage } from 'next';
import LoginSignUpLayout from '../../components/Layouts/LoginSignUpLayout';
import SignUpForm from '../../components/AuthForms/SignUpForm';

const SignUpPage: NextPage = () => {
    return (
        <LoginSignUpLayout>
            <SignUpForm />
        </LoginSignUpLayout>
    );
};

export default SignUpPage;
