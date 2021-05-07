export function slugify(text: string): string {
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeeiiiiooooouuuunc------';

  const newText = text
    .split('')
    .map((letter, i) =>
      letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
    );

  return newText
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-y-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export function limit(value: number, max: number): number {
  return Math.max(Math.min(value || 0, max), 0);
}
