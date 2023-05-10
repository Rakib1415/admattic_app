import {
    FORGETPASS_URL,
    GETOTP_URL,
    LOGIN_URL,
    RESETPASS_URL,
    SIGNUP_URL,
    VERIFY_URL,
} from 'constants/api-endpoints';
import httpService from '../../httpclient/configuration';

interface IUser {
    name: string;
    email: string;
    country: string;
    password: string;
    confirmPassword: string;
}

const signUp = ({ name, email, country, password, confirmPassword }: IUser) => {
    return httpService.post(SIGNUP_URL, {
        name,
        email,
        country,
        password,
        confirmPassword,
    });
};

const login = ({ email, password }: { email: string; password: string }) => {
    return httpService.post(LOGIN_URL, { email, password });
};

const forgetPassword = (email: string) => {
    return httpService.post(FORGETPASS_URL, { email });
};

const resetPassword = ({
    email,
    password,
    confirmPassword,
    confirmNewPassword,
}: {
    email: string;
    password: string;
    confirmPassword: string;
    confirmNewPassword: string;
}) => {
    return httpService.post(RESETPASS_URL, {
        email,
        password,
        confirmPassword,
        confirmNewPassword,
    });
};

const getOTP = (email: string) => {
    return httpService.post(GETOTP_URL, { email });
};

const verifiOTP = ({ email, otp }: { email: string; otp: string }) => {
    return httpService.post(VERIFY_URL, { email, otp });
};

const authService = {
    signUp,
    login,
    forgetPassword,
    resetPassword,
    getOTP,
    verifiOTP,
};

export default authService;
