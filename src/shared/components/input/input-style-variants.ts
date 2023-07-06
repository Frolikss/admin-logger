export enum InputVariants {
  PRIMARY = 'primary'
}

export const INPUT_STYLES: { [key in InputVariants]: string } = {
  [InputVariants.PRIMARY]:
    'p-2 border-1 border-gray-400 rounded-md disabled:select-none disabled:opacity-60'
};
