export const userConfig = {
  room: settings.room || "20134075027",
  playbacks: (settings.playbacks || "回放1.json,回放2.json")
    .replace(/，/g, ",")
    .split(",")
    .map(str => str.trim()),
  expPerAttempt: Math.max(1, Number(settings.expPerAttempt || "20")),
  deleteStageSave: settings.deleteStageSave ?? false,
  deleteStageSaveKeyword: settings.deleteStageSaveKeyword || "",
  stageTimeout: Math.max(5, Number(settings.stageTimeout || "120")),
  expWeeklyLimit: Math.max(1, Number(settings.expWeeklyLimit || "4000")),
  force: settings.force ?? false,
  thisAttempts: Math.max(0, Number(settings.thisAttempts || "0")),
  goToTeyvat: settings.goToTeyvat ?? true
};
