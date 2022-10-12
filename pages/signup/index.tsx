import { NextPage } from "next";
import Layout from "../../components/LoginSignUp/Layout";
import SignUpForm from "../../components/LoginSignUp/SignUpForm";

const SignUpPage: NextPage = () => {
  return (
    <Layout>
      <SignUpForm />
    </Layout>
  );
};

export default SignUpPage;