export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  UTILITY = 'utility'
}

export const BUTTON_STYLES: { [key in ButtonVariants]: string } = {
  [ButtonVariants.PRIMARY]: 'hover:bg-gray-200 p-2 rounded-full',
  [ButtonVariants.SECONDARY]:
    'bg-gray-200 disabled:bg-gray-400 disabled:opacity-30 hover:bg-gray-400 rounded-md flex-1 py-2',
  [ButtonVariants.UTILITY]:
    'rounded-md border-2 border-sky-600 text-sky-600 hover:border-sky-300 hover:text-sky-300 p-2'
};
