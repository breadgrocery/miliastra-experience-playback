import { assertRegionAppearing, assertRegionDisappearing, waitForAction } from "@bettergi/utils";
import { userConfig } from "./config";
import { isInLobby } from "./lobby";
import {
  clickToPrepare,
  findBottomBtnText,
  findCloseDialog,
  findExitStageBtn,
  findPrepareMsg,
  findSkipLevelUpMsg,
  findStageEscBtn
} from "./regions";

//! 确保通关回放文件存在
export const ensurePlaybackFilesExist = () => {
  const playbackFiles = [...file.readPathSync("assets/playbacks")].map(path =>
    path.replace(/\\/g, "/")
  );
  const list = userConfig.playbacks
    .map(p => `assets/playbacks/${p}`)
    .filter(p => playbackFiles.includes(p));
  if (list.length === 0) {
    throw new Error("未找到任何通关回放文件，请确保已录制回放并拷贝到 assets/playbacks 目录下");
  }
};

export const playStage = async () => {
  //! 等待进入关卡
  await assertRegionAppearing(
    findStageEscBtn,
    "等待进入关卡超时",
    async () => {
      findBottomBtnText("开始游戏")?.click();
      findBottomBtnText("准备", true)?.click();

      //! 判断是否已经加入准备区
      if (findPrepareMsg()) {
        log.info("加入准备区...");
        await assertRegionDisappearing(findPrepareMsg, "等待加入准备区提示消失超时");
        clickToPrepare();
      }
    },
    { maxAttempts: 60 }
  );

  //! 关闭游戏说明对话框
  await assertRegionDisappearing(
    findCloseDialog,
    "关闭游戏说明对话框超时",
    () => {
      findCloseDialog()?.click();
    },
    { maxAttempts: 10, retryInterval: 500 }
  );

  //! 执行随机通关回放文件
  await execStagePlayback();
  await sleep(3000);

  //! 退出关卡返回大厅
  await exitStageToLobby();
};

//! 执行通关回放文件（随机抽取）
export const execStagePlayback = async () => {
  const { playbacks } = userConfig;
  const playback = playbacks[Math.floor(Math.random() * playbacks.length)];
  const file = `assets/playbacks/${playback}`;
  log.info("执行通关回放文件: {file}", file);
  await keyMouseScript.runFile(file);
};

//! 退出关卡
export const exitStage = async () => {
  if (findStageEscBtn() === undefined) return;

  log.warn("关卡超时，尝试退出关卡...");
  await assertRegionAppearing(
    findExitStageBtn,
    "等待中断挑战按钮出现超时",
    () => {
      keyPress("VK_ESCAPE");
    },
    { maxAttempts: 5, retryInterval: 2000 }
  );
  findExitStageBtn()?.click();
  await genshin.returnMainUi();
};

//! 退出关卡返回大厅
export const exitStageToLobby = async () => {
  if (isInLobby()) {
    log.warn("已处于奇域大厅，跳过");
    return;
  }

  log.info("退出关卡返回大厅...");
  const done = await waitForAction(
    isInLobby,
    async () => {
      //! 跳过奇域等级提升页面（奇域等级每逢11、21、31、41级时出现加星页面）
      findSkipLevelUpMsg()?.click();

      //! 点击底部 “返回大厅” 按钮
      findBottomBtnText("大厅", true)?.click();
    },
    { maxAttempts: 60 }
  );
  if (!done) {
    await exitStage();
    throw new Error("退出关卡返回大厅超时");
  }
};
