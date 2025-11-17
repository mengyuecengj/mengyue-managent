import type { DirectiveBinding, Directive } from 'vue';
import type { CopyElement } from '@/types/directive/general';

export default {
  beforeMount(el: CopyElement, binding: DirectiveBinding<string | ((value: string) => void)>) {
    const { value, arg } = binding;

    if (arg === "callback") {
      if (typeof value === 'function') {
        el.$copyCallback = value;
      }
    } else {
      if (typeof value === 'string') {
        el.$copyValue = value;
        const handler = () => {
          copyTextToClipboard(el.$copyValue as string);
          if (el.$copyCallback) {
            el.$copyCallback(el.$copyValue as string);
          }
        };
        el.addEventListener("click", handler);
        el.$destroyCopy = () => el.removeEventListener("click", handler);
      }
    }
  },
  unmounted(el: CopyElement) {
    if (el.$destroyCopy) {
      el.$destroyCopy();
    }
  }
} as Directive;

function copyTextToClipboard(input: string, { target = document.body }: { target?: HTMLElement } = {}): void {
  const element = document.createElement('textarea');
  const previouslyFocusedElement = document.activeElement as HTMLElement | null;

  element.value = input;

  // Prevent keyboard from showing on mobile
  // ... rest of the function implementation
}
