import { Layout, Space, Typography } from "antd";
import { useTranslation } from "react-i18next";
import { FOOTER_LINKS } from "./consts";
import styles from "./styles.module.css";

export const LayoutFooter = () => {
  const { t: tLayout } = useTranslation("layout");
  const { t: tCommon } = useTranslation("common");

  return (
    <Layout.Footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <Typography.Text className={styles.brand}>
            {tCommon("brand.name")}
          </Typography.Text>
          <Typography.Text className={styles.tagline}>
            {tLayout("footer.copyright")}
          </Typography.Text>
        </div>
        <Space size={28} className={styles.links}>
          {FOOTER_LINKS.map((link) => (
            <Typography.Link
              key={link.labelKey}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noreferrer" : undefined}
              className={styles.footerLink}
            >
              {tLayout(link.labelKey)}
            </Typography.Link>
          ))}
        </Space>
      </div>
    </Layout.Footer>
  );
};
