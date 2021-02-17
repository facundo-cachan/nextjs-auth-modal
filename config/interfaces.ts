export interface Page {
    userAgent?: string;
    [key: string]: unknown;
}

export interface Parameter {
    id: number;
    propKey: string;
    value: string | null;
    editableOrNot: boolean;
    description: string | undefined;
    dataType: string;
    regex: string
}

export type Option = {
    key: string | number,
    value: string | number,
    select?: boolean | undefined
}