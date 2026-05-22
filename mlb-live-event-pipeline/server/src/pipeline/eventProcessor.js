import { nanoid } from "nanoid";

export function processEvent(event, state) {
  if (event.type === "RUN") {
    if (state.top) state.away.runs += 1;
    else state.home.runs += 1;
  }

  if (event.type === "STRIKEOUT") {
    state.outs += 1;
  }

  if (state.outs >= 3 || event.type === "INNING_CHANGE") {
    state.outs = 0;
    if (!state.top) state.inning += 1;
    state.top = !state.top;
  }

  const processedAt = Date.now();

  return {
    id: nanoid(),
    ...event,
    processedAt,
    latencyMs: processedAt - event.createdAt,
    scoreboard: {
      inning: state.inning,
      half: state.top ? "top" : "bottom",
      outs: state.outs,
      home: state.home,
      away: state.away,
    },
    description: describeEvent(event),
  };
}

function describeEvent(event) {
  return `${event.team}: ${event.type.toLowerCase().replace("_", " ")} in the ${event.half} of inning ${event.inning}.`;
}