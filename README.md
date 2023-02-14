# Nala

<img width="320" alt="nala" src="https://user-images.githubusercontent.com/1972095/196048696-62bd0f4a-adf9-455f-bf12-29e6cc7a6290.png">

Automated E2E and integration testing of Milo-based projects.

## Get started

### Install Nala
```bash
npm install
```

### Install Playwright's Browser Binaries
```bash
npx playwright install
```

## Basic use

### Test everything

```bash
npm test
```

### Test a Milo branch

You may want to test a Milo branch. This could be for either milo, consumers or both. This is done by setting an environment variable before you run your tests.

```bash
export branch=your-branch-name
```

## Advanced use

### Test only a specific consumer

```bash
npm test -- -g @bacom
```

### Test only milo

```bash
npm test -- -g @milo
```

### Test only a specific feature

```bash
npm test -- -g @large-button
```

### Test multiple features

```bash
npm test -- -g large-button|medium-button
```
