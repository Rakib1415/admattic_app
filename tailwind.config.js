module.exports = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],

    corePlugins: {
        container: false,
    },
    theme: {
        extend: {
            screens: {
                'mini-tab': '340px',
                'tab-sm': '768px',
                tab: '992px',
                pc: '1191px',
            },
            minWidth: {
                32: '8rem',
            },
            width: {
                content: 'fit-content',
                100: '25rem',
                108: '33rem',
                200: '50rem',
                208: '52rem',
            },
            height: {
                content: 'fit-content',
                15: '3.75rem',
                106: '44rem',
                208: '52rem',
                158: '39.5rem',
            },

            fontSize: {
                '2sm': ['16px', '21.86px'],
                '1xl': ['20px', '28px'],
                '2xl': ['28px', '38.25px'],
                '3xl': ['30px', '41px'],
                '2lg': ['18px', '24.59px'],
                '6xs': '0.6rem',
                '5xs': '0.65rem',
                '4xs': '0.675rem',
                '3xs': '0.7rem',
                '2xs': '0.725rem',
            },
            colors: {
                // Configure your color palette here
                black: '#231F20',
                red: {
                    DEFAULT: '#f33b3b',
                    200: '#f9c1c2',
                    300: '#FFEAEA',
                    500: '#f33b3b',
                    600: '#FF0047',
                    hover: '#fd6a6a',
                },
                purple: {
                    DEFAULT: '#6900B8',
                },
                blue: {
                    DEFAULT: '#006ac4',
                    700: '#0C95D7',
                    600: '#006ac4',
                    500: '#5856D6',
                    400: '#2189ff',
                    hover: '#519FF6',
                },
                green: {
                    DEFAULT: '#5bb300',
                    500: '#5bb300',
                },
                yellow: {
                    DEFAULT: '#ffcc00',
                    500: '#ffcc00',
                },
                gray: {
                    50: '#f9f9f9',
                    100: '#f5f5f5',
                    120: '#CBCBCB',
                    130: '#F8F8F8',
                    150: '#F5F5F5',
                    200: '#e7e7e7',
                    250: '#B7B7B7',
                    400: '#a0a0a0',
                    450: '#333333',
                    480: '#999999',
                    500: '#666',
                    600: '#878787',
                    650: '#CACACA',
                    hover: '#d1d1d1',
                },
            },
            padding: {
                inherit: 'inherit',
            },
            borderRadius: {
                inherit: 'inherit',
                DEFAULT: '5px',
                md: '5px',
                lg: '10px',
            },
        },
    },
    variants: {
        extend: {
            visibility: ['hover', 'group-hover'],

            display: ['hover', 'group-hover'],
            backgroundColor: ['checked'],
        },
    },
    plugins: [],
};
