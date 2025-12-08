import React, { useState } from 'react';
import '../../packages/src/styles/olympus.scss';
import { WalletButton } from '../../packages/src/components/WalletButton';
import { NetworkIndicator } from '../../packages/src/components/NetworkIndicator';
import { NetworkQualityIndicator } from '../../packages/src/components/NetworkQualityIndicator';
import { TextInput } from '../../packages/src/components/TextInput';
import { Select } from '../../packages/src/components/Select';
import { Checkbox } from '../../packages/src/components/Checkbox';
import { Radio, RadioGroup } from '../../packages/src/components/Radio';
import styles from './App.module.css';

// 定义组件标签类型
interface ComponentTab {
    id: string;
    label: string;
    description: string;
    component: React.ReactNode;
}

const App: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>('wallet-button');
    const [selected, setSelected] = useState('option1');

    // 组件展示配置
    const componentTabs: ComponentTab[] = [
        {
            id: 'wallet-button',
            label: 'WalletButton',
            description: '钱包连接按钮',
            component: (
                <div className={styles.componentShowcase}>
                    <div className={styles.componentHeader}>
                        <h2>WalletButton 钱包连接按钮</h2>
                        <p>
                            用于连接和显示钱包状态的按钮组件，支持多种交互状态
                        </p>
                    </div>

                    <div className={styles.componentVariants}>
                        <div className={styles.variant}>
                            <h4>默认状态</h4>
                            <p>未连接钱包时的状态</p>
                            <WalletButton
                                onClick={() => console.log('连接钱包')}
                            />
                        </div>

                        <div className={styles.variant}>
                            <h4>已连接状态</h4>
                            <p>显示格式化后的钱包地址</p>
                            <WalletButton
                                connected={true}
                                address="0x742d35Abc9d5d7a4d35a0b8c1c8d35a"
                                onClick={() => console.log('断开连接')}
                            />
                        </div>

                        <div className={styles.variant}>
                            <h4>Loading 状态</h4>
                            <p>连接过程中的加载状态</p>
                            <WalletButton loading={true} onClick={() => { }} />
                        </div>

                        <div className={styles.variant}>
                            <h4>禁用状态</h4>
                            <p>不可交互状态</p>
                            <WalletButton disabled={true} onClick={() => { }} />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'network-indicator',
            label: 'NetworkIndicator',
            description: '网络状态指示器',
            component: (
                <div className={styles.componentShowcase}>
                    <div className={styles.componentHeader}>
                        <h2>NetworkIndicator 网络状态指示器</h2>
                        <p>显示当前区块链网络状态和连接信息</p>
                    </div>

                    <div className={styles.componentVariants}>
                        <div className={styles.variant}>
                            <h4>主网状态</h4>
                            <p>以太坊主网</p>
                            <NetworkIndicator initialStatus={'checking'} />
                        </div>

                        <div className={styles.variant}>
                            <h4>测试网状态</h4>
                            <p>Goerli 测试网</p>
                            <NetworkIndicator chainId={5} />
                        </div>

                        <div className={styles.variant}>
                            <h4>未知网络</h4>
                            <p>未识别的网络</p>
                            <NetworkIndicator chainId={999} />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'network-quality',
            label: 'NetworkQuality',
            description: '网络质量指示器',
            component: (
                <div className={styles.componentShowcase}>
                    <div className={styles.componentHeader}>
                        <h2>NetworkQualityIndicator 网络质量指示器</h2>
                        <p>可视化显示当前网络连接质量状态</p>
                    </div>

                    <div className={styles.componentVariants}>
                        <div className={styles.variant}>
                            <h4>质量等级 1 - 优秀</h4>
                            <p>网络连接良好，延迟低</p>
                            <NetworkQualityIndicator level={1} />
                        </div>

                        <div className={styles.variant}>
                            <h4>质量等级 2 - 良好</h4>
                            <p>网络连接正常</p>
                            <NetworkQualityIndicator level={2} />
                        </div>

                        <div className={styles.variant}>
                            <h4>质量等级 3 - 一般</h4>
                            <p>网络连接一般，可能有延迟</p>
                            <NetworkQualityIndicator level={3} />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'text-input',
            label: 'TextInput',
            description: '文本输入框',
            component: (
                <div className={styles.componentShowcase}>
                    <div className={styles.componentHeader}>
                        <h2>TextInput 文本输入框</h2>
                        <p>多功能输入框组件，支持各种状态和 Web3 特色功能</p>
                    </div>

                    <div className={styles.componentVariants}>
                        <div className={styles.variant}>
                            <h4>基础输入框</h4>
                            <TextInput placeholder="请输入内容" />
                        </div>

                        <div className={styles.variant}>
                            <h4>带标签输入框</h4>
                            <TextInput
                                label="钱包地址"
                                placeholder="0x..."
                                isAddress
                            />
                        </div>

                        <div className={styles.variant}>
                            <h4>错误状态</h4>
                            <TextInput
                                error
                                errorText="请输入有效的地址"
                                placeholder="0x..."
                            />
                        </div>

                        <div className={styles.variant}>
                            <h4>禁用状态</h4>
                            <TextInput disabled placeholder="不可编辑" />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'select',
            label: 'Select',
            description: '下拉选择器',
            component: (
                <div className={styles.componentShowcase}>
                    <div className={styles.componentHeader}>
                        <h2>Select 下拉选择器</h2>
                        <p>多功能下拉选择组件，专为 Web3 场景优化</p>
                    </div>

                    <div className={styles.componentVariants}>
                        {/* 基础选择器 */}
                        <div className={styles.variant}>
                            <h4>基础选择器</h4>
                            <p>默认状态的下拉选择</p>
                            <Select
                                options={[
                                    { value: 'eth', label: 'Ethereum Mainnet' },
                                    {
                                        value: 'goerli',
                                        label: 'Goerli Testnet',
                                    },
                                    { value: 'polygon', label: 'Polygon' },
                                    { value: 'bsc', label: 'BNB Chain' },
                                ]}
                                placeholder="选择区块链网络"
                            />
                        </div>

                        {/* 带图标的选择器 */}
                        <div className={styles.variant}>
                            <h4>带图标的选择器</h4>
                            <p>显示链图标和余额信息</p>
                            <Select
                                options={[
                                    {
                                        value: 'eth',
                                        label: 'Ethereum',
                                        icon: '🔷',
                                        balance: '1.2 ETH',
                                    },
                                    {
                                        value: 'matic',
                                        label: 'Polygon',
                                        icon: '🟣',
                                        balance: '150 MATIC',
                                    },
                                    {
                                        value: 'bnb',
                                        label: 'BNB Chain',
                                        icon: '🟡',
                                        balance: '5.8 BNB',
                                    },
                                    {
                                        value: 'avax',
                                        label: 'Avalanche',
                                        icon: '🔺',
                                        balance: '12 AVAX',
                                    },
                                ]}
                                placeholder="选择网络并查看余额"
                            />
                        </div>

                        {/* 代币选择器 */}
                        <div className={styles.variant}>
                            <h4>代币选择器</h4>
                            <p>用于选择交易对或代币</p>
                            <Select
                                options={[
                                    {
                                        value: 'usdc',
                                        label: 'USDC',
                                        icon: '💵',
                                        balance: '1,000.00',
                                    },
                                    {
                                        value: 'usdt',
                                        label: 'USDT',
                                        icon: '💸',
                                        balance: '500.50',
                                    },
                                    {
                                        value: 'dai',
                                        label: 'DAI',
                                        icon: '🟢',
                                        balance: '2,000.00',
                                    },
                                    {
                                        value: 'eth',
                                        label: 'WETH',
                                        icon: '🔷',
                                        balance: '1.2',
                                    },
                                ]}
                                placeholder="选择代币"
                            />
                        </div>

                        {/* 可搜索的选择器 */}
                        <div className={styles.variant}>
                            <h4>可搜索的选择器</h4>
                            <p>支持搜索过滤长列表</p>
                            <Select
                                searchable={true}
                                options={[
                                    { value: '0x1', label: 'Ethereum Mainnet' },
                                    { value: '0x5', label: 'Goerli Testnet' },
                                    {
                                        value: '0xaa36a7',
                                        label: 'Sepolia Testnet',
                                    },
                                    { value: '0x89', label: 'Polygon Mainnet' },
                                    {
                                        value: '0x13881',
                                        label: 'Polygon Mumbai',
                                    },
                                    { value: '0x38', label: 'BNB Chain' },
                                    { value: '0x61', label: 'BNB Testnet' },
                                    {
                                        value: '0xa86a',
                                        label: 'Avalanche C-Chain',
                                    },
                                    {
                                        value: '0xa869',
                                        label: 'Avalanche Fuji',
                                    },
                                ]}
                                placeholder="搜索网络..."
                            />
                        </div>

                        {/* 禁用状态 */}
                        <div className={styles.variant}>
                            <h4>禁用状态</h4>
                            <p>不可交互的选择器</p>
                            <Select
                                disabled={true}
                                options={[
                                    { value: 'eth', label: 'Ethereum' },
                                    { value: 'polygon', label: 'Polygon' },
                                ]}
                                placeholder="选择器已禁用"
                            />
                        </div>

                        {/* 选中状态 */}
                        <div className={styles.variant}>
                            <h4>已选中状态</h4>
                            <p>显示默认选中的值</p>
                            <Select
                                value="eth"
                                options={[
                                    {
                                        value: 'eth',
                                        label: 'Ethereum',
                                        icon: '🔷',
                                    },
                                    {
                                        value: 'polygon',
                                        label: 'Polygon',
                                        icon: '🟣',
                                    },
                                    {
                                        value: 'bsc',
                                        label: 'BNB Chain',
                                        icon: '🟡',
                                    },
                                ]}
                                placeholder="选择网络"
                            />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'checkbox',
            label: 'Checkbox',
            description: '复选框组件',
            component: (
                <div className={styles.componentShowcase}>
                    <div className={styles.componentHeader}>
                        <h2>Checkbox 复选框</h2>
                        <p>支持多种状态的复选框，专为 Web3 场景优化</p>
                    </div>

                    <div className={styles.componentVariants}>
                        {/* 基础复选框 */}
                        <div className={styles.variant}>
                            <h4>基础复选框</h4>
                            <Checkbox size='small' label="我同意服务条款" />
                        </div>

                        {/* 带描述的复选框 */}
                        <div className={styles.variant}>
                            <h4>带说明的复选框</h4>
                            <Checkbox
                                label="启用滑点保护"
                                description="交易时将自动设置 1% 的滑点保护"
                            />
                        </div>

                        {/* 风险等级 */}
                        <div className={styles.variant}>
                            <h4>风险提示复选框</h4>
                            <Checkbox
                                label="进行高风险交易"
                                riskLevel="high"
                                description="此操作涉及高风险资产，请谨慎操作"
                            />
                        </div>

                        {/* 合约交互 */}
                        <div className={styles.variant}>
                            <h4>合约交互复选框</h4>
                            <Checkbox
                                label="授权合约访问"
                                contractInteraction
                                description="此操作需要与智能合约进行交互"
                            /><br />
                            {/* Web3 特色 */}
                            <Checkbox
                                label="合约交互复选框"
                                contractInteraction
                                description="此操作将调用智能合约"
                            /><br />
                            {/* 风险等级 */}
                            <Checkbox label="低风险操作" riskLevel="low" /><br />
                            <Checkbox label="中风险操作" riskLevel="medium" defaultChecked /><br />
                            <Checkbox label="高风险操作" riskLevel="high" /><br />
                            <Checkbox
                                label="高风险合约交互"
                                riskLevel="high"
                                contractInteraction
                                description="同时具有风险等级和合约交互特性"
                            /><br />
                            {/* 组合使用 */}
                            <Checkbox
                                size="large"
                                label="完整的 Web3 操作"
                                description="这是一个包含所有特性的示例"
                                contractInteraction
                                riskLevel="high"
                                loading
                            />
                        </div>

                        {/* 加载状态 */}
                        <div className={styles.variant}>
                            <h4>加载状态</h4>
                            <Checkbox label="处理交易中..." loading />
                        </div>

                        {/* 不确定状态 */}
                        <div className={styles.variant}>
                            <h4>不确定状态</h4>
                            <Checkbox label="部分选择" indeterminate />
                        </div>
                    </div>
                </div>
            ),
        },
        {
            id: 'radio',
            label: 'Radio',
            description: '单选框组件',
            component: (
                <div className={styles.componentShowcase}>
                    <div className={styles.componentHeader}>
                        <h2>Radio 单选框</h2>
                        <p>
                            用于在多个选项中选择单个选项的组件，支持多种交互状态
                        </p>
                    </div>

                    <div className={styles.componentVariants}>
                        <div className={styles.variant}>
                            <h4>单个 Radio</h4>
                            <p>独立使用的单选框</p>
                            <div style={{ display: 'flex', gap: '20px' }}>
                                <Radio
                                    label="Option A"
                                    onChange={(checked) => console.log('A选中:', checked)}
                                />
                                <Radio
                                    checked={true}
                                    label="Option B (默认选中)"
                                    onChange={(checked) => console.log('B选中:', checked)}
                                />
                            </div>
                        </div>

                        <div className={styles.variant}>
                            <h4>RadioGroup - 单选组</h4>
                            <p>点击一个会自动取消其他</p>
                            <RadioGroup
                                label="选择区块链网络"
                                defaultValue="ethereum"
                                onChange={(value) => console.log('选中网络:', value)}
                            >
                                <Radio value="ethereum" label="🦊 Ethereum" />
                                <Radio value="polygon" label="🔺 Polygon" />
                                <Radio value="arbitrum" label="⚡ Arbitrum" />
                                <Radio value="optimism" label="🌈 Optimism" />
                            </RadioGroup>
                        </div>

                        <div className={styles.variant}>
                            <h4>禁用状态</h4>
                            <p>不可交互状态</p>
                            <RadioGroup
                                label="选择支付方式（禁用）"
                                value="metamask"
                                disabled={true}
                            >
                                <Radio value="metamask" label="MetaMask" />
                                <Radio value="walletconnect" label="WalletConnect" />
                                <Radio value="coinbase" label="Coinbase Wallet" />
                            </RadioGroup>
                        </div>

                        <div className={styles.variant}>
                            <h4>动态更新</h4>
                            <p>选中值变化示例</p>
                            <RadioGroup
                                label="选择代币"
                                name="token-select"
                                onChange={(value) => console.log('选中代币:', value)}
                            >
                                <Radio value="eth" label="ETH" />
                                <Radio value="usdt" label="USDT" />
                                <Radio value="usdc" label="USDC" />
                                <Radio value="dai" label="DAI" />
                            </RadioGroup>
                        </div>
                    </div>
                </div>
            ),
        }
    ];

    const activeComponent = componentTabs.find(
        (tab) => tab.id === activeTab
    )?.component;

    return (
        <div className={styles.playgroundContainer}>
            {/* 左侧边栏导航 */}
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>⚡</span>
                        <span className={styles.logoText}>Olympus UI</span>
                    </div>
                    <p className={styles.slogan}>Web3 组件库</p>
                </div>

                <nav className={styles.sidebarNav}>
                    {componentTabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`${styles.navButton} ${activeTab === tab.id
                                ? styles.navButtonActive
                                : ''
                                }`}
                            onClick={() => setActiveTab(tab.id)}
                        >
                            <span className={styles.navLabel}>{tab.label}</span>
                            <span className={styles.navDescription}>
                                {tab.description}
                            </span>
                        </button>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <div className={styles.version}>v0.1.0</div>
                </div>
            </aside>

            {/* 右侧主内容区域 */}
            <main className={styles.mainContent}>
                {activeComponent || (
                    <div className={styles.emptyState}>
                        <h2>选择左侧组件开始探索</h2>
                        <p>从边栏中选择一个组件来查看其演示和不同状态</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default App;
