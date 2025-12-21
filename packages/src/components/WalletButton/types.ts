export interface WalletButtonProps {
    connected?: boolean;
    address?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    loading?: boolean;
    chainId?: number; // 当前链ID
    networkName?: string; // 网络名称
    avatar?: string; // 钱包头像/ENS头像
    balance?: string; // 简易余额
    onDisconnect?: () => void; // 断开连接回调
}