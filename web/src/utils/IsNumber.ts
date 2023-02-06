export default function isNumber(str: string): boolean {
    return /^\d+$/.test(str);
}