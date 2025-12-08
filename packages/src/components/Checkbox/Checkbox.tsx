import React, { useState, useRef } from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps {
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    loading?: boolean;
    indeterminate?: boolean;
    label?: React.ReactNode;
    description?: string;
    riskLevel?: 'low' | 'medium' | 'high';
    contractInteraction?: boolean;
    onChange?: (checked: boolean) => void;
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    defaultChecked = false,
    disabled = false,
    loading = false,
    indeterminate = false,
    label,
    description,
    riskLevel,
    contractInteraction = false,
    onChange,
    size = 'medium',
    className = '',
}) => {
    const [isChecked, setIsChecked] = useState(defaultChecked);
    const inputRef = useRef<HTMLInputElement>(null);

    const finalChecked = checked !== undefined ? checked : isChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled || loading) return;

        const newChecked = event.target.checked;
        if (checked === undefined) {
            setIsChecked(newChecked);
        }
        onChange?.(newChecked);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === ' ' || event.key === 'Enter') {
            event.preventDefault();
            if (!disabled && !loading) {
                const newChecked = !finalChecked;
                if (checked === undefined) {
                    setIsChecked(newChecked);
                }
                onChange?.(newChecked);
            }
        }
    };

    const containerClass = `
    ${styles.checkboxContainer}
    ${styles[size]}
    ${disabled ? styles.disabled : ''}
    ${loading ? styles.loading : ''}
    ${finalChecked ? styles.checked : ''}
    ${indeterminate ? styles.indeterminate : ''}
    ${contractInteraction ? styles.contractInteraction : ''}
    ${riskLevel ? styles[riskLevel] : ''}
    ${className}
  `.trim();

    return (
        <label className={containerClass}>
            {/* 隐藏的原生 input */}
            <input
                ref={inputRef}
                type="checkbox"
                checked={finalChecked}
                disabled={disabled || loading}
                onChange={handleChange}
                className={styles.nativeInput}
            />

            {/* 自定义复选框 */}
            <div className={styles.checkbox}>
                {/* Loading 状态 */}
                {loading && (
                    <div className={styles.loadingIndicator}>
                        <div className={styles.spinner} />
                    </div>
                )}

                {/* 选中状态图标 */}
                {!loading && finalChecked && !indeterminate && (
                    <svg className={styles.checkmark} viewBox="0 0 12 10">
                        <path
                            d="M1 5L4 8L11 1"
                            stroke="currentColor"
                            fill="none"
                        />
                    </svg>
                )}

                {/* 不确定状态 */}
                {!loading && indeterminate && (
                    <div className={styles.indeterminateMark}>—</div>
                )}
            </div>

            {/* 标签内容 */}
            <div className={styles.content}>
                {label && (
                    <div className={styles.label}>
                        {label}
                        {contractInteraction && (
                            <span
                                className={styles.contractBadge}
                                title="合约交互"
                            >
                                📄
                            </span>
                        )}
                        {riskLevel && (
                            <span
                                className={styles.riskBadge}
                                data-risk={riskLevel}
                            >
                                {riskLevel === 'high'
                                    ? '⚠️'
                                    : riskLevel === 'medium'
                                      ? '🔶'
                                      : '✅'}
                            </span>
                        )}
                    </div>
                )}

                {description && (
                    <div className={styles.description}>{description}</div>
                )}
            </div>
        </label>
    );
};

export default Checkbox;
