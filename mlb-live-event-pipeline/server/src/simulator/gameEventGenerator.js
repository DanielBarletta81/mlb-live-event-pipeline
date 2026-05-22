const eventTypes = ["PITCH", "HIT", "STRIKEOUT", "WALK", "RUN", "INNING_CHANGE"];

export function generateGameEvent(state) {
  const type = eventTypes[Math.floor(Math.random() * eventTypes.length)];
  const team = state.top ? state.away.team : state.home.team;

  return {
    type,
    team,
    inning: state.inning,
    half: state.top ? "top" : "bottom",
    createdAt: Date.now(),
  };
}