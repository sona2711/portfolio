---
name: safe-start-branch
description: Creates a new git branch before any code modification to ensure safe, isolated changes.
---

# Safe start branch


## When to Use

- Before ANY file modification
- At the beginning of a development task
- When working on refactoring, features, or fixes

## Inputs

 TASK_NAME: short description of the task (used for branch naming)

## Steps

1. Generate branch name:

```bash
BRANCH_NAME="ai/${TASK_NAME// /-}-$(date +%s)"
echo $BRANCH_NAME
```

2. Create and switch to branch:

```bash
git checkout -b $BRANCH_NAME
```

3. Verify current branch:

```bash
git branch --show-current
```

## Rules

- Never reuse an existing branch
- Always prefix with `ai/`
- Always include timestamp for uniqueness
- Must be executed BEFORE any code changes

## Output

- Active branch name
- Confirmation that branch is checked out
