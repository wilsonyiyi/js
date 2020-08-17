import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    name: 'Formily Api',
    rightRender: () => '哈哈哈',
  },
  antd: {
    dark: false,
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', redirect: '/basic/schema' },
    {
      path: '/basic',
      name: '基础用法',
      routes: [
        {
          path: '/basic/schema',
          name: '描述方式',
          component: './basic/schema',
        },
      ],
    },
  ],
});
