import { ComponentOptionsBase } from 'vue';
import { LoadingParentElement } from 'element-plus'
export interface LoadingOptions {
  close: () => void;
  setText?: (text: string) => void;
  removeElLoadingChild?: () => void;
  handleAfterLeave?: () => void;
  vm?: globalThis.ComponentPublicInstance<{},{},{},{},{},{},{},{},false,ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}, {}, {}, string>>;
  $el?: HTMLElement;
  originalPosition?: globalThis.Ref<string>;
  originalOverflow?: globalThis.Ref<string>;
  visible?: globalThis.Ref<boolean>;
  parent?: globalThis.Ref<LoadingParentElement>;
  background?: globalThis.Ref<string>;
  svg?: globalThis.Ref<string>;
  svgViewBox?: globalThis.Ref<string>;
  spinner?: globalThis.Ref<string | boolean>;
  text?: globalThis.Ref<string>;
  fullscreen?: globalThis.Ref<boolean>;
  lock?: globalThis.Ref<boolean>;
  customClass?: globalThis.Ref<string>;
  target?: globalThis.Ref<HTMLElement>;
  beforeClose?: globalThis.Ref<(() => boolean) | undefined>;
  closed?: globalThis.Ref<(() => void) | undefined>;
}