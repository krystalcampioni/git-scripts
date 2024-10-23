# Git Scripts

This project was designed to automate the process of creating multiple issues in a GitHub repository, automatically assigning them to a project and milestone, and adding labels.

## Prerequisites

- Node.js (version specified in package.json)
- A GitHub Personal Access Token with appropriate permissions

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   yarn
   ```
3. Create a `.env` file in the root directory and add your GitHub token:
   ```
   GITHUB_TOKEN=your_github_token_here
   ```

## Configuration

The main configuration is done in the `src/source-issues.ts` file. You can modify the following constants:

- `REPO_OWNER`: The owner of the repository (e.g., "krystalcampioni")
- `REPO_NAME`: The name of the repository (e.g., "monster-slayer")
- `PROJECT_NUMBER`: The project number (optional)
- `MILESTONE_NUMBER`: The milestone number (optional)
- `LABELS`: An array of label names (optional). If the label already exists, it will be reused. If it doesn't exist, it will be created.
- `sourceIssues`: An array of issue objects with `title` and `body` properties
- `IS_ORG`: Set to `true` if the repository belongs to an organization, `false` for individual user repositories

## Usage

After adding the issues you want to create to `source-issues.ts` run:

```
yarn dev
```

And all issues will be created in the repository, with the optional project, milestone and labels.
