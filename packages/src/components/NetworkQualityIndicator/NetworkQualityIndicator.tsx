// File: packages/core/src/components/NetworkQualityIndicator/NetworkQualityIndicator.tsx
import React, { useState, useEffect } from 'react';
import styles from './NetworkQualityIndicator.module.scss';

export interface NetworkQualityIndicatorProps {
    /** 网络质量等级：1-差，2-中，3-良，4-优 [citation:4] */
    level: 1 | 2 | 3 | 4;
    /** 是否显示详细标签 */
    showLabel?: boolean;
    /** 自定义等级描述 */
    levelLabels?: [string, string, string, string];
    /** 回调函数 */
    onLevelChange?: (level: number) => void;
}

export const NetworkQualityIndicator: React.FC<
    NetworkQualityIndicatorProps
> = ({
    level,
    showLabel = true,
    levelLabels = ['差', '中', '良', '优'],
    onLevelChange,
}) => {
    useEffect(() => {
        onLevelChange?.(level);
    }, [level, onLevelChange]);

    const getLevelDescription = (level: number) => {
        const descriptions = {
            1: '网络质量较差，建议检查网络连接',
            2: '网络质量一般，基本功能可用',
            3: '网络质量良好，体验流畅',
            4: '网络质量优秀',
        };
        return descriptions[level as keyof typeof descriptions];
    };

    return (
        <div className={styles.qualityContainer}>
            <div className={styles.bars}>
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={`${styles.bar} ${i <= level ? styles.active : ''} ${styles[`level-${i}`]}`}
                    />
                ))}
            </div>

            {showLabel && (
                <div className={styles.label}>
                    <span className={styles.levelText}>
                        网络质量: {levelLabels[level - 1]}
                    </span>
                    <span className={styles.description}>
                        {getLevelDescription(level)}
                    </span>
                </div>
            )}
        </div>
    );
};
