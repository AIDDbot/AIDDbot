---
mode: 'agent'
description: 'Install latest AIDDbot for GitHub Copilot.'
tools: ['changes', 'editFiles', 'fetch', 'runCommands']
---

# Install latest AIDDbot for GitHub Copilot

Copy the `.github` directory from the [AIDDbot/AIDDbot repository](https://github.com/AIDDbot/AIDDbot) to the current repository.

## Goal

Have the latest `.github` directory structure as the AIDDbot source repository, which includes prompts, workflows, and configurations for GitHub Copilot.

## Context

- The source `.github` directory is at https://github.com/AIDDbot/AIDDbot/tree/main/.github
- The target `.github` directory is or will be at [/.github](/.github) folder of the current repository.

## Workflow

- [ ] **1. Navigate to your local repository**

First, ensure you are in the root directory of your local repository where you want the `.github` folder to be placed.

```bash
# Example:
cd /path/to/your/local/repo
```

- [ ] **2. Clone the source repository to a temporary location**

This command will create a local copy of the `AIDDbot/AIDDbot` repository in a new directory named `AIDDbot-temp`. This temporary clone is what we will use to grab the `.github` folder.

```bash
git clone -b main --single-branch https://github.com/AIDDbot/AIDDbot.git AIDDbot-temp
```

- [ ] **3. Copy the `.github` directory**

Now, use a file system command to copy the `.github` directory and its entire contents from the temporary clone into your current repository. The `-r` flag ensures that the copy is recursive, including all subdirectories and files. 

Tell the user that any existing files will be replaced but can be restored from git history if needed.

```bash
cp -r AIDDbot-temp/.github .
```

_Note: The `.` at the end of the command signifies your current directory (the root of your local repository)._

- [ ] **4. Clean up the temporary clone**

Finally, you can remove the temporary directory you created in step 2. This removes all the temporary files and the Git history you no longer need.

```bash
rm -rf AIDDbot-temp
```

- [ ] **5. Add and commit the new files**

The files have been copied to your local file system, but they are not yet part of your Git history. Use the following commands to stage and commit them.

```bash
git add .github
git commit -m "chore: Add/Update .github directory from AIDDbot repository"
```

You have now successfully copied the `.github` directory from the AIDDbot source repository and added it to your own local repository's history.

## Validation

- [ ] Use the #codebase tool to verify temporary [AIDDbot-temp](/AIDDbot-temp) folder is not left behind.
- [ ] Use the #codebase tool to ensure the [.github](/.github) directory exists and is correctly structured.
