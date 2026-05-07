import { SendOutlined } from "@ant-design/icons";
import { Button, Input, Typography } from "antd";
import { useState } from "react";
import {
  COPY_CV_MARKDOWN_LABEL,
  COPY_ERROR_MESSAGE,
  COPY_SUCCESS_MESSAGE,
  DASHBOARD_TITLE,
  PROMPT_PLACEHOLDER,
  RESPONSE_PLACEHOLDER,
} from "./consts";
import { generateText } from "@/api/googleGenAI";
import { MarkdownBody } from "@/components/_shared/MarkdownBody";
import { setCVContent } from "@/data/CVContent";
import { buildCVProfileMarkdown } from "@/data/cvProfileMarkdown";
import { Select } from "antd";
import type { CVSectionKey } from "@/types/cvContent";
import { useCVContent } from "@/hooks/useCVContent";
import styles from "./styles.module.css";

const PROMPT_INPUT_ID = "ai-interface-dashboard-prompt";

export const AiInterfaceDashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");
  const [section, setSection] = useState<CVSectionKey>("summary");
  const { sections } = useCVContent();
  const cvProfileMarkdown = buildCVProfileMarkdown(sections);

  const handleClick = async () => {
    if (!prompt.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await generateText(prompt, { asMarkdown: true });
      setCVContent({
        sections: {
          ...sections,
          [section]: res ?? "",
        },
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to generate text";
      setCVContent({ sections: { ...sections, [section]: message } });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setPrompt("");
    setCopyStatus("");
  };

  const handleCopyCVMarkdown = async () => {
    try {
      await navigator.clipboard.writeText(cvProfileMarkdown);
      setCopyStatus(COPY_SUCCESS_MESSAGE);
    } catch {
      setCopyStatus(COPY_ERROR_MESSAGE);
    }
  };

  return (
    <div className={styles.page}>
      <Typography.Title level={4} className={styles.title}>
        {DASHBOARD_TITLE}
      </Typography.Title>
      <div>
        <Select
          value={section}
          onChange={setSection}
          style={{ width: "200px" }}
          options={[
            { value: "aboutMe", label: "About Me" },
            { value: "summary", label: "Summary" },
            { value: "experience", label: "Experience" },
            { value: "projects", label: "Projects" },
            { value: "skills", label: "Skills" },
            { value: "education", label: "Education" },
            { value: "certifications", label: "Certifications" },
            { value: "languages", label: "Languages" },
            { value: "interests", label: "Interests" },
            { value: "references", label: "References" },
            { value: "virtualSelf", label: "Virtual Self" },
          ]}
        />
      </div>
      <section className={styles.shell}>
        <div className={styles.main}>
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
              onClick={handleClick}
              loading={isLoading}
              disabled={!prompt.trim() || isLoading}
            >
              Send
            </Button>
            <Button
              htmlType="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              htmlType="button"
              className={styles.resetButton}
              onClick={handleCopyCVMarkdown}
            >
              {COPY_CV_MARKDOWN_LABEL}
            </Button>
          </div>
          {copyStatus ? (
            <Typography.Text className={styles.optionLabel}>
              {copyStatus}
            </Typography.Text>
          ) : null}

          <div className={styles.fieldGroup}>
            <Typography.Text strong className={styles.sectionLabel}>
              Response
            </Typography.Text>
            <div
              className={styles.responseBox}
              role="status"
              aria-live="polite"
            >
              {sections[section] ? (
                <MarkdownBody markdown={sections[section]} />
              ) : (
                <span className={styles.responsePlaceholder}>
                  {RESPONSE_PLACEHOLDER}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
