import moment from 'moment';

const numberDisplay = (x, separator = ',', precision = 0) => {
  if (!x) return 0;
  const string = x.toFixed(precision).toString();
  const arr = string.split('.');

  const before = arr[0]
    .replace(/[^0-9]/g, '')
    .replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  if (precision > 0) {
    const after = arr[1] || '00';
    return `${before}.${after}`;
  }
  return before;
};

const priceDisplay = (x, unit = '$') => {
  return `${unit}${numberDisplay(x, ',', 0)}`;
};

const numberValue = (x) => {
  return x.replace(/[^0-9]/g, '');
};

const dateDisplay = (x) => {
  return x ? moment(x).format('MMM D, YYYY') : 'N/A';
};

const scrollTop = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

export default {
  numberDisplay,
  dateDisplay,
  priceDisplay,
  scrollTop,
  numberValue,
};
