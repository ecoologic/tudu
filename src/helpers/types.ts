// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TODO = any;
export const tShirtSizes = ["XS", "S", "M", "L", "XL"] as const;
export type TShirt = (typeof tShirtSizes)[number];
