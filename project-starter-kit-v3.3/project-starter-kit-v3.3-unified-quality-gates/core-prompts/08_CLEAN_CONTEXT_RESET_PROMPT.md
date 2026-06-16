# 08 — Clean Context Reset Prompt

Use this when an AI conversation gets messy or too long.

```md
We are creating a clean context checkpoint.

Do not write code.
Do not expand scope.

Summarize the current state into a checkpoint file format with:

1. current working components
2. broken components
3. known issues
4. current goal
5. constraints
6. important files
7. what not to do
8. next single action
9. clean context summary for a new AI session

The output should be suitable for:

ai/checkpoints/YYYY-MM-DD_checkpoint_name.md

Keep it concise and factual. Do not include unnecessary chat history.
```
