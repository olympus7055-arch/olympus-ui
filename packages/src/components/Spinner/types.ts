export interface SpinnerProps {
    /**
     * 加载器尺寸
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    
    /**
     * 加载器变体
     * @default 'primary'
     */
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
    
    /**
     * 是否显示加载文本
     * @default false
     */
    withText?: boolean;
    
    /**
     * 自定义加载文本内容
     */
    text?: string;
    
    /**
     * 加载器速度（毫秒）
     * @default 1000
     */
    speed?: number;
    
    /**
     * 自定义CSS类名
     */
    className?: string;
    
    /**
     * 内联样式
     */
    style?: React.CSSProperties;
}

export type SpinnerSize = SpinnerProps['size'];
export type SpinnerVariant = SpinnerProps['variant'];