// address.ts - 钱包地址格式化工具
export type WalletAddress = `0x${string}`;

/**
 * 格式化钱包地址为短形式
 * @param address - 完整地址
 * @param options - 配置项
 * @returns 格式化后的字符串，如 "0x7c3a...ed"
 */
export const formatAddress = (
    address: string | WalletAddress,
    options?: {
        prefixLength?: number;
        suffixLength?: number;
        showEllipsis?: boolean;
    }
): string => {
    const { prefixLength = 6, suffixLength = 4, showEllipsis = true } = options || {};

    if (!address || typeof address !== 'string') return '';
    if (address.length <= prefixLength + suffixLength) return address;

    const prefix = address.slice(0, prefixLength);
    const suffix = address.slice(-suffixLength);

    return showEllipsis ? `${prefix}...${suffix}` : `${prefix}${suffix}`;
};

/**
 * 校验地址基本格式
 */
export const isValidAddressFormat = (address: string): boolean => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
};