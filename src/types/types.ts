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

export interface Series {
    name: string;
    data: number[];
}

export interface BarSeries{
    series:Series[]
}

export interface ChartState {
    series: Series[];
    options: any; // Replace `any` with a more specific type if possible
}

export interface BarChartSeries {
    title: string,
    banks: string[]
}