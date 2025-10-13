import type {
	ExpressiveCodeConfig,
	LicenseConfig,
	NavBarConfig,
	ProfileConfig,
	SiteConfig,
} from "./types/config";
import { LinkPreset } from "./types/config";

export const siteConfig: SiteConfig = {
	title: "遛菌羊",
	subtitle: "一位常熟摄影爱好者",
	lang: "zh_CN", // Language code, e.g. 'en', 'zh_CN', 'ja', etc.
	themeColor: {
		hue: 250, // Default hue for the theme color, from 0 to 360. e.g. red: 0, teal: 200, cyan: 250, pink: 345
		fixed: false, // Hide the theme color picker for visitors
	},
	banner: {
		enable: true,
		src: "assets/images/banner.webp", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
		position: "bottom", // Equivalent to object-position, only supports 'top', 'center', 'bottom'. 'center' by default
		credit: {
			enable: true, // Display the credit text of the banner image
			text: "遛菌羊 @常熟一隅", // Credit text to be displayed
			url: "#", // (Optional) URL link to the original artwork or artist's page
		},
	},
	toc: {
		enable: true, // Display the table of contents on the right side of the post
		depth: 2, // Maximum heading depth to show in the table, from 1 to 3
	},
	favicon: [
		// Leave this array empty to use the default favicon
		// {
		//   src: '/favicon/icon.png',    // Path of the favicon, relative to the /public directory
		//   theme: 'light',              // (Optional) Either 'light' or 'dark', set only if you have different favicons for light and dark mode
		//   sizes: '32x32',              // (Optional) Size of the favicon, set only if you have favicons of different sizes
		// }
	],
};

export const navBarConfig: NavBarConfig = {
	links: [LinkPreset.Home, LinkPreset.Archive, LinkPreset.About],
};

export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg", // Relative to the /src directory. Relative to the /public directory if it starts with '/'
	name: "遛菌羊",
	bio: "一位常熟摄影爱好者。",
	links: [
		{
			name: "佳能 EOS R6 Mark II",
			icon: "streamline-ultimate:camera-display-bold",
			// Visit https://icones.js.org/ for icon codes
			// You will need to install the corresponding icon set if it's not already included
			// `pnpm add @iconify-json/<icon-set-name>`
			url: "https://m.canon.com.cn/product/r6ii/",
		},
		{
			name: "EF 35mm F1.4L II USM",
			icon: "streamline-ultimate:lens-shade-bold",
			url: "https://www.canon.com.cn/product/ef35f14lii/index.html",
		},
		{
			name: "EF 70-200mm F2.8L II IS USM",
			icon: "streamline-ultimate:lens-shade-bold",
			url: "https://www.canon.com.cn/product/ef70200f28lisii/",
		},
		{
			name: "佳能 EF EOS-R 卡口适配器",
			icon: "streamline-ultimate:swap-camera-bold",
			url: "https://www.canon.com.cn/accessory/ef/mount.html",
		},
		{
			name: "斯丹德 FK580",
			icon: "streamline-ultimate:photography-equipment-flash-light-bold",
			url: "https://www.sidande.com/list_18/63.html",
		},
		{
			name: "优篮子 MT-63",
			icon: "streamline-ultimate:camera-tripod-bold",
			url: "https://www.ulanzi.cn/index.php?s=product&c=search&catid=1&keyword=MT-63",
		},
	],
};

export const licenseConfig: LicenseConfig = {
	enable: true,
	name: "CC BY-NC-SA 4.0",
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/",
};

export const expressiveCodeConfig: ExpressiveCodeConfig = {
	// Note: Some styles (such as background color) are being overridden, see the astro.config.mjs file.
	// Please select a dark theme, as this blog theme currently only supports dark background color
	theme: "github-dark",
};
