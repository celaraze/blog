import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://celaraze.com",
  integrations: [
    starlight({
      title: "Celaraze Blog",
      social: {
        github: "https://github.com/celaraze",
      },
      sidebar: [
        {
          label: "了解我",
          link: "/",
        },
        {
          label: "文章列表",
          autogenerate: { directory: "articles" },
          collapsed: true,
          badge: { text: "建议使用搜索", variant: "success" },
        },
        {
          label: "CAT 文档",
          autogenerate: { directory: "projects/cat" },
          collapsed: true,
        },
      ],
      locales: {
        root: {
          label: "简体中文",
          lang: "zh-CN",
        },
      },
      customCss: ["./src/styles/custom.css"],
    }),
  ],
});
