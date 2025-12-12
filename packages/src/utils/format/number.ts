// number.ts - 数字格式化工具（为Web3设计）
export const formatTokenAmount = (
  amount: string | number,
  decimals: number = 18,
  displayDecimals: number = 4
): string => {
  // 实现逻辑：将原始值除以10^decimals，并保留指定位数
  // 此处为示例占位
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  const divisor = 10 ** decimals;
  const result = num / divisor;
  return result.toFixed(displayDecimals);
};