// File: packages/core/src/components/NetworkIndicator/NetworkIndicator.tsx
import React, { useState, useEffect } from 'react';
import styles from './NetworkIndicator.module.scss';

export interface NetworkIndicatorProps {
    chainId?: number | null;
    /** 初始网络状态 */
    initialStatus?: 'online' | 'offline' | 'checking';
    /** 状态变化回调 */
    onStatusChange?: (status: string) => void;
    /** 自定义离线时显示的文本 */
    offlineText?: string;
    /** 自定义在线时显示的文本 */
    onlineText?: string;
    /** 是否显示切换按钮 */
    showToggle?: boolean;
}

export const NetworkIndicator: React.FC<NetworkIndicatorProps> = ({
    initialStatus = 'online',
    onStatusChange,
    offlineText = '离线',
    onlineText = '在线',
    showToggle = true,
}) => {
    const [status, setStatus] = useState<'online' | 'offline' | 'checking'>(
        initialStatus
    );

    // 监听浏览器网络状态变化 [citation:6]
    useEffect(() => {
        const handleOnline = () => {
            setStatus('online');
            onStatusChange?.('online');
        };

        const handleOffline = () => {
            setStatus('offline');
            onStatusChange?.('offline');
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        // 设置初始状态
        setStatus(navigator.onLine ? 'online' : 'offline');

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [onStatusChange]);

    const handleToggle = () => {
        const newStatus = status === 'online' ? 'offline' : 'online';
        setStatus(newStatus);
        onStatusChange?.(newStatus);
    };

    return (
        <div className={styles.container}>
            <div className={`${styles.indicator} ${styles[status]}`}>
                <div className={styles.dot}></div>
                <span className={styles.text}>
                    {status === 'online'
                        ? onlineText
                        : status === 'offline'
                          ? offlineText
                          : '检查中...'}
                </span>
            </div>

            {showToggle && (
                <button
                    className={styles.toggleButton}
                    onClick={handleToggle}
                    disabled={status === 'checking'}
                >
                    切换网络
                </button>
            )}
        </div>
    );
};
