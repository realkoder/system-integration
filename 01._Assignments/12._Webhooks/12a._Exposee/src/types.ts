export interface IPaymentPayload {
    id: string;
    type: "SUCCEEDED" | "DENIED" | "PENDING" | "FAILED";
    created: Date;
    data: {
        id: string;
        subscription_id: string;
        created: Date;
        payment_method: "Paypal" | "MobilePay" | "ApplePay" | "CreditCard" | "BankTransfer";
    };
    request: {
        id: string;
        idempotency_key: string;
    };
}