import Layout from "../../../components/layout"

import Breadcrumb from '../../../components/breadcrumbs';
import FeaturesBanner from '../components/FeaturesBanner';
import PartnerSection from '../../../components/partnerSection';
import FeaturesShowcase from '../components/FeaturesShowcasse';
import { useEffect } from "react";

const Features = () => {
    useEffect(()=>{
        window.scrollTo(0, 0);
    },[])
    return (
        <Layout>
            <Breadcrumb />
            <FeaturesBanner />
            <FeaturesShowcase />
            <PartnerSection />
        </Layout>
    );
};

export default Features;