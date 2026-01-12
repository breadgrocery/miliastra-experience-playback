import { assertRegionAppearing, assertRegionDisappearing } from "@bettergi/utils";
import {
  clickToContinue,
  findBeyondBattlepassBtn,
  findBeyondBattlepassPopup,
  findBottomBtnText,
  findFetchRewardBtn,
  findHeaderTitle
} from "../constants/region";
import { isInLobby } from "./lobby";

//! 领取诸界纪游经验
export const fetchBattlepassExp = async () => {
  //! 确保处于大厅内
  if (!isInLobby()) {
    log.warn("不在奇域大厅内，跳过领取诸界纪游经验");
    return;
  }

  if (!findBeyondBattlepassBtn()) {
    log.warn("诸界纪游已结束，跳过领取诸界纪游经验");
    return;
  }

  //! 打开诸界纪游界面
  await assertRegionAppearing(
    () => findHeaderTitle("纪游", true),
    "打开诸界纪游界面超时",
    () => {
      keyPress("VK_F4");

      //! 关闭纪游开屏动画（如果弹出）
      if (findBeyondBattlepassPopup()) {
        keyPress("VK_ESCAPE");
      }
    },
    { maxAttempts: 5, retryInterval: 2000 }
  );

  //! 跳转到任务界面
  await assertRegionAppearing(
    () => findHeaderTitle("任务", true),
    "打开诸界纪游任务界面超时",
    () => {
      keyPress("VK_E");
    },
    { maxAttempts: 5, retryInterval: 2000 }
  );

  //! 点击一键领取
  await assertRegionDisappearing(
    () => findBottomBtnText("领取", true),
    "领取诸界纪游经验超时",
    async () => {
      //! 重复确认，防止误领纪游奖励（部件礼箱会卡流程）而不是经验
      if (findHeaderTitle("任务", true)) {
        findBottomBtnText("领取", true)?.click();
        clickToContinue();
        await sleep(1000);
        clickToContinue();
      }
    },
    { maxAttempts: 5, retryInterval: 3000 }
  );

  await genshin.returnMainUi();
};

//! 领取日活奖励
export const fetchCultivateReward = async () => {
  //! 确保处于大厅内
  if (!isInLobby()) {
    log.warn("不在奇域大厅内，跳过领取日活奖励");
    return;
  }

  //! 打开奇趣盛邀
  await assertRegionAppearing(
    () => findHeaderTitle("盛邀", true),
    "打开奇趣盛邀超时，活动可能已结束",
    async () => {
      keyPress("VK_F1");
      await sleep(2000);
      if (findHeaderTitle("盛邀", true) === undefined) {
        keyPress("VK_Q");
      }
    },
    { maxAttempts: 5, retryInterval: 1000 }
  );

  //! 仅领取妙思觅索奖励（巧趣醒转奖励里有部件礼箱会卡流程）
  await assertRegionDisappearing(
    findFetchRewardBtn,
    "领取妙思觅索奖励超时",
    async () => {
      const reward = findFetchRewardBtn();
      if (reward) {
        reward.click();
        clickToContinue();
        await sleep(1000);
        clickToContinue();
      }
    },
    { maxAttempts: 5, retryInterval: 2000 }
  );

  await genshin.returnMainUi();
};
