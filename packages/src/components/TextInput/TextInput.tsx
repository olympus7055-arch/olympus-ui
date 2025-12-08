import React, { forwardRef, useState } from 'react';
import styles from './TextInput.module.scss';

export interface TextInputProps {
    // 基础属性
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;

    // 状态
    error?: boolean;
    success?: boolean;
    loading?: boolean;

    // Web3 特色
    isAddress?: boolean; // 是否为钱包地址输入
    isENS?: boolean; // 是否为 ENS 域名输入

    // 标签和提示
    label?: string;
    helperText?: string;
    errorText?: string;

    // 图标
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;

    // 事件
    onChange?: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;

    // HTML 属性
    type?: 'text' | 'password' | 'email' | 'number';
    className?: string;
    id?: string;
    name?: string;
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    (
        {
            value,
            defaultValue,
            placeholder = '请输入内容',
            disabled = false,
            readOnly = false,
            required = false,
            error = false,
            success = false,
            loading = false,
            isAddress = false,
            isENS = false,
            label,
            helperText,
            errorText,
            startIcon,
            endIcon,
            onChange,
            onFocus,
            onBlur,
            type = 'text',
            className = '',
            id,
            name,
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);

        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) {
                onChange(event.target.value);
            }
        };

        const handleFocus = () => {
            setIsFocused(true);
            onFocus?.();
        };

        const handleBlur = () => {
            setIsFocused(false);
            onBlur?.();
        };

        // 构建 CSS 类名
        const containerClass = `
      ${styles.container}
      ${disabled ? styles.disabled : ''}
      ${error ? styles.error : ''}
      ${success ? styles.success : ''}
      ${isFocused ? styles.focused : ''}
      ${loading ? styles.loading : ''}
      ${className}
    `.trim();

        return (
            <div className={containerClass}>
                {/* 标签 */}
                {label && (
                    <label htmlFor={id} className={styles.label}>
                        {label}
                        {required && <span className={styles.required}>*</span>}
                    </label>
                )}

                {/* 输入框容器 */}
                <div className={styles.inputWrapper}>
                    {/* 前缀图标 */}
                    {startIcon && (
                        <div className={styles.startIcon}>{startIcon}</div>
                    )}

                    {/* 输入框 */}
                    <input
                        ref={ref}
                        id={id}
                        name={name}
                        type={type}
                        value={value}
                        defaultValue={defaultValue}
                        placeholder={placeholder}
                        disabled={disabled}
                        readOnly={readOnly}
                        required={required}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        className={styles.input}
                    />

                    {/* 后缀图标 */}
                    {endIcon && <div className={styles.endIcon}>{endIcon}</div>}

                    {/* Loading 状态 */}
                    {loading && (
                        <div className={styles.loadingIndicator}>
                            <div className={styles.spinner} />
                        </div>
                    )}
                </div>

                {/* 辅助文本 */}
                {(helperText || (error && errorText)) && (
                    <div
                        className={`${styles.helperText} ${error ? styles.helperTextError : ''}`}
                    >
                        {error ? errorText : helperText}
                    </div>
                )}
            </div>
        );
    }
);

TextInput.displayName = 'TextInput';

export default TextInput;
