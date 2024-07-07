import { useEffect } from "react";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-white text-black grid place-items-center">
      Hello gate
      <Table />
    </div>
  );
}

type DataObject = {
  [key: number]: string[];
};

const numberOfDaysInAMonth = 31;

type valueHashMapType = {
  [key: string]: {
    R_count: number;
    C_count: number;
    rowLimit: number;
    colLimit: number;
  };
};

function generateRandom(): string {
  const index = Math.floor(Math.random() * 3);
  // DRIVE SHIFT - D
  // REST PERIOD - R
  // Night SHIFT - N
  return ["D", "R", "N"][index];
}

function rowAndColumnIsWeekEndDay(row: number, column: number): boolean {
  return false;
}
function fixBoard({
  data,
  row,
  column,
  valueHashMap,
}: {
  data: DataObject;
  row: number;
  column: number;
  valueHashMap: valueHashMapType;
}) {
  console.log(row, column);
  console.log("............................");
  const value: string = generateRandom();
  // this checks for columns only
  for (let i = 0; i < row; i++) {
    if (valueHashMap[value].R_count < valueHashMap[value].rowLimit) {
      valueHashMap[value].R_count++;
      data[row][column] = value;
      break;
    }
  }
  if (data[row][column] === "0") {
    data[row][column] = value;
  }

  // this checks for rows now

  for (let j = column; j > 7; j--) {
    if (valueHashMap[value].C_count < valueHashMap[value].colLimit) {
      valueHashMap[value].C_count++;
      data[row][column] = value;
      break;
    }
  }
}

function Zeroes(value: number): string[] {
  const results: string[] = [];
  for (let i = 0; i < value; i++) {
    results.push("0");
  }

  return results;
}
function Table() {
  const data: DataObject = {
    0: Zeroes(numberOfDaysInAMonth),
    1: Zeroes(numberOfDaysInAMonth),
    2: Zeroes(numberOfDaysInAMonth),
    3: Zeroes(numberOfDaysInAMonth),
    4: Zeroes(numberOfDaysInAMonth),
    5: Zeroes(numberOfDaysInAMonth),
  };

  const rowLength: number = Object.keys(data).length;
  const columnLength: number = data[0].length;

  for (let column = 0; column < columnLength; column++) {
    const valueHashMap: valueHashMapType = {
      D: { R_count: 0, C_count: 0, rowLimit: 3, colLimit: 3 },
      R: { R_count: 0, C_count: 0, rowLimit: 2, colLimit: 3 },
      N: { R_count: 0, C_count: 0, rowLimit: 1, colLimit: 1 },
    };
    for (let row = 0; row < rowLength; row++) {
      fixBoard({ data, row, column, valueHashMap });
    }
  }
  console.log(data);
  return <></>;
}
