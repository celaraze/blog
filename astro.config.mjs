import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://celaraze.com",
  // base: 'blog',
  integrations: [
    starlight({
      title: "Celaraze Blog",
      social: {
        github: "https://github.com/celaraze",
      },
      sidebar: [
        {
          label: "首页",
          link: "/首页",
        },
        {
          label: "运维",
          autogenerate: { directory: "运维" },
          collapsed: true,
        },
        {
          label: "网络安全",
          autogenerate: { directory: "网络安全" },
          collapsed: true,
        },
        {
          label: "开发",
          autogenerate: { directory: "开发" },
          collapsed: true,
        },
        {
          label: "容器化",
          autogenerate: { directory: "容器化" },
          collapsed: true,
        },
        {
          label: "小作文",
          autogenerate: { directory: "小作文" },
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
