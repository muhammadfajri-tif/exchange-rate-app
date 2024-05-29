export type InfoType = {
    jenis_kurs: string;
    [key: string]: any;
};

export type Props = {
    id: number;
    img?: string;
    title: string;
    info: InfoType;
};

export interface InfoChartProps {
    info: InfoType;
}

export type BankProfileProps = {
    users: Props[];
    bankId: number;
};

export interface ExchangeRate {
    buying: number;
    selling: number;
}

export interface Data {
    date: string;
    IDRExchangeRate: {
        USD: ExchangeRate;
        CNY: ExchangeRate;
        SGD: ExchangeRate;
        EUR: ExchangeRate;
        GBP: ExchangeRate;
        JPY: ExchangeRate;
        SAR: ExchangeRate;
    };
}