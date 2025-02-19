
interface MailResponse {
    statusCode: number;
    message: string;
};

interface MailPayload {
    email: string;
}

export type {
    MailResponse,
    MailPayload
};