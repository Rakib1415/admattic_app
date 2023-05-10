import store from '@/app/store';
import { Manrope } from '@next/font/google';
import 'antd/dist/reset.css';
import { AppWrapperComponent } from 'components/AppWrapperComponent';
import LoginLayout from 'components/layout/LogInLayout';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Provider } from 'react-redux';
import '../../styles/global.css';

const inter = Manrope({ subsets: ['cyrillic'] });

export default function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const isLoginPage =
        router.route === '/login' ||
        router.route === '/register' ||
        router.route === '/forget-password' ||
        router.route === '/check-email' ||
        router.route === '/reset-password' ||
        router.route === '/reset-password-success';
    if (isLoginPage) {
        return (
            <LoginLayout>
                <Component {...pageProps} />
            </LoginLayout>
        );
    }
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <meta
                    http-equiv="Content-Security-Policy"
                    content="upgrade-insecure-requests"
                />
            </Head>
            <main className={inter.className}>
                <Provider store={store}>
                    <AppWrapperComponent>
                        <Component {...pageProps} />
                    </AppWrapperComponent>
                </Provider>
            </main>
        </>
    );
}
