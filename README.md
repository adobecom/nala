# Janus

Automate E2E testing of Milo-based projects.

## Get started
```bash
npm install
```

## Basic use

### Test everything
```bash
npm test
```

### Test a Milo branch
You may want to test a Milo branch. This could be for either milo, consumers or both. This is done by setting an environment variable before you run your tests.

```bash
export MILO_LIBS=your-branch-name
```

## Advanced use
### Test only consumers
```bash
npm test -- -g @consumer
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
npm test -- -g @large-button -g @medium-button
```
