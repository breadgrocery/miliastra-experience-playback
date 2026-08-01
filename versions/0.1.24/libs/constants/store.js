import { getNextDay4AM, getNextMonday4AM, useStoreWithDefaults } from "../@bettergi+utils.js";
import { __name } from "../rolldown-runtime.js";

//#region src/constants/store.ts
const uid = await (async () => {
  const uidNumber = await genshin.uid();
  if (uidNumber > 0) return String(uidNumber);
  else {
    log.warn("无法识别 UID，已回退至默认数据存储，多用户数据存储功能将不可用");
    return "default";
  }
})();
/** 脚本数据存储 */
const store = useStoreWithDefaults(uid, {
  uid,
  weekly: {
    expGained: 0,
    attempts: 0
  },
  daily: { attempts: 0 },
  nextWeek: getNextMonday4AM().getTime(),
  nextDay: getNextDay4AM().getTime()
});

//#endregion
export { store };
