export interface IArrayFilter {
    key: string;
    value: string[];
}

export interface ITextFilter {
    key: string;
    value: string;
}

export interface INumberFilter {
    key: string;
    value: INumberFilterValue;
}

export interface INumberFilterValue {
    min: number;
    max: number;
    absoluteMin: number;
    absoluteMax: number;
}

export interface IFilters {
    [key: string]: string | string[] | INumberFilterValue;
}
