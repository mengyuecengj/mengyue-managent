import { DropdownItem } from '@/types/dashboard/dashboard';
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

function raw(component: Component) {
  return markRaw(component);
}

// 装饰组件
export const decorationItems: DropdownItem[] = [
  {
    text: '边框',
    value: 'borders',
    children: [
      { text: '边框1', value: 'borderA', type: 'decoration', componentConfig: raw(borderA) },
      { text: '边框2', value: 'borderB', type: 'decoration', componentConfig: raw(borderB) },
      { text: '遍框3', value: 'borderC', type: 'decoration', componentConfig: raw(borderC) },
      { text: '边框4', value: 'borderD', type: 'decoration', componentConfig: raw(borderD) },
      { text: '边框4反转', value: 'borderDresvse', type: 'decoration', componentConfig: raw(borderDresvse) },
      { text: '边框5', value: 'borderE', type: 'decoration', componentConfig: raw(borderE) },
      { text: '边框5反转', value: 'borderEresvse', type: 'decoration', componentConfig: raw(borderEresvse) },
      { text: '边框6', value: 'borderF', type: 'decoration', componentConfig: raw(borderF) },
      { text: '边框7', value: 'borderG', type: 'decoration', componentConfig: raw(borderG) },
      { text: '边框8', value: 'borderH', type: 'decoration', componentConfig: raw(borderH) },
      { text: '边框8反转', value: 'borderHresvse', type: 'decoration', componentConfig: raw(borderHresbse) },
      { text: '边框9', value: 'borderI', type: 'decoration', componentConfig: raw(borderI) },
      { text: '边框10', value: 'borderJ', type: 'decoration', componentConfig: raw(borderJ) },
      { text: '边框11', value: 'borderK', type: 'decoration', componentConfig: raw(borderK) },
      { text: '边框12', value: 'borderL', type: 'decoration', componentConfig: raw(borderL) },
      { text: '边框13', value: 'borderM', type: 'decoration', componentConfig: raw(borderM) },
    ]
  },
  {
    text: '装饰',
    value: 'decorate',
    children: [
      { text: '装饰1', value: 'decorateA', type: 'decoration', componentConfig: raw(decorateA) },
      { text: '装饰2', value: 'decorateB', type: 'decoration', componentConfig: raw(decorateB) },
      { text: '装饰2反转', value: 'decorateBresvse', type: 'decoration', componentConfig: raw(decorateBresvse) },
      { text: '装饰3', value: 'decorateC', type: 'decoration', componentConfig: raw(decorateC) },
      { text: '装饰4', value: 'decorateD', type: 'decoration', componentConfig: raw(decorateD) },
      { text: '装饰4反转', value: 'decorateDresvse', type: 'decoration', componentConfig: raw(decorateDresvse) },
      { text: '装饰5', value: 'decorateE', type: 'decoration', componentConfig: raw(decorateE) },
      { text: '装饰6', value: 'decorateF', type: 'decoration', componentConfig: raw(decorateF) },
      { text: '装饰7', value: 'decorateG', type: 'decoration', componentConfig: raw(decorateG) },
      { text: '装饰8', value: 'decorateGresvse', type: 'decoration', componentConfig: raw(decorateGresvse) },
      { text: '装饰8反转', value: 'decorateH', type: 'decoration', componentConfig: raw(decorateH) },
      { text: '装饰9', value: 'decorateI', type: 'decoration', componentConfig: raw(decorateI) },
      { text: '装饰10', value: 'decorateJ', type: 'decoration', componentConfig: raw(decorateJ) },
      { text: '装饰11', value: 'decorateK', type: 'decoration', componentConfig: raw(decorateK) },
    ]
  }
];
