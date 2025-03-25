export const cardNames = {
  '00': 'The Fool',
  '01': 'The Magician',
  '02': 'The High Priestess',
  '03': 'The Empress',
  '04': 'The Emperor',
  '05': 'The Hierophant',
  '06': 'The Lovers',
  '07': 'The Chariot',
  '08': 'Strength',
  '09': 'The Hermit',
  10: 'Wheel of Fortune',
  11: 'Justice',
  12: 'The Hanged Man',
  13: 'Death',
  14: 'Temperance',
  15: 'The Devil',
  16: 'The Tower',
  17: 'The Star',
  18: 'The Moon',
  19: 'The Sun',
  20: 'Judgement',
  21: 'The World',
};

export const formatCardNumber = (cardNumber) => {
  if (!cardNumber) return '';
  const number = cardNumber.replace(/\D/g, '').padStart(2, '0');
  const direction = cardNumber.endsWith('r') ? 'reverse direction' : 'forward direction';
  const name = cardNames[number] || '';
  return `${number} ${name} ${direction}`;
}; 