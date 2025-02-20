/**
 * Helper function để lấy các giá trị số từ enum
 */
function enumToNumberArray<T extends { [key: string]: number | string }>(enumObj: T): number[] {
    return Object.values(enumObj).filter((value): value is number => typeof value === 'number');
}
/**
 * Helper function để lấy cả key và value từ enum
 */
export function getEnumKeyValuePairs<T extends { [key: string]: number | string }>(enumObj: T) {
    return Object.entries(enumObj)
        .filter(([key, value]) => typeof value === 'number')
        .map(([key, value]) => ({
            label: key,
            value: value as number
        }));
}
