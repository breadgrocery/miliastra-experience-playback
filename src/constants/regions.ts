import {
  findImageWithinBounds,
  findTextWithinBounds,
  findTextWithinListView
} from "@bettergi/utils";

//! 通用：查找确认按钮
export const findConfirmBtn = () => {
  const txt = findTextWithinBounds("确认", 480, 720, 960, 145);
  txt?.drawSelf("group_text");
  return txt;
};
//! 通用：查找标题文字
export const findHeaderTitle = (title: string, contains?: boolean) => {
  const txt = findTextWithinBounds(title, 0, 0, 300, 95, { contains });
  txt?.drawSelf("group_text");
  return txt;
};
//! 通用：查找底部按钮文字
export const findBottomBtnText = (text: string, contains?: boolean) => {
  const txt = findTextWithinBounds(text, 0, 980, 1920, 100, { contains });
  txt?.drawSelf("group_text");
  return txt;
};
//! 通用：查找关闭对话框按钮
export const findCloseDialog = () => {
  const img = "assets/UI_BtnIcon_Close.png";
  const iro = findImageWithinBounds(img, 410, 160, 1100, 660, { useMask: true, threshold: 0.8 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 通用：点击空白处区域继续位置
export const clickToContinue = () => {
  click(900, 1050);
};

//! 查找UID文本
export const findUidText = () => {
  return findTextWithinBounds("UID", 1620, 1050, 300, 30, { contains: true });
};
//! 查找派蒙图标（判断处于奇域大世界/大厅）
export const findPaimon = () => {
  const img = "assets/UI_Icon_Paimon.png";
  const iro = findImageWithinBounds(img, 0, 0, 100, 100, { useMask: true, threshold: 0.8 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 查找元素视野按钮（判断处于大世界）
export const findElementViewBtn = () => {
  const img = "assets/UI_BtnIcon_ElementView.png";
  const iro = findImageWithinBounds(img, 0, 0, 500, 80, { useMask: true, threshold: 0.8 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 查找奇域大厅按钮（判断处于奇域大厅）
export const findBeyondHallBtn = () => {
  const img = "assets/UI_BtnIcon_Beyond_Hall.png";
  const iro = findImageWithinBounds(img, 200, 0, 150, 100, { useMask: true, threshold: 0.75 });
  iro?.drawSelf("group_img");
  return iro;
};

//! 房间：查找搜索奇域按钮
export const findAllWonderlandsBtn = () => {
  return findTextWithinBounds("搜索", 1320, 0, 600, 95, { contains: true });
};
//! 房间：查找奇域搜索输入框
export const findSearchWonderlandInput = () => {
  return findTextWithinBounds("搜索", 0, 120, 1920, 60, { contains: true });
};
//! 房间：查找奇域搜索输入框清除按钮
export const findClearInputBtn = () => {
  return findTextWithinBounds("清除", 0, 120, 1920, 60);
};
//! 房间：查找搜索奇域按钮
export const findSearchWonderlandBtn = () => {
  return findTextWithinBounds("搜索", 0, 120, 1920, 60, { contains: true });
};
//! 房间：查找搜索过于频繁提示
export const findSearchWonderlandThrottleMsg = () => {
  return findTextWithinBounds("过于频繁", 0, 0, 1920, 300, { contains: true });
};
//! 房间：查找第一个奇域搜索结果名称
export const findFirstSearchResultText = () => {
  const ir = captureGameRegion();
  const ro = RecognitionObject.ocr(240, 390, 300, 50);
  return (() => {
    const list = ir.findMulti(ro);
    for (let i = 0; i < list.count; i++) {
      if (list[i] && list[i].isExist()) {
        return list[i].text;
      }
    }
  })();
};
//! 房间：点击选择第一个搜索结果位置
export const clickToChooseFirstSearchResult = () => {
  click(330, 365);
};
//! 房间：查找进入房间快捷键按钮
export const findEnterRoomShortcut = () => {
  return findTextWithinBounds("房间", 1580, 110, 320, 390, { contains: true });
};
//! 房间：查找退出房间按钮
export const findLeaveRoomBtn = () => {
  const img = "assets/UI_Icon_Leave_Right.png";
  const iro = findImageWithinBounds(img, 1570, 0, 350, 100, { threshold: 0.8 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 房间：查找跳转大厅按钮
export const findGoToLobbyBtn = () => {
  return findTextWithinBounds("大厅", 880, 840, 1040, 110, {
    contains: true
  });
};
//! 房间：查找创建房间按钮
export const findCreateRoomBtn = () => {
  return findTextWithinBounds("房间", 960, 140, 960, 70, { contains: true });
};
//! 房间：点击加入准备区位置
export const clickToPrepare = () => {
  click(770, 275);
};
//! 房间：查找加入准备区提示
export const findPrepareMsg = () => {
  return findTextWithinBounds("加入准备", 576, 432, 768, 216, {
    contains: true
  });
};

//! 存档：查找奇域收藏
export const findBeyondFavoritesBtn = () => {
  return findTextWithinBounds("收藏", 0, 880, 200, 200, {
    contains: true
  });
};
//! 存档：查找管理关卡按钮
export const findManageStagesBtn = () => {
  return findTextWithinBounds("管理", 1320, 0, 600, 95, { contains: true });
};
//! 存档：查找编辑关卡存档按钮
export const findEditStageSaveBtn = () => {
  return findTextWithinBounds("管理", 1220, 980, 700, 100);
};
//! 存档：查找要删除的存档位置
export const findSaveToDeletePos = (keyword: string) =>
  findTextWithinListView(
    keyword,
    {
      x: 210,
      y: 250,
      w: 1650,
      h: 710,
      scrollLines: 7,
      lineHeight: 95
    },
    { contains: true }
  );
//! 存档：查找局外存档列头
export const findExternalSaveColumnPos = () => {
  return findTextWithinBounds("局外", 55, 190, 1810, 50, { contains: true });
};
//! 存档：查找删除局外存档复选框已选中状态
export const findDeleteExternalSaveChecked = (colPos: number) => {
  const img = "assets/Checkbox_Checked.png";
  const iro = findImageWithinBounds(img, colPos, 250, 290, 710, {
    threshold: 0.75,
    use3Channels: true
  });
  iro?.drawSelf("group_img");
  return iro;
};
//! 存档：查找删除关卡存档按钮
export const findDeleteStageSaveBtn = () => {
  return findTextWithinBounds("删除所选", 1220, 980, 700, 100);
};

//! 关卡：查找关卡退出按钮
export const findStageEscBtn = () => {
  const img = "assets/UI_Icon_Leave.png";
  const iro = findImageWithinBounds(img, 0, 0, 100, 100, { useMask: true, threshold: 0.8 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 关卡：查找中断挑战按钮
export const findExitStageBtn = () => {
  return findTextWithinBounds("中断挑战", 576, 324, 768, 432);
};
//! 关卡：查找奇域等级提升页面
export const findSkipLevelUpMsg = () => {
  return findTextWithinBounds("空白处", 610, 950, 700, 60, { contains: true });
};

//! 退出：查找返回提瓦特按钮
export const findGotTeyvatBtn = () => {
  return findTextWithinBounds("返回", 1500, 0, 300, 95, { contains: true });
};

//! 纪游：查找诸界纪游按钮
export const findBeyondBattlepassBtn = () => {
  const img = "assets/UI_BtnIcon_Beyond_Battlepass.png";
  const iro = findImageWithinBounds(img, 960, 0, 960, 80, { useMask: true, threshold: 0.75 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 纪游：查找纪游开屏动画
export const findBeyondBattlepassPopup = () => {
  return findTextWithinBounds("奖励一览", 0, 0, 960, 1080, { contains: true });
};
//! 纪游：查找领取奖励按钮
export const findFetchRewardBtn = () => {
  const img = "assets/UI_Img_UGCCultivateReward_FetchHint.png";
  const iro = findImageWithinBounds(img, 1550, 100, 370, 880, {
    useMask: true,
    use3Channels: true,
    threshold: 0.8
  });
  iro?.drawSelf("group_img");
  return iro;
};
