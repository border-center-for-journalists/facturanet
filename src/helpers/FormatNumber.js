const formatNumber = (number,currency) => {
	return new Intl.NumberFormat(undefined, {
		style: 'currency',
		currency: currency,
	}).format(number);
} 
export default formatNumber;