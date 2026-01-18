import { assertRegionAppearing, waitForAction } from "@bettergi/utils";
import { userConfig } from "../constants/config";
import {
  findBeyondHallBtn,
  findConfirmBtn,
  findElementViewBtn,
  findGotTeyvatBtn,
  findHeaderTitle
} from "../constants/regions";

//! 判断是否处于奇域大厅
export const isInLobby = () => findBeyondHallBtn() !== undefined;

//! 判断是否处于提瓦特大陆
const isInTeyvat = () => findElementViewBtn() !== undefined;

//! 退出大厅返回提瓦特大陆
export const exitLobbyToTeyvat = async () => {
  if (!userConfig.goToTeyvat) return;

  if (isInTeyvat()) {
    log.warn("已处于提瓦特大陆，跳过");
    return;
  }

  log.info("打开当前大厅...");
  await assertRegionAppearing(
    () => findHeaderTitle("大厅", true),
    "打开当前大厅超时",
    () => {
      keyPress("VK_F2");
    },
    { maxAttempts: 10, retryInterval: 2000 }
  );

  log.info("返回提瓦特大陆...");
  const done = await waitForAction(
    isInTeyvat,
    () => {
      findGotTeyvatBtn()?.click();
      findConfirmBtn()?.click();
    },
    { maxAttempts: 120 }
  );
  if (!done) throw new Error("返回提瓦特大陆超时");
};
