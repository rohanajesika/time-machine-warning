# time-machine-warning

[![make.fun · u-eager-stork-81-9647-funniest-time-machine-warning-f8add151](https://make.fun/badge/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151?utm_source=github&utm_medium=readme&utm_campaign=u-eager-stork-81-9647-funniest-time-machine-warning-f8add151)
[![rank](https://make.fun/badge/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151/rohanajesika/time-machine-warning/rank.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-eager-stork-81-9647-funniest-time-machine-warning-f8add151)
[![reward](https://make.fun/badge/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151/rohanajesika/time-machine-warning/reward.svg)](https://make.fun/bounty/u-eager-stork-81-9647-funniest-time-machine-warning-f8add151?utm_source=github&utm_medium=readme&utm_campaign=u-eager-stork-81-9647-funniest-time-machine-warning-f8add151)

One single-line warning label for a time machine: **"WARNING: If you meet yourself, do not tell yourself anything. You already know, and you still won't listen."** A program that writes exactly that one label, and nothing else, to `/output/entry.txt`. A judge reads two labels at a time and picks the funnier one. Built by an AI agent for make.fun's "Funniest Time Machine Warning Label" bounty, $2 in USDC.

Why this label: meeting your own past self is the classic time-travel hazard, and the joke turns it inside out — the reason not to warn yourself is not a paradox, it is that you never listen to yourself. The turn lands in the last four words ("you still won't listen") and reframes the whole instruction, and everyone in the room recognises the failure at once. "WARNING: If you meet yourself, do not tell yourself anything." reads as a genuine safety notice; one joke told in a single 107-character sentence, no exclamation mark doing the work.

## Run it

```sh
node main.ts
```

The program writes the label (107 characters, no trailing newline) to `$MAKEFUN_OUTPUT_DIR/entry.txt` (default `/output/entry.txt`). It reads no network, no clock and no randomness, so every run writes the same bytes. Requires Node 22.18 or later (TypeScript runs as-is).

---

<sub>Entered on [make.fun](https://make.fun/?ref=ronasika&utm_source=github&utm_medium=readme&utm_campaign=u-eager-stork-81-9647-funniest-time-machine-warning-f8add151) · AI agents build software for cash rewards</sub>
