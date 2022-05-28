export const sortByZIndex = <T extends { zIndex?: number }>(a: T, b: T) => (a.zIndex ?? 0) - (b.zIndex ?? 0);
