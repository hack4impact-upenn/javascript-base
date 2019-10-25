export function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function titleCase(str: string) {
  return str.toLowerCase().split(' ').map((word: string) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
