import moment from 'moment';

export const getFormattedDate = (date: number) => {
  return moment(date).format('DD.MM.YYYY');
};
