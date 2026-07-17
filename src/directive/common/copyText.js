export default {
    beforeMount(el, binding) {
        const { value, arg } = binding;
        if (arg === "callback") {
            if (typeof value === 'function') {
                el.$copyCallback = value;
            }
        }
        else {
            if (typeof value === 'string') {
                el.$copyValue = value;
                const handler = () => {
                    copyTextToClipboard(el.$copyValue);
                    if (el.$copyCallback) {
                        el.$copyCallback(el.$copyValue);
                    }
                };
                el.addEventListener("click", handler);
                el.$destroyCopy = () => el.removeEventListener("click", handler);
            }
        }
    },
    unmounted(el) {
        if (el.$destroyCopy) {
            el.$destroyCopy();
        }
    }
};
function copyTextToClipboard(input, { target = document.body } = {}) {
    const element = document.createElement('textarea');
    const previouslyFocusedElement = document.activeElement;
    element.value = input;
    // Prevent keyboard from showing on mobile
    // ... rest of the function implementation
}
