export default function numseparator (num) {
  let newnum = '';
  let space_count = 0;
  for (let i = String(num).length - 1; i >= 0; i--) {
    newnum += String(num)[i];
    if ((newnum.length - space_count) % 3 == 0) {
      newnum += ' ';
      space_count += 1;
    }
  }
  if (newnum[0] == ' ') {
    newnum = newnum.slice(1);
  }
  return newnum.split('').reverse().join('');
}
