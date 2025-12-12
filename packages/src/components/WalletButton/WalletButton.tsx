import React from 'react';
import { formatAddress } from '@/utils/format/address';
import styles from './WalletButton.module.scss';
import type { WalletButtonProps } from './types';

// 使用 `export const` 声明箭头函数组件
export const WalletButton: React.FC<WalletButtonProps> = ({
    connected = false,
    address,
    onClick,
    disabled = false,
    loading = false,
}) => {
    const buttonClasses = [
        styles.button,
        connected && styles.connected,
        disabled && styles.disabled,
        loading && styles.loading,
    ]
        .filter(Boolean)
        .join(' ');

    const getButtonText = (): string => {
        if (loading) return 'Connecting...';
        if (connected && address) {
            return formatAddress(address, { prefixLength: 6, suffixLength: 4 });
        }
        return 'Connect Wallet';
    };

    return (
        <button
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled || loading}
            type="button" // 显式声明按钮类型，避免在表单中意外提交
        >
            {getButtonText()}
        </button>
    );
};