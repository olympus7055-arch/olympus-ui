export interface WalletButtonProps {
    connected?: boolean;
    address?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    loading?: boolean;
}