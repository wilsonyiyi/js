export function add(x: number, y?: number) {
	return y ? x + y : Number.MAX_SAFE_INTEGER;
}
