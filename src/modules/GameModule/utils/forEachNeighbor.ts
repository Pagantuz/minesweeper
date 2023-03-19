const forEachNeighbor = (
  rowIndex: number,
  colIndex: number,
  rows: number,
  columns: number,
  cb: (rowIndex: number, colIndex: number) => void
) => {
  for (let row = rowIndex - 1; row <= rowIndex + 1; row++) {
    for (let col = colIndex - 1; col <= colIndex + 1; col++) {
      if (
        row < 0 ||
        row >= rows ||
        col < 0 ||
        col >= columns ||
        (row === rowIndex && col === colIndex)
      ) {
        continue;
      }

      cb(row, col);
    }
  }
};

export { forEachNeighbor };
