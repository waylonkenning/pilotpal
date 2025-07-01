# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Workflow

Follow this exact workflow for all feature development:

1. **Update todo list** - Use TodoWrite to plan and track all tasks
2. **Create e2e tests** - Write end-to-end tests for the new feature before implementation
3. **Code the feature** - Implement the feature according to the tests
4. **Run e2e tests locally** - Verify tests pass before committing
5. **Git commit** - Commit changes with descriptive message
6. **Git push** - Push to remote repository
7. **Wait for Vercel deployment** - Allow deployment to complete
8. **Run e2e tests on deployed version** - Verify feature works in production
9. **Update README** - Document the new feature once fully tested and deployed

This workflow ensures quality, testing coverage, and proper documentation for all features.