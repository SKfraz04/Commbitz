interface FAQ {
    answer: string;
    question: string;
    html: string;
    _id: string;
}

interface FAQListResponse  {
    statusCode: number;
    message: string;
    data: {
        faqs: FAQ[];
    }
};

export type {
    FAQListResponse,
    FAQ
};