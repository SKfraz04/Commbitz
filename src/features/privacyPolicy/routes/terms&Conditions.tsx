import { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";

import { Layout } from "../../../components";
import { getPages } from "../api";


const Terms_Conditions = () => {
    const [termsConditions, setTermsConditions] = useState<string>('');

    const mdParser = new MarkdownIt({
        html: true,
        linkify: true,
        typographer: true,
    });

    useEffect(() => {
        getPages({type:2}).then(res => {
            setTermsConditions(res.data.data.content);
        })
        window.scrollTo(0, 0);
    }, [])

    return (
        <Layout>
            <div className="container">
                <h3 className="text-center mt-5 mb-3">Terms & Conditions </h3>
                <div
                    className="text-white mb-5"
                    dangerouslySetInnerHTML={{
                        __html: mdParser.render(termsConditions),
                    }}
                />
            </div>
        </Layout>
    );
};

export default Terms_Conditions;