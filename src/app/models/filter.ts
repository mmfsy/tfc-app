export interface IFilter {
    key: string;
    title?: string;
}

export interface IArrayFilter extends IFilter {
    value: string[];
}

export interface ITextFilter extends IFilter {
    value: string;
}

export interface INumberFilter extends IFilter {
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
