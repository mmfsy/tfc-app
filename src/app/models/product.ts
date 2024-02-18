export interface ITableModel {
    headers: IProductHeader[];
    data: IProduct[];
}

export interface IProductHeader {
    id: string;
    name: string;
    columnType: 'text' | 'number' | 'list';
    isFilterable: boolean;
}

export interface IProduct {
    name: string;
    description: string;
    category: string;
    material: string;
    price: number;
    tags: string[];
}
