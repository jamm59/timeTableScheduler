//instructions;
// 1. Each day is a column
// 2. Each day can only have n drivers, 2 People Resting and 1 Night Shift
// 3. Every 7 days or a week we can only have 3 drivers, 3 people resting and 1 night shift
// 4. during the any weekends one column has to have at least 3 straight resting days. Friday, Saturday, Sunday
// 5. Drivers cannot have more that 2 consecutive days with unless it is step 4 above

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

function isWeekEnd(column: number, weekEndDays: Map<number, boolean>): boolean {
  return weekEndDays.get(column) === false;
}
function update3StraightRestingDays(
  data: DataObject,
  rowLength: number,
  columnLength: number
) {
  let weekEndDays = new Map<number, boolean>();
  for (let k = 4; k < numberOfDaysInAMonth; k += 7) {
    weekEndDays.set(k, false);
  }
  for (let row = 0; row < rowLength; row++) {
    for (let column = 0; column < columnLength; column++) {
      if (isWeekEnd(column, weekEndDays) && data[row][column] === "0") {
        weekEndDays.set(column, true);
        data[row][column] = "R";
        data[row][column + 1] = "R";
        data[row][column + 2] = "R";
        console.log(column, column + 1, column + 2);
        break;
      }
    }
    console.log(weekEndDays);
  }
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
  if (data[row][column] !== "0") {
    return;
  }
  console.log(row, column);
  console.log("............................");
  const value: string = generateRandom();
  let allGood = false;
  // this checks for columns only
  for (let i = 0; i < row; i++) {
    if (valueHashMap[value].R_count < valueHashMap[value].rowLimit) {
      valueHashMap[value].R_count++;
      allGood = true;
      data[row][column] = value;
      break;
    }
  }
  if (data[row][column] === "0") {
    allGood = true;
    data[row][column] = value;
  }

  // this checks for rows now

  for (let j = column; j >= 0; j--) {
    if (valueHashMap[value].C_count < valueHashMap[value].colLimit) {
      valueHashMap[value].C_count++;
      data[row][column] = value;
      break;
    }
  }
}

function Table() {
  const data: DataObject = {
    0: Array(numberOfDaysInAMonth).fill("0"),
    1: Array(numberOfDaysInAMonth).fill("0"),
    2: Array(numberOfDaysInAMonth).fill("0"),
    3: Array(numberOfDaysInAMonth).fill("0"),
    4: Array(numberOfDaysInAMonth).fill("0"),
    5: Array(numberOfDaysInAMonth).fill("0"),
  };

  const rowLength: number = Object.keys(data).length;
  const columnLength: number = data[0].length;

  update3StraightRestingDays(data, rowLength, columnLength);
  for (let column = 0; column < columnLength; column++) {
    const valueHashMap: valueHashMapType = {
      D: { R_count: 0, C_count: 0, rowLimit: 3, colLimit: 3 },
      R: { R_count: 0, C_count: 0, rowLimit: 2, colLimit: 3 },
      N: { R_count: 0, C_count: 0, rowLimit: 1, colLimit: 1 },
    };

    for (let row = 0; row < rowLength; row++) {
      //fixBoard({ data, row, column, valueHashMap });
    }
  }
  console.log(data);
  return <></>;
}
