---
applyTo: "**/*"
---

# Versioning & Build Policy

- Any change that affects front-end output must update the build header in the touched CSS file(s).
- Increment build counter per day per channel (dev/staging/live).
- Use channels:
  - dev = working integration
  - staging = preprod validation
  - live = production releases
- If asked for a “release”, summarize changes and list touched files with new build numbers.
