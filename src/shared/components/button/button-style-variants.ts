export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  UTILITY = 'utility'
}

export const BUTTON_STYLES: { [key in ButtonVariants]: string } = {
  [ButtonVariants.PRIMARY]:
    'border-blue-600 text-blue-600 hover:border-blue-300 hover:text-blue-300',
  [ButtonVariants.SECONDARY]:
    'border-red-600 text-red-600 hover:border-red-300 hover:text-red-300 disabled:hover:border-red-600 disabled:hover:text-red-600',
  [ButtonVariants.UTILITY]: 'border-none bg-neutral-100 rounded-md hover:bg-blue-300'
};
