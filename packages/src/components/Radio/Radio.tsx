import React, { createContext, useContext, useState } from 'react';
import styles from './Radio.module.scss';

export interface RadioProps {
  checked?: boolean;
  disabled?: boolean;
  label?: string;
  value?: string;
  onChange?: (checked: boolean, value?: string) => void;
  name?: string;
  className?: string;
  showGlow?: boolean;
}

// 创建 RadioGroup 上下文
interface RadioGroupContextType {
  name: string;
  selectedValue?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

export const Radio: React.FC<RadioProps> = ({
  checked: checkedProp,
  disabled = false,
  label,
  value,
  onChange,
  name: nameProp,
  className = '',
  showGlow = true,
}) => {
  const context = useContext(RadioGroupContext);
  
  // 如果 Radio 在 RadioGroup 中，使用上下文的值
  const isInGroup = !!context;
  const name = nameProp || context?.name || 'radio';
  const disabledFinal = disabled || context?.disabled || false;
  
  // 确定是否选中
  const checked = isInGroup && value !== undefined 
    ? context.selectedValue === value 
    : !!checkedProp;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabledFinal) return;
    
    const newChecked = event.target.checked;
    
    // 如果在 RadioGroup 中，只处理选中的情况
    if (isInGroup && newChecked && value) {
      context.onChange?.(value);
    }
    
    // 调用自身的 onChange
    onChange?.(newChecked, value);
  };

  const handleClick = () => {
    if (disabledFinal || !value) return;
    
    // 如果已经在 RadioGroup 中选中，则不处理点击
    if (isInGroup && checked) return;
    
    // 如果在 RadioGroup 中，选中这个选项
    if (isInGroup) {
      context.onChange?.(value);
    }
    
    // 如果不在 RadioGroup 中，切换选中状态
    if (!isInGroup) {
      onChange?.(!checked, value);
    }
  };

  const getRadioClass = (): string => {
    let baseClass = styles.radio;
    if (checked) baseClass += ` ${styles.checked}`;
    if (disabledFinal) baseClass += ` ${styles.disabled}`;
    if (showGlow && checked) baseClass += ` ${styles.glow}`;
    return `${baseClass} ${className}`.trim();
  };

  return (
    <div 
      className={getRadioClass()}
      role="radio"
      aria-checked={checked}
      aria-disabled={disabledFinal}
      tabIndex={disabledFinal ? -1 : 0}
      onClick={handleClick}
    >
      <input
        type="radio"
        className={styles.input}
        checked={checked}
        disabled={disabledFinal}
        onChange={handleChange}
        name={name}
        value={value}
        tabIndex={-1}
      />
      <span className={styles.indicator}>
        {checked && <div className={styles.dot} />}
      </span>
      {label && (
        <label className={styles.label}>
          {label}
          {checked && <span className={styles.selectedBadge}>✓ Selected</span>}
        </label>
      )}
    </div>
  );
};

// RadioGroup 组件
export interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  children: React.ReactNode;
  label?: string;
  disabled?: boolean;
  defaultValue?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value: valueProp,
  onChange,
  name = 'radio-group',
  children,
  label,
  disabled = false,
  defaultValue,
}) => {
  // 内部状态管理
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  // 使用受控或非受控模式
  const selectedValue = valueProp !== undefined ? valueProp : internalValue;

  const handleChange = (newValue: string) => {
    if (disabled) return;
    
    if (valueProp === undefined) {
      // 非受控模式
      setInternalValue(newValue);
    }
    
    // 调用外部 onChange
    onChange?.(newValue);
  };

  const contextValue: RadioGroupContextType = {
    name,
    selectedValue,
    onChange: handleChange,
    disabled,
  };

  return (
    <RadioGroupContext.Provider value={contextValue}>
      <div className={styles.radioGroup}>
        {label && <div className={styles.groupLabel}>{label}</div>}
        <div className={styles.groupContent}>
          {children}
        </div>
      </div>
    </RadioGroupContext.Provider>
  );
};