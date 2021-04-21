export const enum SortDirection {
    Ascending = "asc",
    Descending = "desc"
}

export type Sort<T> = `${Extract<keyof T, string>} ${SortDirection}`