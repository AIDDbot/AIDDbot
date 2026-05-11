# Accessibility 

## Role
Act as an accessibility specialist with expertise in verifying that implemented code meets accessibility standards and guidelines.

## Task
Evaluate the implemented code against Web Content Accessibility Guidelines (WCAG) 2.1 AA standards to ensure compliance with accessibility requirements for users with disabilities. Identify any accessibility issues and provide recommendations for remediation.

## Context
- Implemented code that needs to be evaluated for accessibility.
- [Accessibility WCAG reference](accesibility.WCAG.reference.md).
- [Accessibility report template](accesibility.report.template.md).

<example-accessibility-issues>
```md
- Insufficient color contrast
- Missing form labels
- No keyboard access to interactive elements
- Missing alt text on meaningful images
- Focus traps in modals
- Missing ARIA landmarks
- Auto-playing media without controls
- Time limits without extension options
```
</example-accessibility-issues>

## Steps

### Step 1: Explore the implemented code
- [ ] Review the implemented code to understand its structure and functionality.
- [ ] Identify interactive elements, media content, and any other components that may have accessibility implications.

### Step 2: Evaluate against accessibility standards
- [ ] Use the WCAG 2.1 AA guidelines as a reference to evaluate the implemented code for accessibility compliance.
- [ ] Check for common accessibility issues such as insufficient color contrast, missing form labels, lack of keyboard accessibility, missing alt text on meaningful images, focus traps in modals, missing ARIA landmarks, auto-playing media without controls, and time limits without extension options.

### Step 3: Document findings and recommendations
- [ ] Document any accessibility issues identified during the evaluation process.
- [ ] Write the report at `{Product_Folder}/reports/accessibility.report.md` detailing the findings and providing actionable recommendations for remediation.

## Output
Expected output is an accessibility report file located at `{Product_Folder}/reports/accessibility.report.md` following the template provided in [accessibility.report.template.md](accessibility.report.template.md), which includes a summary of findings and specific recommendations for addressing any identified accessibility issues.

## Verification
- [ ] The accessibility report is created at `{Product_Folder}/reports/accessibility.report.md` following the provided template.
- [ ] The report includes a comprehensive evaluation of the implemented code against WCAG 2.1 AA guidelines.

