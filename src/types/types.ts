export type InfoType = {
    jenis_kurs: string;
    [key: string]: any;
};

export type UserProps = {
    id: number;
    img?: string;
    title: string;
    info: InfoType;
};

export type BankProfileProps = {
    users: UserProps[];
    bankId: number;
};

export interface InfoChartProps {
    currentUser: UserProps;
}

// export interface ExchangeRate {
//     buy: number;
//     sell: number;
// }

// export interface Data {
//     date: string;
//     IDRExchangeRate: {
//         USD: ExchangeRate;
//         CNY: ExchangeRate;
//         SGD: ExchangeRate;
//         EUR: ExchangeRate;
//         GBP: ExchangeRate;
//         JPY: ExchangeRate;
//         SAR: ExchangeRate;
//     };
// }

// export interface ExchangeProps {
//     title: string;
// }

export interface Series {
    name: string;
    data: number[];
}

export interface ChartState {
    series: Series[];
    options: any; // Replace `any` with a more specific type if possible
}