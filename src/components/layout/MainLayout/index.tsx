import { Flex, Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import { LayoutFooter } from '../LayoutFooter'
import { LayoutHeader } from '../LayoutHeader'
import styles from './styles.module.css'
const { Content } = Layout

export const MainLayout = () => {
  return (
    <Layout className={styles.layout}>
      <LayoutHeader />
      <Content className={styles.content}>
        <Flex vertical className={styles.contentContainer}>
          <Outlet />
        </Flex>
      </Content>
      <LayoutFooter />
    </Layout>
  )
}
