
import Layout from "../../../components/layout"
import Breadcrumb from '../../../components/breadcrumbs';
import { useEffect, useState } from "react";
import { getPages } from "../../privacyPolicy/api";
import MarkdownIt from "markdown-it";
import aboutbnr from "../../../assets/images/aboutbnr.png"
import logo from "../../../assets/images/logo.png"
import phn from "../../../assets/images/phn.png"
import googleplay from "../../../assets/images/googleplay.svg"
import appstore from "../../../assets/images/appstore.svg"

const AboutUs = () => {
  const [aboutPage, setAboutPage] = useState<string>('');

  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  useEffect(() => {
    getPages({ type: 4 }).then(res => {
      setAboutPage(res.data.data.content);
    });
    window.scrollTo(0, 0);
  }, [])

  return (
    <Layout>
      <meta name="description" content="Learn about Commbitz, a leader in eSIM solutions. Connecting travelers in over 190+ countries with reliable, affordable, and seamless digital roaming." />
      <title>About Commbitz | Simplifying Global Connectivity</title>
      <Breadcrumb />
      <div className="newabout">
        <div className="container">
          <div className="newaboutbanner">
            <img src={aboutbnr} alt="" />
            <h3>About Us</h3>
          </div>
        </div>
      </div>
      <div className="container about-content">

        <div
          className="text-white mb-5"
          dangerouslySetInnerHTML={{
            __html: mdParser.render(aboutPage),
          }}
        />
      </div>
      <div className="phnApp">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div className="phnappleft">
                <img src={logo} alt="" />
                <p>Stay Connected, Stay Free With Commbitz, you’re not just getting an eSIM—you’re unlocking a world of effortless connectivity. Travel anywhere, anytime, without worrying about staying online</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="phnappright">
                <img src={phn} alt="" />
              </div>
            </div>
          </div>
          <div className="aboutapp">
            <h5>Download the Commbitz app today on the App Store or Google Play, and experience the future of global connectivity!</h5>
            <div className="appbtn">
              <a href="#"><img src={googleplay} alt="" /></a>
              <a href="#"><img src={appstore} alt="" /></a>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default AboutUs;