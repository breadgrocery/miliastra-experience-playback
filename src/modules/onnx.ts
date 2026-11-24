export const onnxManager = {
  /** 模型注册 */
  uiDet: yolo.createPredictor("assets/models/ui-det.onnx", { confidence: 0.7, iou: 0.45 }),

  /** 释放模型资源 */
  dispose: () => {
    onnxManager.uiDet.dispose();
  }
} as const;

/** 查找指定条件的检测结果 */
export type DetectResult = ReturnType<ReturnType<typeof yolo.createPredictor>["detect"]>;
export const findYoloRegion = (
  list: DetectResult,
  predicate: (item: DetectResult[number]) => boolean
) => {
  for (let i = 0; i < list.count; i++) {
    if (list[i]?.isExist() && predicate(list[i])) {
      return list[i];
    }
  }
};
