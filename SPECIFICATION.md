# Streaming Stability Score (SSS) v1.0 — Specification

## 1. Purpose

Streaming Stability Score (SSS) is an open experimental scoring method for estimating how suitable a network connection is for stable video streaming.

The result is an integer from **0 to 100**.

SSS is a heuristic. It does not replace real-world testing and does not guarantee the performance of any streaming service.

## 2. Inputs

SSS v1.0 uses five inputs:

1. `download_mbps` — measured download throughput in megabits per second.
2. `required_mbps` — estimated bitrate requirement for the selected stream.
3. `latency_ms` — round-trip latency in milliseconds.
4. `jitter_ms` — measured jitter in milliseconds.
5. `packet_loss_percent` — packet loss as a percentage.

All inputs must be zero or greater. `required_mbps` must be greater than zero.

## 3. Component Scores

Each component is normalized to a score from 0 to 100.

### 3.1 Bandwidth Headroom Score

Let:

`headroom = download_mbps / required_mbps`

Score:

- headroom >= 3.0 → 100
- headroom >= 2.0 → 90
- headroom >= 1.5 → 75
- headroom >= 1.25 → 60
- headroom >= 1.0 → 40
- headroom < 1.0 → 10

### 3.2 Latency Score

- latency <= 30 ms → 100
- latency <= 60 ms → 90
- latency <= 100 ms → 75
- latency <= 150 ms → 55
- latency <= 250 ms → 30
- latency > 250 ms → 10

### 3.3 Jitter Score

- jitter <= 5 ms → 100
- jitter <= 10 ms → 90
- jitter <= 20 ms → 75
- jitter <= 30 ms → 55
- jitter <= 50 ms → 30
- jitter > 50 ms → 10

### 3.4 Packet Loss Score

- loss <= 0.1% → 100
- loss <= 0.5% → 90
- loss <= 1.0% → 75
- loss <= 2.0% → 50
- loss <= 5.0% → 25
- loss > 5.0% → 5

## 4. Final Score

SSS v1.0 uses the following weights:

- Bandwidth headroom: 40%
- Latency: 20%
- Jitter: 20%
- Packet loss: 20%

Formula:

`SSS = round(0.40 × bandwidth_score + 0.20 × latency_score + 0.20 × jitter_score + 0.20 × packet_loss_score)`

Clamp the result to the range 0–100.

## 5. Interpretation

- 90–100: Excellent
- 75–89: Good
- 60–74: Moderate
- 40–59: Weak
- 0–39: Poor

These labels are descriptive only.

## 6. Example

Input:

- download: 100 Mbps
- required bitrate: 25 Mbps
- latency: 35 ms
- jitter: 7 ms
- packet loss: 0.2%

Component scores:

- bandwidth: 100
- latency: 90
- jitter: 90
- packet loss: 90

Final:

`SSS = round(40 + 18 + 18 + 18) = 94`

Interpretation: **Excellent**

## 7. Versioning

This document defines **SSS v1.0**.

Future revisions should increment the version number whenever thresholds, weights, required inputs, or interpretation bands change.

## 8. Status

SSS v1.0 is an **open experimental specification**, not a recognized industry standard. It is designed for reproducible educational and troubleshooting use.

## 9. Original Publisher

SSS v1.0 is published by **IPTV Abonnement Maroc**.

Source: https://iptvabonnementmaroc.com/
