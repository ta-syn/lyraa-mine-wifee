- [x] Verify that the copilot-instructions.md file in the .github directory is created.

- [x] Clarify Project Requirements

- [x] Scaffold the Project

- [x] Customize the Project
  - Develop a plan to modify the codebase according to user requirements.
  - Apply modifications using appropriate tools and user-provided references.

- [x] Install Required Extensions
  - Only install extensions mentioned by get_project_setup_info.

- [x] Compile the Project
  - Install any missing dependencies.
  - Run diagnostics and resolve any issues.

- [x] Create and Run Task
  - Use create_and_run_task to add a task based on package.json, README.md, and project structure.

- [ ] Launch the Project
  - Prompt the user for debug mode, launch only if confirmed.

- [x] Ensure Documentation is Complete
  - Verify README.md and this file exist and contain current project information.
  - Keep this file free of HTML comments.

## Execution Guidelines
PROGRESS TRACKING:
- Use available tools to manage the above todo list.
- After completing each step, mark it complete and add a summary.
- Read current todo list status before starting each new step.

COMMUNICATION RULES:
- Avoid verbose explanations or printing full command outputs.
- If a step is skipped, state that briefly (e.g. "No extensions needed").
- Do not explain project structure unless asked.
- Keep explanations concise and focused.

DEVELOPMENT RULES:
- Use "." as the working directory unless the user specifies otherwise.
- Avoid adding media or external links unless explicitly requested.
- Use placeholders only with a note that they should be replaced.
- Use VS Code API tool only for VS Code extension projects.
- Once the project is created, it is already opened in Visual Studio Code—do not suggest commands to open this project in Visual Studio again.
- If the project setup information has additional rules, follow them strictly.

FOLDER CREATION RULES:
- Always use the current directory as the project root.
- When running commands, use the "." argument to ensure that the current working directory is used.
- Do not create a new folder unless the user explicitly requests it besides a .vscode folder for a tasks.json file.
- If any scaffolding commands mention that the folder name is not correct, ask the user to create a new folder with the correct name and reopen it in VS Code.

EXTENSION INSTALLATION RULES:
- Only install extensions specified by the get_project_setup_info tool.

PROJECT CONTENT RULES:
- If the user has not specified project details, assume they want a "Hello World" project as a starting point.
- Avoid adding links of any type (URLs, files, folders, etc.) or integrations that are not explicitly required.
- Avoid generating images, videos, or other media files unless explicitly requested.
- If you need to use any media assets as placeholders, note that they should be replaced with the actual assets later.
- Ensure all generated components serve a clear purpose within the user's requested workflow.
- If a feature is assumed but not confirmed, prompt the user for clarification before including it.
- If working on a VS Code extension, use the VS Code API tool with a query to find relevant references and samples.

TASK COMPLETION RULES:
- Project is successfully scaffolded and compiled without errors.
- copilot-instructions.md exists in the project.
- README.md exists and is up to date.
- User is provided with clear instructions to debug/launch the project.

Before starting a new task in the above plan, update progress in the plan.

- Work through each checklist item systematically.
- Keep communication concise and focused.
- Follow development best practices.
