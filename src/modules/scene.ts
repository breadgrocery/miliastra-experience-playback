import { findSinglePlayerBtn } from "../constants/regions";

export const ensureMultiPlayer = () => {
  const btn = findSinglePlayerBtn();
  if (btn) {
    log.warn("当前处于{sp}状态，无法进入千星奇域", "禁止联机");
  }
};
