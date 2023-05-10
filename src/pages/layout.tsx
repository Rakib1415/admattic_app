'use client';
import { ConfigProvider, theme } from 'antd';
import { useEffect, useState } from 'react';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';
import { useServerInsertedHTML } from 'next/navigation';
import itIT from 'antd/locale/it_IT';

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="it">
            <head />
            <body>
                <StyleProviderLayout>{children}</StyleProviderLayout>
            </body>
        </html>
    );
}

export function StyleProviderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [cache] = useState(() => createCache());

    const render = <>{children}</>;

    useServerInsertedHTML(() => {
        return (
            <script
                dangerouslySetInnerHTML={{
                    __html: `</script>${extractStyle(cache)}<script>`,
                }}
            />
        );
    });

    if (typeof window !== 'undefined') {
        return render;
    }

    return <StyleProvider cache={cache}>{render}</StyleProvider>;
}
