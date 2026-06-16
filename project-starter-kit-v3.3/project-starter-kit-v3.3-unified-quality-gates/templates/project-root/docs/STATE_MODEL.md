# State Model

Use this file when the project has meaningful state transitions.

---

## Current State Model Status

```text
Not defined yet
```

---

## States

| State | Meaning |
|---|---|
| planned | Work is identified but not started |
| active | Work is in progress |
| blocked | Work cannot continue |
| verified | Work passed checks |
| released | Work is shipped |

---

## Transitions

```text
planned → active → verified → released
```

Blocked path:

```text
active → blocked → active
```

---

## Failure States

- [ ] [Failure state]
- [ ] [Failure state]
