import Head from 'next/head';
import Image from 'next/image';

const LoginLayout = ({ children }: { children: JSX.Element }) => (
    <>
        <Head>
            <title>Login</title>
            <meta
                http-equiv="Content-Security-Policy"
                content="upgrade-insecure-requests"
            />
        </Head>
        <div className="flex justify-between ">
            <div className="mt-24">
                <Image
                    src="/loginPageLeft.svg"
                    alt="Logo"
                    width={400}
                    height={800}
                />
            </div>
            <main>{children}</main>
            <div className="mt-36">
                <Image
                    src="/loginPageRight.svg"
                    alt="Logo"
                    width={300}
                    height={700}
                />
            </div>
        </div>
    </>
);

export default LoginLayout;
