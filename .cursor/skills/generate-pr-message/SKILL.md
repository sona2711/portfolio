---
name: generate-pr-message
description: Generates a clear and structured pull request message based on recent git changes. Use this after completing work and before opening a pull request.
---

# Generate PR Message


## When to Use

- Use this skill after finishing a feature, bug fix, refactor, or styling update.
- Use this skill before creating a pull request.
- This skill is helpful for converting raw git changes into a clean, professional PR description.

## Instructions

- First, retrieve the latest changes:
    - Use `git diff`(staged or recent changes)
    - Or use `git log -1` to inspect the last commit
    - If no changes are available → STOP and ask the user to provide them
- Analyze the changes:
    - Identify what was added, updated, fixed, or removed
    - Group related changes logically
    - Determine the main purpose (feature, fix, refactor, style, etc.)
    - DO NOT guess or invent missing details
- Generate the pull request message using this structure:
    - Title
        - Short, clear, action-oriented (50–72 characters)
        - Use Conventional Commits format when possible:
            - feat: for new features
            - fix: for bug fixes
            - refactor: for code improvements without behavior change
            - style: for UI or formatting changes
            - docs: for documentation
            - chore: for maintenance
        - Format:
            - `<type>: <short description>`
        - If project does not follow this format:
            - Use a simple clear title without prefix
    - Description
        - 1–2 short sentences:
            - what was done
            - why it was done
        - No repetition of title
        - No unnecessary explanations
    - Changes
        - MUST be included
        - Use bullet points only:
            - Added ...
            - Updated ...
            - Fixed ...
            - Removed ...
        - One change per line
        - Keep concise and meaningful
    - Notes
        - Include only if necessary:
            - UI/responsiveness updates
            - breaking changes
            - important edge cases
    - Markdown Enforcement (STRICT)
        - ALWAYS use:
            - `##` headings
            - bullet points (`-`)
            - proper spacing
        - Output must be:
            - directly usable in GitHub
            - clean and scannable
    - Zero-Noise Rules
        - Do NOT invent changes — only describe what exists
        - Do NOT include raw code
        - DO NOT guess or invent missing details
        - Keep language simple and professional
- Before finishing:
    - Ensure the message reflects all significant changes
    - Markdown structure is correct

- Use the ask questions tool if:
    - no changes are available, ask the user to provide them
    - changes are unclear
    - context is missing
    - multiple features are mixed and need clarification


## Best Practices

- Think like a reviewer: optimize for fast understanding
- Prioritize clarity over completeness
- Keep output minimal but informative
- Maintain strict consistency across PRs