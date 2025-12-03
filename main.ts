import { exitLobbyToTeyvat } from "./src/modules/lobby";
import { execDailyTask } from "./src/workflows/daily";
import { execWeeklyTask } from "./src/workflows/weekly";

(async function () {
  //! 初始化游戏环境
  setGameMetrics(1920, 1080, 1.5);
  await genshin.returnMainUi();

  //! 执行每周任务
  await execWeeklyTask();

  //! 执行每日任务
  await execDailyTask();

  //! 返回提瓦特大陆
  await exitLobbyToTeyvat();
})();
