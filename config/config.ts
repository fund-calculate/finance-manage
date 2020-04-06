import { IConfig, IPlugin } from 'umi-types';
import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
import proxy from './proxy';
import webpackPlugin from './plugin.config';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION, REACT_APP_ENV } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins: IPlugin[] = [
  ['umi-plugin-antd-icon-config', {}],
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      // component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          // authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              redirect: '/welcome',
            },
            {
              path: '/welcome',
              name: '分析页',
              icon: 'smile',
              component: './DashboardAnalysis',
            },
            {
              name: '测试页面',
              icon: 'smile',
              path: '/test',
              routes: [
                {
                  name: '图表测试',
                  icon: 'smile',
                  path: '/test/emptypage',
                  component: './EmptyPage',
                },
                {
                  name: 'BizCharts图表测试',
                  icon: 'smile',
                  path: '/test/bizchartsdemo',
                  component: './BizChartsDemo',
                },
                {
                  name: '基础详情页',
                  icon: 'smile',
                  path: '/test/profilebasic',
                  component: './ProfileBasic',
                },
              ],
            },
            {
              name: '基金',
              icon: 'crown',
              path: '/fund',
              routes: [
                {
                  path: '/fund/FundValuation',
                  name: '估值模拟',
                  icon: 'smile',
                  component: './FundValuation',
                },
                {
                  path: '/fund/PositionValuationSimulation',
                  name: '持仓估值模拟收益',
                  icon: 'smile',
                  component: './PositionValuationSimulation',
                },
                {
                  path: '/fund/fund_position',
                  name: '持仓类型比例统计',
                  icon: 'smile',
                  component: './fund_position',
                },
                {
                  path: '/fund/sub-page',
                  name: '持仓类型表格统计',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
            {
              name: '股票',
              icon: 'smile',
              path: '/stock',
              routes: [
                {
                  path: '/stock/transactionreasonrecord',
                  name: '买卖原因记录',
                  icon: 'smile',
                  component: './TransactionReasonRecord',
                },
                {
                  path: '/stock/sub-page1',
                  name: '股票盈亏分析(买卖原因记录关联)',
                  icon: 'smile',
                  component: './Welcome',
                },
              ],
            },
            {
              name: '收益',
              icon: 'crown',
              path: '/earnings',
              routes: [
                {
                  name: '总收益',
                  icon: 'smile',
                  path: '/earnings/AccumulatedEarnings',
                  component: './AccumulatedEarnings',
                },
                {
                  name: '每月收益统计图',
                  icon: 'smile',
                  path: '/earnings/monthincomestatistics',
                  component: './MonthIncomeStatistics',
                },
                {
                  path: '/earnings/sub-page1',
                  name: '支持多种类型app统计',
                  icon: 'smile',
                  component: './Welcome',
                },
                {
                  name: '空白页面',
                  icon: 'smile',
                  path: '/earnings/earnings',
                  component: './earnings',
                },
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  define: {
    REACT_APP_ENV: REACT_APP_ENV || false,
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (
      context: {
        resourcePath: string;
      },
      _: string,
      localName: string
    ) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
          .map((a: string) => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  proxy: proxy[REACT_APP_ENV || 'dev'],
  chainWebpack: webpackPlugin,
} as IConfig;
