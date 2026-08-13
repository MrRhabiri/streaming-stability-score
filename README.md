# Streaming Stability Score (SSS) v1.0

Streaming Stability Score (SSS) is an open, experimental specification for estimating how suitable a network connection is for stable video streaming.

The score ranges from **0 to 100** and combines four measurable factors:

- available bandwidth headroom
- latency
- jitter
- packet loss

SSS is intended for educational and troubleshooting use. It is **not** an industry standard and should not be treated as a guarantee of streaming quality.

## Files

- `SPECIFICATION.md` — the complete SSS v1.0 specification
- `sss-v1.schema.json` — JSON Schema for SSS input/output data
- `examples.json` — example measurements and scores
- `reference.js` — a small reference implementation

## Version

Current specification: **SSS v1.0**

## Publisher

Published as an open experimental specification by [IPTV Abonnement Maroc](https://iptvabonnementmaroc.com/).

## License

The specification text and reference implementation may be reused with attribution.
