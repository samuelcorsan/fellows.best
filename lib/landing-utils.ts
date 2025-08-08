// Seeded random for consistent SSR/client results
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function shuffle<T>(array: T[], seed: number = 42): T[] {
  const result = [...array];
  let currentIndex = result.length;

  while (currentIndex !== 0) {
    const randomIndex = Math.floor(seededRandom(seed + currentIndex) * currentIndex);
    currentIndex--;
    [result[currentIndex], result[randomIndex]] = [
      result[randomIndex], 
      result[currentIndex]
    ];
  }

  return result;
}

export function distributeEvenly<T extends { organizer: string }>(array: T[]): T[] {
  const organizerGroups: { [key: string]: T[] } = {};
  array.forEach((item) => {
    if (!organizerGroups[item.organizer]) {
      organizerGroups[item.organizer] = [];
    }
    organizerGroups[item.organizer].push(item);
  });

  const organizers = Object.keys(organizerGroups);
  const shuffledOrganizers = shuffle([...organizers], 123);

  Object.keys(organizerGroups).forEach((org, index) => {
    organizerGroups[org] = shuffle(organizerGroups[org], 456 + index);
  });

  const result: T[] = [];
  let maxItemsPerOrg = Math.max(
    ...Object.values(organizerGroups).map((group) => group.length)
  );

  for (let round = 0; round < maxItemsPerOrg; round++) {
    for (const org of shuffledOrganizers) {
      if (organizerGroups[org].length > round) {
        result.push(organizerGroups[org][round]);
      }
    }
  }

  return result;
}