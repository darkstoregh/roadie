const arr = [];

if (!process.env.ROADIE_TOKEN) arr.push('Error: ROADIE_TOKEN environment variable not provided.');

console.log(arr.join('\n'));

if (arr.length) process.exit();
