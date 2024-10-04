export const scrollToLastRow = () => {
  const lastRow = document.querySelector('tbody tr:last-child');
  if (lastRow) {
    lastRow.scrollIntoView({ behavior: 'smooth' });
  }
};
