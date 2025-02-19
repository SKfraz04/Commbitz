import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";

import { Layout } from "../../../components";
import { getPages } from "../api";


const ShippingPolicy = () => {

  const [privacyPolicy, setPrivacyPolicy] = useState<string>('');


  const mdParser = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });

  useEffect(() => {
    getPages({ type: 8 }).then((res: any) => {
      setPrivacyPolicy(res.data.data.content);
    });
    window.scrollTo(0, 0);
  }, [])

  return (
    <Layout>
      <div className="container">
        <h3 className="text-center mt-5 mb-3">Shipping Policy </h3>
        <div
          className="text-white mb-5"
          dangerouslySetInnerHTML={{
            __html: mdParser.render(privacyPolicy),
          }}
        />
      </div>
    </Layout>
  );
};

export default ShippingPolicy;