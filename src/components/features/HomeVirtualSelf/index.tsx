import {
  SendOutlined,
  RobotOutlined,
} from "@ant-design/icons";
import { Card, Col, Input, Row, Space, Typography } from "antd";
import { useMemo, useState } from "react";
import { generateText } from "@/api/googleGenAI";
import { MarkdownBody } from "@/components/_shared/MarkdownBody";
import { buildCVProfileMarkdown } from "@/data/cvProfileMarkdown";
import { useCVContent } from "@/hooks/useCVContent";
import { SectionHeader } from "../../_shared/SectionHeader";
import {
  CHAT_ERROR_MESSAGE,
  CHAT_INPUT_PLACEHOLDER,
  CHAT_LOADING_MESSAGE,
  CHAT_MAX_WORDS,
  CHAT_MESSAGES,
  CHAT_SYSTEM_PROMPT,
  CHAT_STATUS,
  CHAT_TITLE,
  // VIDEO_SOURCE,
  // VIDEO_SUBTITLE,
  // VIDEO_TITLE,
} from "./consts";
import { clampAssistantAnswer, sanitizeAssistantVoice } from "./utils";
import styles from "./styles.module.css";

export const HomeVirtualSelf = ({ video }: { video: string }) => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState(CHAT_MESSAGES);
  const { sections } = useCVContent();

  const cvProfileMarkdown = useMemo(
    () => buildCVProfileMarkdown(sections),
    [sections],
  );

  const sendMessage = async () => {
    const question = inputValue.trim();
    if (!question || isLoading) {
      return;
    }

    const userMessage = {
      id: `user-${Date.now()}`,
      text: question,
      variant: "accent" as const,
      role: "user" as const,
    };

    setMessages((previousMessages) => [...previousMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const prompt = `${CHAT_SYSTEM_PROMPT}

CV context:
${cvProfileMarkdown}

Visitor question:
${question}`;
      const answer = await generateText(prompt);
      const sanitizedAnswer = sanitizeAssistantVoice(answer.trim());
      const shortAnswer = clampAssistantAnswer(sanitizedAnswer, CHAT_MAX_WORDS);

      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `assistant-${Date.now()}`,
          text: shortAnswer || CHAT_ERROR_MESSAGE,
          variant: "neutral",
          role: "assistant",
        },
      ]);
    } catch {
      setMessages((previousMessages) => [
        ...previousMessages,
        {
          id: `assistant-error-${Date.now()}`,
          text: CHAT_ERROR_MESSAGE,
          variant: "neutral",
          role: "assistant",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.section}>
      <SectionHeader title="Meet My Virtual Self" />
      <Typography.Paragraph className={styles.sectionSubtitle}>
        An interactive way to explore my background through AI.
      </Typography.Paragraph>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={10}>
          <div className={styles.videoWrap}>
            <video className={styles.video} controls preload="metadata">
              <source src={video} type="video/mp4" />
            </video>
          </div>
          {/* <div className={styles.videoMeta}>
            <Typography.Paragraph className={styles.videoTitle}>
              {VIDEO_TITLE}
            </Typography.Paragraph>
            <Typography.Paragraph className={styles.videoSubtitle}>
              {VIDEO_SUBTITLE}
            </Typography.Paragraph>
          </div> */}
        </Col>
        <Col xs={24} md={14}>
          <Card className={styles.chatCard}>
            <div className={styles.chatHeader}>
              <div className={styles.chatIconWrap}>
                <RobotOutlined />
              </div>
              <div>
                <Typography.Text strong className={styles.chatTitle}>
                  {CHAT_TITLE}
                </Typography.Text>
                <Typography.Text className={styles.chatStatus}>
                  {CHAT_STATUS}
                </Typography.Text>
              </div>
            </div>
            <Space orientation="vertical" size={12} className={styles.chatBody}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={
                    message.variant === "accent"
                      ? styles.chatBubbleAccent
                      : styles.chatBubble
                  }
                >
                  {message.role === "assistant" ? (
                    <MarkdownBody markdown={message.text} />
                  ) : (
                    message.text
                  )}
                </div>
              ))}
              {isLoading ? (
                <div className={styles.chatBubble}>{CHAT_LOADING_MESSAGE}</div>
              ) : null}
            </Space>
            <div className={styles.chatInput}>
              <Input
                variant="borderless"
                placeholder={CHAT_INPUT_PLACEHOLDER}
                className={styles.chatInputField}
                aria-label="Message"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onPressEnter={sendMessage}
                disabled={isLoading}
              />
              <button
                type="button"
                className={styles.sendButton}
                aria-label="Send message"
                onClick={sendMessage}
                disabled={!inputValue.trim() || isLoading}
              >
                <SendOutlined />
              </button>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  );
};
