export default function (gridClass) {
  const grid = document.createElement("div");
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  for (let i = 1; i < 11; i++)
    alphabet.forEach((char) => {
      const block = document.createElement("div");
      block.classList.add("block");
      block.classList.add(char);
      block.classList.add(i);
      grid.append(block);
    });

  const alphabetDiv = document.createElement("div");
  alphabetDiv.classList.add("alphabet");
  alphabet.forEach((char) => {
    const charDiv = document.createElement("div");
    charDiv.classList.add("x-coordinates");
    charDiv.textContent = char;
    alphabetDiv.append(charDiv);
  });

  const numsDiv = document.createElement("div");
  numsDiv.classList.add("numbers");
  for (let i = 1; i < 11; i++) {
    const numDiv = document.createElement("div");
    numDiv.classList.add("y-coordinates");
    numDiv.textContent = i;
    numsDiv.append(numDiv);
  }

  grid.classList.add(gridClass);

  const wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  wrapper.append(numsDiv, grid);

  return { alphabetDiv, wrapper };
}
