export interface CopyElement extends HTMLElement {
  $copyValue?: string;
  $copyCallback?: (value: string) => void;
  $destroyCopy?: () => void;
}

// Define the type for the binding value
export interface PermissionBinding {
  value: string[]
}

// Define the type for the binding value
export interface RoleBinding {
  value: string[]
}