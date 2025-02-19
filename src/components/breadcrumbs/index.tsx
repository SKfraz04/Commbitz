import React, { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';

import breadCrumbStyles from './style.module.css';

interface BreadcrumbItem {
    segment: string;
    path: string;
}

const Breadcrumb = () => {
    const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
    const location = useLocation();

    useEffect(() => {
        updateBreadcrumbs();
    }, [location]);

    const updateBreadcrumbs = () => {
        const pathname = location.pathname;
        const pathSegments = pathname.split('/').filter((segment) => segment !== '').map((segment) => decodeURIComponent(segment));

        const breadcrumbArray: BreadcrumbItem[] = pathSegments.map((segment, index) => {
            if(segment == 'esim') {
                segment = "eSIM"
            } else if(segment == 'esim-list') {
                segment = "eSIM-list"
            } else {
                segment =  segment.charAt(0).toUpperCase() + segment.slice(1)
            }
            const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        
            return { segment, path };
        });

        setBreadcrumbs(breadcrumbArray);
    };

    return (
        <div className={breadCrumbStyles.pagination}>
            <div className='container'>
                <ul>
                    <Link to="/">Home</Link>
                    {breadcrumbs.map((breadcrumb, index) => (
                        <Fragment key={index}>
                            {index !== breadcrumbs.length - 1 ? (
                                <Link to={breadcrumb.path} className={breadCrumbStyles.active} >{breadcrumb.segment}</Link>
                            ) : (
                                <Link to={breadcrumb.path} className={breadCrumbStyles.active} >{breadcrumb.segment}</Link>
                            )}
                        </Fragment>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Breadcrumb;
