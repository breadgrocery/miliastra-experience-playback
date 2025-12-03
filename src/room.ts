import { assertRegionAppearing, waitForAction } from "@bettergi/utils";
import { isInLobby } from "./lobby";
import {
  clickToChooseFirstSearchResult,
  findAllWonderlandsBtn,
  findBeyondHallBtn,
  findClearInputBtn,
  findConfirmBtn,
  findCreateRoomBtn,
  findEnterRoomShortcut,
  findFirstSearchResultText,
  findGoToLobbyBtn,
  findHeaderTitle,
  findLeaveRoomBtn,
  findSearchWonderlandBtn,
  findSearchWonderlandInput,
  findSearchWonderlandThrottleMsg
} from "./regions";

export const isInRoom = () => findHeaderTitle("房间", true) !== undefined;

//! 打开人气奇域
export const goToRecommendedWonderlands = async () => {
  log.info("打开人气奇域界面...");
  await assertRegionAppearing(
    () => findHeaderTitle("人气", true),
    "打开人气奇域界面超时",
    () => {
      keyPress("VK_F6");
    }
  );
};

//! 创建并进入奇域房间
export const createRoom = async (room: string) => {
  await goToRecommendedWonderlands();

  log.info("打开全部奇域界面...");
  await assertRegionAppearing(
    () => findHeaderTitle("搜索", true),
    "打开全部奇域界面超时",
    () => {
      findAllWonderlandsBtn()?.click();
    }
  );
  await sleep(1500);

  //! 记录搜索前的第一个奇域名称
  let iwnt: string | undefined;
  let wi = 0;
  while (iwnt === undefined) {
    if (wi > 20) break;
    iwnt = findFirstSearchResultText();
    await sleep(500);
    wi += 1;
  }
  if (iwnt === undefined) throw new Error("加载全部奇域列表超时");
  log.info("搜索前的第一个奇域名称: {iwnt}", iwnt);

  log.info("粘贴奇域关卡文本: {room}", room);
  await assertRegionAppearing(findClearInputBtn, "粘贴关卡文本超时", () => {
    const input = findSearchWonderlandInput();
    if (input) {
      input.click();
      inputText(room);
    }
  });

  //! 等待搜索结果变化
  let fswnt: string | undefined;
  log.info("搜索奇域关卡: {room}", room);
  await waitForAction(
    () => {
      if (fswnt === undefined) return false;
      //! 检测搜索过于频繁提示
      if (findSearchWonderlandThrottleMsg()) return true;
      //! 检测搜索结果是否变化
      return fswnt.toLocaleLowerCase().trim() !== iwnt.toLocaleLowerCase().trim();
    },
    async () => {
      findSearchWonderlandBtn()?.click();
      await sleep(1000);
      fswnt = findFirstSearchResultText();
    },
    { maxAttempts: 30, retryInterval: 200 }
  );

  log.info("打开奇域介绍...");
  await assertRegionAppearing(
    findCreateRoomBtn,
    "打开奇域介绍超时",
    () => {
      const goToLobbyButton = findGoToLobbyBtn();
      if (goToLobbyButton) {
        log.info("当前不在大厅，前往大厅...");
        goToLobbyButton.click();
      } else {
        log.info("选择第一个奇域关卡...");
        clickToChooseFirstSearchResult();
      }
    },
    { maxAttempts: 60 }
  );

  log.info("创建并进入房间...");
  await assertRegionAppearing(
    () => findHeaderTitle("房间", true),
    "创建并进入房间超时",
    () => {
      findCreateRoomBtn()?.click();
    },
    { maxAttempts: 60 }
  );
};

//! 进入奇域房间
export const enterRoom = async (room: string) => {
  const inLobby = isInLobby();
  if (inLobby) {
    const enterButton = findEnterRoomShortcut();
    if (enterButton) {
      log.info("当前已存在房间，进入房间...", room);
      await assertRegionAppearing(
        () => findHeaderTitle("房间", true),
        "进入房间超时",
        () => {
          keyPress("VK_P");
        }
      );
      return;
    }
  }
  log.info("当前不在房间内，创建房间...", room);
  await createRoom(room);
};

//! 离开房间
export const leaveRoom = async () => {
  //! 当前在大厅，且存在房间
  if ((isInLobby() && findEnterRoomShortcut() !== undefined) || isInRoom()) {
    log.info("当前存在房间，离开房间...");
    //! 先进入房间
    await assertRegionAppearing(
      () => findHeaderTitle("房间", true),
      "进入房间超时",
      () => {
        keyPress("VK_P");
      }
    );
    //! 离开房间
    await assertRegionAppearing(
      findBeyondHallBtn,
      "离开房间超时",
      async () => {
        findLeaveRoomBtn()?.click();
        await sleep(1000);
        findConfirmBtn()?.click();
      },
      { maxAttempts: 5 }
    );
  }
};
