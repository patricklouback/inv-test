export function getTextWidth(text, font = '400 16px Montserrat'): any {
  const canvas =
    // @ts-ignore
    getTextWidth.canvas ||
    // @ts-ignore
    (getTextWidth.canvas = document.createElement('canvas'));
  const context = canvas.getContext('2d');
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

export function getStringWith3Dots(
  name,
  max_title_width,
  font = '400 16px Montserrat'
): string {
  for (let textLength = name.length; textLength > 0; textLength -= 1) {
    if (getTextWidth(name.slice(0, textLength), font) < max_title_width) {
      return `${name.slice(0, textLength)}...`;
    }
  }
}
