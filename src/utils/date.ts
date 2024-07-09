export const separateDateToDayMonthYear = (date: string) => {
  if(!date) return '';

  const dateSplited = date.split('-');
  const day = dateSplited[2].split('T')[0];

  return `${day}/${dateSplited[1]}/${dateSplited[0]}`;
}