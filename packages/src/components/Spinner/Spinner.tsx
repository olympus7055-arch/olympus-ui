import React from 'react';
import styles from './Spinner.module.scss';
import type { SpinnerProps } from './types';

export const Spinner: React.FC<SpinnerProps> = ({
    size = 'medium',
    variant = 'primary',
    withText = false,
    text,
    speed = 1000,
    className = '',
    style,
}) => {
    const spinnerClasses = [
        styles.spinner,
        styles[size],
        className,
    ]
        .filter(Boolean)        // 过滤多余undefined，null，false
        .join(' ');             // 数组转字符串，类名格式

    const ringClasses = [
        styles.spinnerRing,
        styles[variant],
        styles[`size${size.charAt(0).toUpperCase() + size.slice(1)}`],
    ]
        .filter(Boolean)
        .join(' ');

    // 根据变体获取默认文本
    const getDefaultText = (): string => {
        const textMap = {
            primary: '阿波罗的太阳正在升起...',
            secondary: '雅典娜的智慧正在加载...',
            success: '德墨忒尔的丰饶正在降临...',
            warning: '赫菲斯托斯的火焰正在燃烧...',
            danger: '阿瑞斯的战争正在准备...',
        };
        return textMap[variant];
    };

    // 设置CSS自定义属性来控制速度
    const ringStyle = {
        ...style,
        '--spinner-speed': `${speed}ms`,
    } as React.CSSProperties;

    return (
        <div className={spinnerClasses} style={style}>
            <div 
                className={ringClasses} 
                style={ringStyle}
                role="status"
                aria-label="加载中"
            />
            {(withText || text) && (
                <div className={styles.spinnerText}>
                    {text || getDefaultText()}
                </div>
            )}
        </div>
    );
};

export default Spinner;