# Git Scripts

This project contains a set of scripts to interact with GitHub's API, primarily focused on creating issues in a specific repository.

## Project Overview

The Git Scripts project is designed to automate the process of creating multiple issues in a GitHub repository. It uses the GitHub GraphQL API to perform various operations such as creating issues, fetching label IDs, and retrieving milestone information.

## Features

- Create multiple issues in a GitHub repository
- Fetch label IDs for issue labeling
- Retrieve milestone information
- Use of GitHub's GraphQL API for efficient data fetching and mutation

## Prerequisites

- Node.js (version specified in package.json)
- npm (comes with Node.js)
- A GitHub Personal Access Token with appropriate permissions

## Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the root directory and add your GitHub token:
   ```
   GITHUB_TOKEN=your_github_token_here
   ```

## Configuration

The main configuration is done in the `src/create-issues.ts` file. You can modify the following constants:

