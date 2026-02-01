---
name: Release checklist
about: Checklist for preparing and publishing a release (repo + optional components)
title: "Release: vX.Y.Z"
labels: ["release"]
assignees: []
---

# Release checklist

## 1) Scope & intent
- [ ] Release version decided: `vX.Y.Z`
- [ ] Release type:
  - [ ] Snapshot/Alpha (no promotion required)
  - [ ] Promotion release (dev → test → staging → live)
- [ ] Target environment(s): dev / test / staging / live
- [ ] Breaking changes? (MAJOR bump)
  - [ ] No
  - [ ] Yes → documented clearly

## 2) Git hygiene
- [ ] Working on correct branch:
  - [ ] `release/vX.Y.Z` (recommended) OR
  - [ ] `main` (only for very small releases)
- [ ] Branch is up to date with `main`
- [ ] No leftover debug code / temporary toggles
- [ ] No TODOs that affect runtime behavior

## 3) Documentation checks
- [ ] `CHANGELOG.md` updated for `vX.Y.Z`
- [ ] Standards changes (if any) reviewed:
  - [ ] `docs/00-standards/*`
- [ ] Project documentation updated (if applicable):
  - [ ] `docs/10-project/*`

## 4) Component versioning (only if repository contains independent components)
- [ ] Component versions/build headers updated where relevant
- [ ] `docs/10-project/component-manifest.md` updated
- [ ] Manifest matches what will be deployed (versions + builds)
- [ ] Any component version bumps reflected in `CHANGELOG.md`

## 5) Testing & validation
- [ ] Dev smoke test done
- [ ] Test environment validated (if used)
- [ ] Staging validated (if used)
- [ ] Regression risk areas validated (noted below)

### Notes (what was tested / what risks remain)
- Tested:
  - ...
- Known risks:
  - ...

## 6) Tagging & release publish
- [ ] Annotated git tag created: `vX.Y.Z`
- [ ] Tag pushed to origin
- [ ] GitHub Release created with:
  - [ ] Summary
  - [ ] Changelog highlights
  - [ ] Known issues / notes

## 7) Post-release
- [ ] Release branch merged back to `main` (if used)
- [ ] Release branch deleted (optional)
- [ ] Next work continues from `main`
