import {
  ProgressTracker,
  getErrorMessage,
  getNextMonday4AM,
  isHostException,
  useStoreWithDefaults
} from "@bettergi/utils";
import { userConfig } from "./src/config";
import { exitLobbyToTeyvat } from "./src/lobby";
import { enterRoom, leaveRoom } from "./src/room";
import { deleteStageSave } from "./src/save";
import { ensurePlaybackFilesExist, exitStage, playStage } from "./src/stage";

(async function () {
  //! 初始化游戏环境
  setGameMetrics(1920, 1080, 1.5);
  await genshin.returnMainUi();

  //! 确保通关回放文件存在
  ensurePlaybackFilesExist();

  //! 初始化数据存储
  const store = useStoreWithDefaults("data", {
    weekly: { expGained: 0, attempts: 0 },
    nextWeek: getNextMonday4AM().getTime()
  });

  //! 新的一周开始，重置经验值数据
  if (Date.now() >= store.nextWeek) {
    store.weekly = { expGained: 0, attempts: 0 };
    store.nextWeek = getNextMonday4AM().getTime();
  }

  //! 检查本周经验值是否已达上限
  if (store.weekly.expGained >= userConfig.expWeeklyLimit) {
    if (userConfig.force) {
      log.warn("本周获取经验值已达上限，强制执行");
    } else {
      log.warn("本周获取经验值已达上限，跳过执行");
      return;
    }
  }

  //! 计算本次本周剩余可获取经验值
  let expRemaining = userConfig.expWeeklyLimit - store.weekly.expGained;
  expRemaining = expRemaining > 0 ? expRemaining : userConfig.expWeeklyLimit;
  //! 计算需要进行的尝试次数
  let attempts = Math.ceil(expRemaining / userConfig.expPerAttempt);
  attempts = userConfig.thisAttempts > 0 ? userConfig.thisAttempts : attempts;

  //! 离开当前所在房间（如果存在）
  await leaveRoom();

  //! 创建进度追踪器
  const tracker = new ProgressTracker(attempts);
  //! 迭代尝试
  try {
    for (let i = 0; i < attempts; i++) {
      tracker.print(`开始本周第 ${store.weekly.attempts + 1} 次奇域挑战...`);

      //! 删除关卡存档
      await deleteStageSave();

      //! 进入房间
      await enterRoom(userConfig.room);

      //! 游玩关卡
      await playStage();

      //! 关卡结束，更新数据存储
      store.weekly.attempts += 1;
      store.weekly.expGained += userConfig.expPerAttempt;
      tracker.tick({ increment: 1 });

      //! 本周已获取经验值达到上限，跳出循环
      if (store.weekly.expGained >= userConfig.expWeeklyLimit) {
        if (!userConfig.force) {
          log.warn("本周已获取经验值达到上限，停止执行");
          break;
        }
      }
    }
  } catch (err: any) {
    //! 发生主机异常（如：任务取消异常等），无法再继续执行
    if (isHostException(err)) throw err;
    //! 发生脚本流程异常，尝试退出关卡（如果在关卡中）
    await exitStage();
    log.error("脚本执行出错: {error}", getErrorMessage(err));
  }

  //! 返回提瓦特大陆
  await exitLobbyToTeyvat();
})();
