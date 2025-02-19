import React, { useEffect } from 'react';

import Layout from "../../../components/layout"


import Breadcrumb from '../../../components/breadcrumbs';
import PackagesHead from './PackagesHead';
import TopPackages from './TopPackages';
import MoreInfoDetails from './MoreInfoDetails';

const Packages = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <Layout>
      <Breadcrumb />
      <PackagesHead />
      <TopPackages />
      <MoreInfoDetails />
    </Layout>
  );
};

export default Packages;