export enum TextareaVariants {
  PRIMARY = 'primary'
}

export const TEXTAREA_STYLES: { [key in TextareaVariants]: string } = {
  [TextareaVariants.PRIMARY]: 'p-2 border-1 border-gray-400 rounded-md resize-none'
};
