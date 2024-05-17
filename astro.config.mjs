import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: 'Celaraze Blog',
            social: {
                github: 'https://github.com/celaraze',
            },
            sidebar: [
                {
                    label: '运维',
                    autogenerate: {directory: '运维'},
                },
                {
                    label: '网络安全',
                    autogenerate: {directory: '网络安全'},
                },
                {
                    label: '开发',
                    autogenerate: {directory: '开发'},
                },
                {
                    label: '容器化',
                    autogenerate: {directory: '容器化'},
                },
                {
                    label: '小作文',
                    autogenerate: {directory: '小作文'},
                },
            ],
            locales: {
                root: {
                    label: '简体中文',
                    lang: 'zh-CN',
                },
            },
        }),
    ],
});
