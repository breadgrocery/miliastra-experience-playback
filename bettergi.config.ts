import { defineConfig } from "@bettergi/cli";
import settings from "./src/settings";

export default defineConfig({
  // 构建配置
  main: "main.ts",
  assetsDir: "assets",
  outDir: "dist",
  additionalFiles: ["README.md"], // 需要额外打包的文件
  codeSplitting: true, // 启用代码分割（要求 `bgi_version` >= `0.54.0`）
  chunkGroups: [
    // src 目录下的 js/ts 按照原目录结构打包
    {
      test: /src[\\/](.*)\.(js|ts)$/,
      name: moduleId => moduleId.match(/src[\\/](.*)\.(js|ts)$/)?.[1]
    }
  ],
  minify: false,
  // 调试配置
  bettergi: {
    enable: true,
    outDir: "MiliastraExperiencePlayback"
  },
  // 清单信息
  manifest: {
    name: "千星奇域·每周经验刷取(回放通关版)",
    bgi_version: "0.54.0", // 该脚本适用的 BetterGI 最低版本
    saved_files: ["store/*.json", "assets/playbacks/*.json"], // 脚本升级时需保留还原的文件/文件夹
    authors: [
      {
        name: "breadgrocery",
        link: "https://github.com/breadgrocery/miliastra-experience-playback"
      }
    ]
  },
  // UI配置
  settings
});
