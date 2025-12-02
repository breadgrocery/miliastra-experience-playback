export const userConfig = {
  room: settings.room || "20134075027",
  playbacks: (settings.playbacks || "通关回放1.json,通关回放2.json")
    .replace(/，/g, ",")
    .split(",")
    .map(str => str.trim())
    .filter(Boolean),
  expPerAttempt: Math.max(1, Number(settings.expPerAttempt || "20")),
  deleteStageSave: settings.deleteStageSave ?? false,
  deleteStageSaveKeyword: settings.deleteStageSaveKeyword || "深渊100层",
  expWeeklyLimit: Math.max(1, Number(settings.expWeeklyLimit || "4000")),
  force: settings.force ?? false,
  thisAttempts: Math.max(0, Number(settings.thisAttempts || "0")),
  goToTeyvat: settings.goToTeyvat ?? true
};
