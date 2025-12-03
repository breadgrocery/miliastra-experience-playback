import {
  assertRegionAppearing,
  assertRegionDisappearing,
  getErrorMessage,
  isHostException
} from "@bettergi/utils";
import { userConfig } from "./config";
import {
  findBeyondFavoritesBtn,
  findConfirmBtn,
  findDeleteExternalSaveChecked,
  findDeleteStageSaveBtn,
  findEditStageSaveBtn,
  findExternalSaveColumnPos,
  findManageStagesBtn,
  findSaveToDeletePos
} from "./regions";
import { goToRecommendedWonderlands } from "./room";

//! 进入管理关卡存档界面
export const goToManageStageSave = async () => {
  //! 打开人气奇域
  await goToRecommendedWonderlands();

  //! 打开奇域收藏->管理关卡
  await assertRegionAppearing(
    findEditStageSaveBtn,
    "打开编辑关卡存档按钮超时",
    async () => {
      //! 点击奇域收藏
      findBeyondFavoritesBtn()?.click();
      await sleep(300);
      //! 点击管理关卡
      findManageStagesBtn()?.click();
      await sleep(300);
    },
    { maxAttempts: 5 }
  );
};

//! 删除关卡存档
export const deleteStageSave = async () => {
  if (!userConfig.deleteStageSave || userConfig.deleteStageSaveKeyword.trim() === "") {
    log.info("未启用删除关卡存档，跳过");
    return;
  }
  try {
    //! 进入管理关卡存档界面
    await goToManageStageSave();

    //! 选中要删除的关卡的局外存档
    const stagePos = await findSaveToDeletePos(userConfig.deleteStageSaveKeyword);
    if (stagePos === undefined) {
      log.warn("未找到要删除的关卡存档，跳过");
      return;
    }
    stagePos?.drawSelf("group_text");
    const colPos = findExternalSaveColumnPos();
    if (colPos === undefined) {
      log.warn("无法确定关卡的局外存档列位置，跳过");
      return;
    }

    //! 进入编辑模式
    await assertRegionDisappearing(
      findEditStageSaveBtn,
      "进入编辑模式超时",
      () => {
        keyPress("VK_F");
      },
      { maxAttempts: 5 }
    );

    //! 计算勾选框位置并点击
    const [cx, cy] = [(colPos.x * 2 + colPos.width) / 2, stagePos.y + 20];
    await assertRegionAppearing(
      () => findDeleteExternalSaveChecked(colPos.x),
      "勾选要删除的局外存档超时",
      () => {
        click(Math.ceil(cx), Math.ceil(cy));
      },
      { maxAttempts: 5, retryInterval: 1500 }
    );

    //! 点击删除所选按钮
    await assertRegionDisappearing(
      () => findDeleteExternalSaveChecked(colPos.x),
      "删除关卡存档超时",
      async () => {
        //! 特征较为脆弱，多次确认，确保成功删除
        findConfirmBtn()?.click();
        await sleep(500);
        findConfirmBtn()?.click();
        findDeleteStageSaveBtn()?.click();
        await sleep(1000);
        findConfirmBtn()?.click();
        await sleep(500);
        findConfirmBtn()?.click();
      },
      {
        maxAttempts: 5
      }
    );
  } catch (err) {
    if (isHostException(err)) throw err;
    log.warn("删除关卡存档失败: {error}", getErrorMessage(err));
  } finally {
    //! 返回大厅
    await genshin.returnMainUi();
  }
};
