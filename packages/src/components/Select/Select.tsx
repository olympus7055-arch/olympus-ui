import React, { useState, useRef, useEffect } from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
    icon?: React.ReactNode; // 链图标/代币图标
    balance?: string; // 余额 (Web3 特色)
    prefix?: string; // 地址前缀
}

export interface SelectProps {
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    loading?: boolean;
    searchable?: boolean; // 是否可搜索
    onSelect?: (value: string, option: SelectOption) => void;
    onSearch?: (query: string) => void; // 搜索回调
    className?: string;
}

export const Select: React.FC<SelectProps> = ({
    options,
    value,
    defaultValue,
    placeholder = '请选择',
    disabled = false,
    loading = false,
    searchable = false,
    onSelect,
    onSearch,
    className = '',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value || defaultValue);
    const [searchQuery, setSearchQuery] = useState('');
    const selectRef = useRef<HTMLDivElement>(null);

    // 处理点击外部关闭
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                selectRef.current &&
                !selectRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () =>
            document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const selectedOption = options.find((opt) => opt.value === selectedValue);

    const handleSelect = (option: SelectOption) => {
        setSelectedValue(option.value);
        setIsOpen(false);
        onSelect?.(option.value, option);
    };

    const filteredOptions =
        searchable && searchQuery
            ? options.filter(
                  (opt) =>
                      opt.label
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase()) ||
                      opt.value
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
              )
            : options;

    return (
        <div
            ref={selectRef}
            className={`
        ${styles.selectContainer}
        ${disabled ? styles.selectDisabled : ''}
        ${isOpen ? styles.selectOpen : ''}
        ${className}
      `.trim()}
        >
            {/* 选择框触发器 */}
            <div
                className={styles.selectTrigger}
                onClick={() => !disabled && !loading && setIsOpen(!isOpen)}
            >
                {selectedOption ? (
                    <div className={styles.selectedValue}>
                        {selectedOption.icon && (
                            <span className={styles.selectedIcon}>
                                {selectedOption.icon}
                            </span>
                        )}
                        <span className={styles.selectedLabel}>
                            {selectedOption.label}
                        </span>
                        {selectedOption.balance && (
                            <span className={styles.selectedBalance}>
                                {selectedOption.balance}
                            </span>
                        )}
                    </div>
                ) : (
                    <span className={styles.placeholder}>{placeholder}</span>
                )}

                <div className={styles.arrow}>{loading ? '⏳' : '▼'}</div>
            </div>

            {/* 下拉菜单 */}
            {isOpen && (
                <div className={styles.dropdown}>
                    {/* 搜索框 */}
                    {searchable && (
                        <div className={styles.searchBox}>
                            <input
                                type="text"
                                placeholder="搜索..."
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    onSearch?.(e.target.value);
                                }}
                                className={styles.searchInput}
                                autoFocus
                            />
                        </div>
                    )}

                    {/* 选项列表 */}
                    <div className={styles.optionsList}>
                        {filteredOptions.map((option) => (
                            <div
                                key={option.value}
                                className={`
                  ${styles.selectOption}
                  ${selectedValue === option.value ? styles.selectSelected : ''}
                `.trim()}
                                onClick={() => handleSelect(option)}
                            >
                                {option.icon && (
                                    <span className={styles.optionIcon}>
                                        {option.icon}
                                    </span>
                                )}

                                <div className={styles.optionContent}>
                                    <div className={styles.optionLabel}>
                                        {option.prefix && (
                                            <span
                                                className={styles.optionPrefix}
                                            >
                                                {option.prefix}
                                            </span>
                                        )}
                                        {option.label}
                                    </div>

                                    {option.balance && (
                                        <div className={styles.optionBalance}>
                                            {option.balance}
                                        </div>
                                    )}
                                </div>

                                {selectedValue === option.value && (
                                    <div className={styles.checkmark}>✓</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Select;
