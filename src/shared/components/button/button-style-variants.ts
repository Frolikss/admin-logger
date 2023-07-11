export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export const BUTTON_STYLES: { [key in ButtonVariants]: string } = {
  [ButtonVariants.PRIMARY]:
    'border-violet-600 text-violet-600 hover:border-violet-300 hover:text-violet-300',
  [ButtonVariants.SECONDARY]:
    'border-red-600 text-red-600 hover:border-red-300 hover:text-red-300 disabled:hover:border-red-600 disabled:hover:text-red-600'
};
