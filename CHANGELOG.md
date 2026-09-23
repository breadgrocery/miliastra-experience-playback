# 更新日志

## [0.1.27](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.27)

- 修复多重弹窗（例如随机试行斗篷）可能导致奖励领取不完整

## [0.1.26](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.26)

- 修复关卡内对话框概率关闭失败

## [0.1.25](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.25)

- 优化恶劣网络环境下删除存档健壮性
- 添加内置 UID 识别函数（0.63.0版本已修复）兜底

## [0.1.24](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.24)

- 无法识别 UID 时，回退到默认数据存储，避免多用户进度读写中断

## [0.1.23](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.23)

- 修复目标关卡恰好位于首页首位时搜索失败的问题（极端情况）
- 改用内置 UID 识别函数，缓解 UID 识别不稳定
- 新增部分日志打印与绘制调试框

## [0.1.22](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.22)

- 减少搜索奇域受网络影响
- 经验证：操作频繁时无条件弹出的节流提示不能作为「已搜索成功」的判断条件，已移除该判断

## [0.1.21](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.21)

- 支持通过配置跳过每周通关任务

## [0.1.20](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.20)

- 每日任务关卡均掉出月热度排行后，按热度顺位移除「原神在线时长查询」，改为较不易掉榜的「轰鸣木桩」
- 调整部分回放脚本
- 首次游玩「经典模式」关卡（如轰鸣木桩）时，尝试进行快速编队，降低进入关卡超时、减少需人工手动编队一次的情况

## [0.1.19](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.19)

- 放宽部分场景 OCR 识别强度：修复房间内判断「开始挑战」条件过严，概率出现进入关卡超时并退出房间

## [0.1.18](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.18)

- 优化判断是否在大厅概率失效的问题

## [0.1.17](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.17)

- 关卡「原神在线时长查询」通关按键由 2 变为 4，预设通关流程适配该变动
- 关卡结算时若存在右上角「跳过」，尝试点击以加快结算
- 每日任务尝试领取奖励的范围改为可配置项（默认全部勾选）

## [0.1.16](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.16)

- 每日任务支持领取「星境彩馈」
- 新增每日「原神游玩总时长」通关脚本
- 微调 UID 识别区域
- 「石头模拟器」通关脚本由 40 秒改为 30 秒
- 每日任务预设数量由 2 改为 3，以适配「星境彩馈」领奖要求

## [0.1.15](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.15)

- 微调大 UID 识别位置

## [0.1.14](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.14)

- 支持「经典模式」开始挑战（DPS 选人界面；要求至少手动编队过一次队伍并开始过挑战）
- 适配「月之六」UI 变动

## [0.1.13](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.13)

- 修复点击跳过奇域等级提升页面失败：新版本「点击空白处继续」会被 OCR 误识别，改为无条件点击空白处，并使用更保守的点击位置

## [0.1.12](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.12)

- 修复判断大厅不够严谨：白色大厅图标有几率被白日 Loading 误判，导致流程提前结束并跳过领取每日奖励

## [0.1.11](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.11)

- 调整图像找图阈值，缓解偶尔找图失败

## [0.1.10](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.10)

- 更新图片资源，适配高分辨率下找图可能失败的问题
- 修复单击领取奖励按钮可能失败的问题

## [0.1.9](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.9)

- 支持多用户 / 多配置模式
- 修复非 1080P 分辨率下删除存档位置错误
- 修复删除存档时点击位置错误

## [0.1.8](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.8)

- 适配「月之四」版本
- 项目改为 ESM 导入，要求 `bgi_version` ≥ 0.54.0
- 每日任务支持领取「绮衣珍赏」
- 调整部分图标资源

## [0.1.7](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.7)

- 修复「美景音乐播放器」概率走歪导致无法按 F 结算
- 新增配置项「执行通关回放前关闭游戏说明对话框」（默认启用；可禁用并改用自行录制的关闭操作）
- 更新项目结构

## [0.1.6](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.6)

- 修改内置通关流程：默认通关流程「深渊 100 层」已下架，改为「美景音乐播放器」
- 「石头模拟器」通关录像改为 40 秒按 1 通关
- 调整部分 UI 变更
- 修复关闭对话框按钮 UI 调整后的适配问题

## [0.1.5](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.5)

- 修复回放文件更新时被错误删除（升级保留文件配置）

## [0.1.4](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.4)

- 修复直接结算的关卡流程异常
- 调整部分参数

## [0.1.3](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.3)

- 修复回放播放超时后未正常退出关卡
- 修复删除存档 checkbox 位置偏差
- 「石头模拟器」提前结算改为约 1 分钟后，回放通关时长由 20 秒调整为 60 秒
- 默认配置的每日通关不同关卡数量由 3 调整为 2

## [0.1.2](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.2)

- 支持执行每日不同关卡通关任务并领取奖励

## [0.1.1](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.1)

- 修复千星奇域「月之三」UI 变动：
  - 按钮「全部奇域」→「搜索奇域」
  - 标题「全部奇域」→「搜索奇域」

## [0.1.0](https://github.com/breadgrocery/miliastra-experience-playback/tree/main/versions/0.1.0)

- 初版发布：千星奇域·每周经验刷取（回放通关版）
- 依据用户预先录制的多个通关流程，随机选取执行通关
- 自动重复通关指定奇域关卡，并追踪每周经验获取进度，达上限后自动跳过
- 支持删除关卡存档后重新挑战（默认关闭）
- 执行结束后可自动返回提瓦特大陆
- 参数合规化与基础流程修复
