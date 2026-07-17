import { markRaw } from 'vue';
import borderA from './borderA.vue';
import borderB from './borderB.vue';
import borderC from './borderC.vue';
import borderD from './borderD.vue';
import borderDresvse from './borderDresvse.vue';
import borderE from './borderE.vue';
import borderEresvse from './borderEresvse.vue';
import borderF from './borderF.vue';
import borderG from './borderG.vue';
import borderH from './borderH.vue';
import borderHresbse from './borderHresvse.vue';
import borderI from './borderI.vue';
import borderJ from './borderJ.vue';
import borderK from './borderK.vue';
import borderL from './borderL.vue';
import borderM from './borderM.vue';
import decorateA from './decorateA.vue';
import decorateB from './decorateB.vue';
import decorateBresvse from './decorateBresvse.vue';
import decorateC from './decorateC.vue';
import decorateD from './decorateD.vue';
import decorateDresvse from './decorateDresvse.vue';
import decorateE from './decorateE.vue';
import decorateF from './decorateF.vue';
import decorateG from './decorateG.vue';
import decorateGresvse from './decorateGresvse.vue';
import decorateH from './decorateH.vue';
import decorateI from './decorateI.vue';
import decorateJ from './decorateJ.vue';
import decorateK from './decorateK.vue';
function raw(component) {
    return markRaw(component);
}
// 导出函数，用于动态生成带 i18n 的装饰配置
export const getDecorationItems = (t) => [
    {
        text: t('dashboard.menu.borders'), // 边框
        value: 'borders',
        children: [
            { text: t('dashboard.menu.border1'), value: 'borderA', type: 'decoration', componentConfig: raw(borderA) },
            { text: t('dashboard.menu.border2'), value: 'borderB', type: 'decoration', componentConfig: raw(borderB) },
            { text: t('dashboard.menu.border3'), value: 'borderC', type: 'decoration', componentConfig: raw(borderC) },
            { text: t('dashboard.menu.border4'), value: 'borderD', type: 'decoration', componentConfig: raw(borderD) },
            { text: t('dashboard.menu.border4Reverse'), value: 'borderDresvse', type: 'decoration', componentConfig: raw(borderDresvse) },
            { text: t('dashboard.menu.border5'), value: 'borderE', type: 'decoration', componentConfig: raw(borderE) },
            { text: t('dashboard.menu.border5Reverse'), value: 'borderEresvse', type: 'decoration', componentConfig: raw(borderEresvse) },
            { text: t('dashboard.menu.border6'), value: 'borderF', type: 'decoration', componentConfig: raw(borderF) },
            { text: t('dashboard.menu.border7'), value: 'borderG', type: 'decoration', componentConfig: raw(borderG) },
            { text: t('dashboard.menu.border8'), value: 'borderH', type: 'decoration', componentConfig: raw(borderH) },
            { text: t('dashboard.menu.border8Reverse'), value: 'borderHresvse', type: 'decoration', componentConfig: raw(borderHresbse) },
            { text: t('dashboard.menu.border9'), value: 'borderI', type: 'decoration', componentConfig: raw(borderI) },
            { text: t('dashboard.menu.border10'), value: 'borderJ', type: 'decoration', componentConfig: raw(borderJ) },
            { text: t('dashboard.menu.border11'), value: 'borderK', type: 'decoration', componentConfig: raw(borderK) },
            { text: t('dashboard.menu.border12'), value: 'borderL', type: 'decoration', componentConfig: raw(borderL) },
            { text: t('dashboard.menu.border13'), value: 'borderM', type: 'decoration', componentConfig: raw(borderM) },
        ]
    },
    {
        text: t('dashboard.menu.decorate'),
        value: 'decorate',
        children: [
            { text: t('dashboard.menu.decorate1'), value: 'decorateA', type: 'decoration', componentConfig: raw(decorateA) },
            { text: t('dashboard.menu.decorate2'), value: 'decorateB', type: 'decoration', componentConfig: raw(decorateB) },
            { text: t('dashboard.menu.decorate2Reverse'), value: 'decorateBresvse', type: 'decoration', componentConfig: raw(decorateBresvse) },
            { text: t('dashboard.menu.decorate3'), value: 'decorateC', type: 'decoration', componentConfig: raw(decorateC) },
            { text: t('dashboard.menu.decorate4'), value: 'decorateD', type: 'decoration', componentConfig: raw(decorateD) },
            { text: t('dashboard.menu.decorate4Reverse'), value: 'decorateDresvse', type: 'decoration', componentConfig: raw(decorateDresvse) },
            { text: t('dashboard.menu.decorate5'), value: 'decorateE', type: 'decoration', componentConfig: raw(decorateE) },
            { text: t('dashboard.menu.decorate6'), value: 'decorateF', type: 'decoration', componentConfig: raw(decorateF) },
            { text: t('dashboard.menu.decorate7'), value: 'decorateG', type: 'decoration', componentConfig: raw(decorateG) },
            { text: t('dashboard.menu.decorate8'), value: 'decorateGresvse', type: 'decoration', componentConfig: raw(decorateGresvse) },
            { text: t('dashboard.menu.decorate8Reverse'), value: 'decorateH', type: 'decoration', componentConfig: raw(decorateH) },
            { text: t('dashboard.menu.decorate9'), value: 'decorateI', type: 'decoration', componentConfig: raw(decorateI) },
            { text: t('dashboard.menu.decorate10'), value: 'decorateJ', type: 'decoration', componentConfig: raw(decorateJ) },
            { text: t('dashboard.menu.decorate11'), value: 'decorateK', type: 'decoration', componentConfig: raw(decorateK) },
        ]
    }
];
