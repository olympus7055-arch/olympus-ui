import React from 'react';
import { formatAddress } from '@/utils/format';
import styles from './WalletButton.module.scss';
import type { WalletButtonProps } from './types';

// 使用 `export const` 声明箭头函数组件
export const WalletButton: React.FC<WalletButtonProps> = ({
    connected = false,
    address,
    onClick,
    disabled = false,
    loading = false,    
    chainId,        
    networkName,
    avatar,
    balance,
    onDisconnect
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
            const formatted = formatAddress(address, { prefixLength: 6, suffixLength: 4 });
            // 在网络名存在时显示 "Polygon: 0xab...1234"
            return networkName ? `${networkName}: ${formatted}` : formatted;
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