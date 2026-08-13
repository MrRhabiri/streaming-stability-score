// Streaming Stability Score (SSS) v1.0 reference implementation.

function bandwidthScore(downloadMbps, requiredMbps) {
  const h = downloadMbps / requiredMbps;
  if (h >= 3.0) return 100;
  if (h >= 2.0) return 90;
  if (h >= 1.5) return 75;
  if (h >= 1.25) return 60;
  if (h >= 1.0) return 40;
  return 10;
}

function latencyScore(ms) {
  if (ms <= 30) return 100;
  if (ms <= 60) return 90;
  if (ms <= 100) return 75;
  if (ms <= 150) return 55;
  if (ms <= 250) return 30;
  return 10;
}

function jitterScore(ms) {
  if (ms <= 5) return 100;
  if (ms <= 10) return 90;
  if (ms <= 20) return 75;
  if (ms <= 30) return 55;
  if (ms <= 50) return 30;
  return 10;
}

function packetLossScore(percent) {
  if (percent <= 0.1) return 100;
  if (percent <= 0.5) return 90;
  if (percent <= 1.0) return 75;
  if (percent <= 2.0) return 50;
  if (percent <= 5.0) return 25;
  return 5;
}

function rating(score) {
  if (score >= 90) return "Excellent";
  if (score >= 75) return "Good";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Weak";
  return "Poor";
}

function calculateSSS(input) {
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        0.40 * bandwidthScore(input.download_mbps, input.required_mbps) +
        0.20 * latencyScore(input.latency_ms) +
        0.20 * jitterScore(input.jitter_ms) +
        0.20 * packetLossScore(input.packet_loss_percent)
      )
    )
  );

  return { version: "1.0", input, score, rating: rating(score) };
}

// CommonJS export when available.
if (typeof module !== "undefined") {
  module.exports = { calculateSSS };
}
