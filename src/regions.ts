import {
  findImageWithinBounds,
  findTextWithinBounds,
  findTextWithinListView
} from "@bettergi/utils";

//! 查找确认按钮
export const findConfirmBtn = () => {
  return findTextWithinBounds("确认", 480, 720, 960, 145);
};
//! 查找标题文字
export const findHeaderTitle = (title: string, contains?: boolean) => {
  return findTextWithinBounds(title, 0, 0, 300, 95, { contains });
};
//! 查找底部按钮文字
export const findBottomBtnText = (text: string, contains?: boolean) => {
  return findTextWithinBounds(text, 960, 980, 960, 100, { contains });
};
//! 查找关闭对话框按钮
export const findCloseDialog = () => {
  const img = "assets/UI_BtnIcon_Close.png";
  const iro = findImageWithinBounds(img, 480, 216, 960, 648, {
    threshold: 0.85
  });
  iro?.drawSelf("group_img");
  return iro;
};

//! 查找抽卡按钮（判断处于大世界条件一）
export const findGachaBtn = () => {
  const img = "assets/UI_BtnIcon_Gacha.png";
  const iro = findImageWithinBounds(img, 960, 0, 960, 80, { threshold: 0.85 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 查找推荐奇域按钮（判断处于大世界条件二）
export const findBeyondRecommendBtn = () => {
  const img = "assets/UI_BtnIcon_Beyond_Recommend.png";
  const iro = findImageWithinBounds(img, 960, 0, 960, 80, { threshold: 0.85 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 查找奇域大厅按钮（判断处于奇域大厅）
export const findBeyondHallBtn = () => {
  const img = "assets/UI_BtnIcon_Beyond_Hall.png";
  const iro = findImageWithinBounds(img, 200, 0, 150, 100, { threshold: 0.85 });
  iro?.drawSelf("group_img");
  return iro;
};

//! 查找搜索奇域按钮
export const findAllWonderlandsBtn = () => {
  return findTextWithinBounds("搜索", 1320, 0, 600, 95, { contains: true });
};
//! 查找奇域搜索输入框
export const findSearchWonderlandInput = () => {
  return findTextWithinBounds("搜索", 0, 120, 1920, 60, { contains: true });
};
//! 查找奇域搜索输入框清除按钮
export const findClearInputBtn = () => {
  return findTextWithinBounds("清除", 0, 120, 1920, 60);
};
//! 查找搜索奇域按钮
export const findSearchWonderlandBtn = () => {
  return findTextWithinBounds("搜索", 0, 120, 1920, 60, { contains: true });
};
//! 查找搜索过于频繁提示
export const findSearchWonderlandThrottleMsg = () => {
  return findTextWithinBounds("过于频繁", 0, 0, 1920, 300, { contains: true });
};
//! 查找第一个奇域搜索结果名称
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
//! 点击选择第一个搜索结果位置
export const clickToChooseFirstSearchResult = () => {
  click(355, 365);
};

//! 查找进入房间快捷键按钮
export const findEnterRoomShortcut = () => {
  return findTextWithinBounds("房间", 1580, 110, 320, 390, { contains: true });
};
//! 查找退出房间按钮
export const findLeaveRoomBtn = () => {
  const img = "assets/UI_Icon_Leave_Right.png";
  const iro = findImageWithinBounds(img, 1570, 0, 350, 100);
  iro?.drawSelf("group_img");
  return iro;
};
//! 查找跳转大厅按钮
export const findGoToLobbyBtn = () => {
  return findTextWithinBounds("大厅", 880, 840, 1040, 110, {
    contains: true
  });
};
//! 查找创建房间按钮
export const findCreateRoomBtn = () => {
  return findTextWithinBounds("房间", 960, 140, 960, 70, { contains: true });
};
//! 点击加入准备区位置
export const clickToPrepare = () => {
  click(770, 275);
};
//! 查找加入准备区提示
export const findPrepareMsg = () => {
  return findTextWithinBounds("加入准备", 576, 432, 768, 216, {
    contains: true
  });
};

//! 查找奇域收藏
export const findBeyondFavoritesBtn = () => {
  return findTextWithinBounds("收藏", 0, 880, 200, 200, {
    contains: true
  });
};
//! 查找管理关卡按钮
export const findManageStagesBtn = () => {
  return findTextWithinBounds("管理", 1320, 0, 600, 95, { contains: true });
};
//! 查找编辑关卡存档按钮
export const findEditStageSaveBtn = () => {
  return findTextWithinBounds("管理", 1220, 980, 700, 100);
};
//! 查找要删除的存档位置
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
//! 查找局外存档列头
export const findExternalSaveColumnPos = () => {
  return findTextWithinBounds("局外", 55, 190, 1810, 50, { contains: true });
};
//! 查找删除局外存档复选框已选中状态
export const findDeleteExternalSaveChecked = (colPos: number) => {
  const img = "assets/Checkbox_Checked.png";
  const iro = findImageWithinBounds(img, colPos, 250, 290, 710, {
    threshold: 0.6,
    use3Channels: false
  });
  iro?.drawSelf("group_img");
  return iro;
};
//! 查找删除关卡存档按钮
export const findDeleteStageSaveBtn = () => {
  return findTextWithinBounds("删除所选", 1220, 980, 700, 100);
};

//! 查找关卡退出按钮
export const findStageEscBtn = () => {
  const img = "assets/UI_Icon_Leave.png";
  const iro = findImageWithinBounds(img, 0, 0, 100, 100, { threshold: 0.75 });
  iro?.drawSelf("group_img");
  return iro;
};
//! 查找中断挑战按钮
export const findExitStageBtn = () => {
  return findTextWithinBounds("中断挑战", 576, 324, 768, 432);
};
//! 查找跳过奇域等级提升页面
export const findSkipLevelUpMsg = () => {
  return findTextWithinBounds("空白处", 610, 950, 700, 60, { contains: true });
};

//! 查找返回提瓦特按钮
export const findGotTeyvatBtn = () => {
  return findTextWithinBounds("返回", 1500, 0, 300, 95, { contains: true });
};
