import { SendOutlined } from '@ant-design/icons'
import type { MenuProps, SelectProps } from 'antd'
import { Button, Input, Layout, Menu, Select, Typography } from 'antd'
import { useCallback, useMemo, useState } from 'react'
import {
  DASHBOARD_TITLE,
  DEFAULT_ACTIVE_KEY,
  MOBILE_NAV_PLACEHOLDER,
  PROMPT_PLACEHOLDER,
  RESPONSE_PLACEHOLDER,
  SIDEBAR_NAV_ITEMS,
} from './consts'
import styles from './styles.module.css'
import type { SidebarNavKey } from './types'
import { useDesktopSidebarLayout } from './utils'

const { Sider, Content } = Layout

const PROMPT_INPUT_ID = 'ai-interface-dashboard-prompt'

export const AiInterfaceDashboard = () => {
  const showSider = useDesktopSidebarLayout()
  const [activeKey, setActiveKey] = useState<SidebarNavKey>(DEFAULT_ACTIVE_KEY)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const menuItems: MenuProps['items'] = useMemo(
    () => SIDEBAR_NAV_ITEMS.map((item) => ({ key: item.key, label: item.label })),
    [],
  )

  const selectOptions: SelectProps<SidebarNavKey>['options'] = useMemo(
    () => SIDEBAR_NAV_ITEMS.map((item) => ({ value: item.key, label: item.label })),
    [],
  )

  const handleSend = useCallback(() => {
    const trimmed = prompt.trim()
    if (!trimmed) {
      setResponse('')
      return
    }
    setResponse(trimmed)
  }, [prompt])

  const handleReset = useCallback(() => {
    setPrompt('')
    setResponse('')
  }, [])

  const handleMenuClick: MenuProps['onClick'] = useCallback(({ key }) => {
    setActiveKey(key as SidebarNavKey)
  }, [])

  const handleSelectChange = useCallback((value: SidebarNavKey) => {
    setActiveKey(value)
  }, [])

  return (
    <div className={styles.page}>
      <Typography.Title level={4} className={styles.title}>
        {DASHBOARD_TITLE}
      </Typography.Title>

      <Layout className={styles.shell} hasSider={showSider}>
        {showSider ? (
          <Sider className={styles.sider} width={260} theme="light">
            <Menu
              mode="inline"
              selectedKeys={[activeKey]}
              items={menuItems}
              onClick={handleMenuClick}
              className={styles.menu}
            />
          </Sider>
        ) : (
          <div className={styles.mobileNav}>
            <label className={styles.mobileNavLabel} htmlFor="ai-dashboard-generator-select">
              {MOBILE_NAV_PLACEHOLDER}
            </label>
            <Select<SidebarNavKey>
              id="ai-dashboard-generator-select"
              value={activeKey}
              options={selectOptions}
              onChange={handleSelectChange}
              className={styles.navSelect}
              size="large"
              popupMatchSelectWidth={false}
              listHeight={320}
            />
          </div>
        )}
        <Content className={styles.main}>
          <div className={styles.fieldGroup}>
            <label htmlFor={PROMPT_INPUT_ID} className={styles.sectionLabel}>
              Prompt
            </label>
            <Input.TextArea
              id={PROMPT_INPUT_ID}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={PROMPT_PLACEHOLDER}
              className={styles.promptField}
              autoSize={{ minRows: 5, maxRows: 12 }}
            />
          </div>

          <div className={styles.actions}>
            <Button
              type="primary"
              icon={<SendOutlined />}
              className={styles.sendButton}
              onClick={handleSend}
            >
              Send
            </Button>
            <Button htmlType="button" className={styles.resetButton} onClick={handleReset}>
              Reset
            </Button>
          </div>

          <div className={styles.fieldGroup}>
            <Typography.Text strong className={styles.sectionLabel}>
              Response
            </Typography.Text>
            <div className={styles.responseBox} role="status" aria-live="polite">
              {response ? (
                response
              ) : (
                <span className={styles.responsePlaceholder}>{RESPONSE_PLACEHOLDER}</span>
              )}
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  )
}
