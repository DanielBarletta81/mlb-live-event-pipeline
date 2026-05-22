# Live Event Pipeline Simulator

## Overview
A small event-driven system that simulates live baseball event ingestion, processing, and WebSocket delivery to a React dashboard.

## Why I Built This
Built to explore real-time data flow, non-blocking processing, and fan-facing live update patterns relevant to sports media platforms.

## Architecture
Generator → Queue → Processor → Broadcaster → React Dashboard

## Tech Stack
Node.js, Express, WebSockets, React, Vite

## How to Run
cd server && npm install && npm run dev
cd client && npm install && npm run dev

## Engineering Notes
- WebSocket lifecycle handling
- Event queue abstraction
- Scoreboard state mutation through processor layer
- Latency tracking
- Health endpoint