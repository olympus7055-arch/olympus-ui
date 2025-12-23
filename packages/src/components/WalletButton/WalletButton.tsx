import React, { useMemo } from 'react';
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
    // 使用 useMemo 缓存类名计算结果
    const buttonClasses = useMemo(() => {
        return [
            styles.button,
            connected && styles.connected,
            disabled && styles.disabled,
            loading && styles.loading,
        ]
            .filter(Boolean)
            .join(' ');
    }, [connected, disabled, loading]); // 依赖项：只有这些变化时才重新计算

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