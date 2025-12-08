import React from 'react';
import styles from './WalletButton.module.scss'; // 导入 CSS Modules

export interface WalletButtonProps {
    connected?: boolean;
    address?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled?: boolean;
    loading?: boolean;
}

export function WalletButton({
    connected = false,
    address,
    onClick,
    disabled = false,
    loading = false,
}: WalletButtonProps) {
    const getButtonClass = (): string => {
        let className = styles.button; // 使用 styles.xxx 访问类名

        if (connected) {
            className += ` ${styles.connected}`;
        }

        if (disabled) {
            className += ` ${styles.disabled}`;
        }

        if (loading) {
            className += ` ${styles.loading}`;
        }

        return className;
    };

    const getButtonText = (): string => {
        if (loading) return 'Connecting...';
        if (connected && address) {
            return `🔗 ${address.slice(0, 6)}...${address.slice(-4)}`;
        }
        return '🦊 Connect Wallet';
    };

    return (
        <button
            className={getButtonClass()} // 应用 CSS Modules 类名
            onClick={onClick}
            disabled={disabled || loading}
        >
            {getButtonText()}
        </button>
    );
}
