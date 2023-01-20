/*
 *  index.ts
 *  Project: First Exercise
 *
 *  Author: Nick Dilday
 *  Created on: Jan 19, 2023
 */

function merge(arr1: Array<number>, arr2: Array<number>): Array<number> {
  const merged = [];
  const maxLength = Math.max(arr1.length, arr2.length);
  for (let i = 0; i < maxLength; i += 1) {
    if (i < arr1.length) merged.push(arr1[i]);
    if (i < arr2.length) merged.push(arr2[i]);
  }
  return merged;
}

let array1: Array<number> = [4, 5, 23, 18, 9, -5, 31];
let array2: Array<number> = [18, 74, 88, 3, 7, 44, 108];

console.log(merge(array1, array2));

array1 = [4, 5, 23, 18, 9, -5, 31];
array2 = [18, 74, 88, 3];

console.log(merge(array1, array2));
console.log(merge(array2, array1), '\n');

function checkWord(attempt: string, secret: string): string {
  let result = '';
  for (let i = 0; i < attempt.length; i += 1) {
    if (attempt[i] === secret[i]) {
      result += 'c';
    } else if (secret.includes(attempt[i])) {
      result += 'p';
    } else {
      result += 'a';
    }
  }
  return result;
}

const attempts = ['rains', 'shout', 'scope', 'spoke'];

for (const word of attempts) console.log(checkWord(word, 'spoke'));

console.log();

type Candidate = {
  name: string;
  votes: Array<number>;
  funding: number;
};

const candidates: Array<Candidate> = [
  {
    name: 'Edward Underwood',
    votes: [192, 147, 186, 114, 267],
    funding: 58182890,
  },
  {
    name: 'Rose Olson',
    votes: [48, 90, 12, 21, 13],
    funding: 78889263,
  },
  {
    name: 'Leonard Willis',
    votes: [206, 312, 121, 408, 382],
    funding: 36070689,
  },
  {
    name: 'Nathaniel Taylor',
    votes: [37, 21, 38, 39, 29],
    funding: 6317921937,
  },
];

const totalVotes = candidates.reduce(
  (acc, candidate) => acc + candidate.votes.reduce((sum, vote) => sum + vote),
  0
);

candidates.forEach((candidate) => {
  const candidateVotes = candidate.votes.reduce((sum, vote) => sum + vote);
  const percentOfVotes = (candidateVotes / totalVotes) * 100;
  console.log(
    `${candidate.name} received ${candidateVotes} votes, or ${percentOfVotes.toFixed(
      2
    )}% of the total votes cast.`
  );
});

console.log('\nPercentage of votes by precinct:');
for (let i = 0; i < candidates[0].votes.length; i += 1) {
  let precinctVotes = 0;
  candidates.forEach((candidate) => {
    precinctVotes += candidate.votes[i];
  });
  console.log(`Precinct ${i + 1}:`);
  candidates.forEach((candidate) => {
    const percentOfPrecinctVotes = (candidate.votes[i] / precinctVotes) * 100;
    console.log(`  ${candidate.name} received ${percentOfPrecinctVotes.toFixed(2)}% of the votes.`);
  });
}

console.log('\nAmount spent per vote:');
candidates.forEach((candidate) => {
  console.log(
    `${candidate.name} spent ${new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(candidate.funding / candidate.votes.reduce((sum, vote) => sum + vote))} per vote.`
  );
});

const sortedCandidates = candidates.sort(
  (a, b) => b.votes.reduce((sum, vote) => sum + vote) - a.votes.reduce((sum, vote) => sum + vote)
);

if (sortedCandidates[0].votes.reduce((sum, vote) => sum + vote) / totalVotes > 0.5) {
  console.log(`\n${sortedCandidates[0].name} is the winner with over 50% of the votes!`);
} else {
  console.log(
    `\nA runoff is necessary between ${sortedCandidates[0].name} and ${sortedCandidates[1].name} as they received the highest number of votes.`
  );
}
