import { SendOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Switch, Typography } from "antd";
import { useState } from "react";
import {
  DASHBOARD_TITLE,
  MARKDOWN_OPTION_LABEL,
  PROMPT_PLACEHOLDER,
  RESPONSE_PLACEHOLDER,
} from "./consts";
import { generateText } from "@/api/googleGenAI";
import { MarkdownBody } from "@/components/_shared/MarkdownBody";
import { setCVContent } from "@/data/CVContent";
import { buildPrompt } from "@/data/promptBuilder";
import { Select } from "antd";
import type { CVSectionKey, UserData } from "@/types/cvContent";
import { useCVContent } from "@/hooks/useCVContent";
import styles from "./styles.module.css";

const PROMPT_INPUT_ID = "ai-interface-dashboard-prompt";

export const AiInterfaceDashboard = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [asMarkdown, setAsMarkdown] = useState(false);
  const [section, setSection] = useState<CVSectionKey>("summary");
  const [mode, setMode] = useState<"manual" | "auto">("manual");
  const { sections } = useCVContent();

  const userData: UserData = {
    aboutMe: sections.summary,
    role: sections.summary,
    skills: sections.skills,
    experience: sections.experience,
    projects: sections.projects,
    education: sections.education,
    certifications: sections.certifications,
    languages: sections.languages,
    interests: sections.interests,
    references: sections.references,
    virtualSelf: sections.virtualSelf,
  };
  const effectivePrompt =
    mode === "auto" ? buildPrompt(section, userData) : prompt;

  const handleClick = async () => {
    if (!effectivePrompt.trim() || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await generateText(effectivePrompt, { asMarkdown });
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
    setAsMarkdown(false);
    setMode("manual");
  };

  return (
    <div className={styles.page}>
      <Typography.Title level={4} className={styles.title}>
        {DASHBOARD_TITLE}
      </Typography.Title>
      <Flex justify="space-between" align="center">
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
        <Flex justify="center" align="center" gap="8px">
          <Switch
            checked={mode === "auto"}
            onChange={(checked) => setMode(checked ? "auto" : "manual")}
          />

          <Typography.Text>
            {mode === "auto" ? "AI Assisted" : "Manual Prompt"}
          </Typography.Text>
        </Flex>
      </Flex>
      <section className={styles.shell}>
        <div className={styles.main}>
          <div className={styles.fieldGroup}>
            <label htmlFor={PROMPT_INPUT_ID} className={styles.sectionLabel}>
              Prompt
            </label>
            <Input.TextArea
              id={PROMPT_INPUT_ID}
              disabled={mode === "auto"}
              value={effectivePrompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={PROMPT_PLACEHOLDER}
              className={styles.promptField}
              autoSize={{ minRows: 5, maxRows: 12 }}
            />
            <div className={styles.optionRow}>
              <Switch
                checked={asMarkdown}
                onChange={setAsMarkdown}
                disabled={isLoading}
              />
              <Typography.Text className={styles.optionLabel}>
                {MARKDOWN_OPTION_LABEL}
              </Typography.Text>
            </div>
          </div>

          <div className={styles.actions}>
            <Button
              type="primary"
              icon={<SendOutlined />}
              className={styles.sendButton}
              onClick={handleClick}
              loading={isLoading}
              disabled={!effectivePrompt.trim() || isLoading}
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
          </div>

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
