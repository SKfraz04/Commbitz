import React from 'react';

import Header from '../header';
import Footer from '../footer';
import { LayoutProps } from './interface';
import { useLocation } from 'react-router-dom';

const Layout = (props: LayoutProps) => {
    <meta name="description" content="Stay connected globally with Commbitz's international eSIM solutions. Enjoy high-speed, affordable data in 190+ countries with seamless travel and 24/7 support." />
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const urlToken: any = queryParams.get('token');
    if (urlToken) {
        return (
            <>
                {props.children}
            </>
        );
    } else {
        return (
            <>
                <Header />
                {props.children}
                <Footer />
            </>
        );
    }

};

export default Layout;