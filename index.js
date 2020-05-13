// 'use strict';

function randomDataSet(dataSetSize, minValue, maxValue) {
 return new Array(dataSetSize).fill(0).map(()=>parseInt(Math.random() * (maxValue - minValue) + minValue));
}

function isSorted(arr) {
 return arr.every((v,i)=>(i === 0 || v <= arr[i - 1])) || arr.every((v, i) => (i === 0 || v >= arr[i - 1]));
}

const nums = randomDataSet(100, -1000, 1000);

class Sort {
 #_arr = [];
 #_tempArr = [];
 constructor(arr) {
  this.#_arr = arr;
  this.#_tempArr = Array.from(arr);
  this._selectionSortReqursionCount = 0;
  this._selectionSortLoopsCount = 0;
  this._bubbleSortCount = 0;
  this._coctailSortCount = 0;
 }

 switchValues(i1,i2) {
  let tempVal = this.#_tempArr[i1];
  this.#_tempArr[i1] = this.#_tempArr[i2];
  this.#_tempArr[i2] = tempVal;
 }

 checkForZeroOrdiffType(val) {
  return typeof val === typeof this.#_arr[0];
 }

 // 10 input -> 45
 // 100 input -> 4950
 // 1000 input -> 499500
 selectionSortLoops(isInit=true) {
  if(isInit) {
   this.#_tempArr = Array.from(this.#_arr);
   this._selectionSortLoopsCount = 0
  }
  
  let arr = this.#_tempArr;

  for(let i = 0; i<arr.length; i++) {
   if(i === arr.length-1) {
    this.#_tempArr = Array.from(this.#_arr);
    return arr;
   }

   let currentVal = arr[i];
   let minObj = {
    i: undefined, 
    get val() {
     return arr[this.i];
    }
   };

   for(let k = i+1; k<arr.length; k++) {
    let nextVal = arr[k];
    if(!this.checkForZeroOrdiffType(nextVal)) {
     continue;
    }
    if(minObj.i) {
     if (minObj.val > nextVal) {
      minObj.i = k;
     }
    }
    else {
     if (currentVal > nextVal) {
      minObj.i = k;
     }
    }
    this._selectionSortLoopsCount++;
   }

   if (minObj.i) {
    this.switchValues(i, minObj.i);
   }
  }
 }
 

 // don't work on 10000 inputs / Badly bad
 selectionSortReqursion(startIndex=0, isInit=true) { // in this case reurn doesn't work, looks like some async issue
  if(isInit) {
   this.#_tempArr = Array.from(this.#_arr);
   this._selectionSortReqursionCount = 0;
  }
  
  let minValIndex;
  let arr = this.#_tempArr;

  for(let i = startIndex; i<arr.length; i++) {
   let currentVal = arr[i];
   let rightIndex = i+1;
   let rightVal = arr[rightIndex];
   let checkForZeroOrdiffType = typeof rightVal !== typeof this.#_arr[0]; // number 0 converts to false

   if(!rightVal && checkForZeroOrdiffType) {
    continue;
   }

   if (minValIndex) {
    let minVal = arr[minValIndex];
    let nextIndex = minVal > rightVal ? rightIndex : minValIndex;
    let nextVal = arr[nextIndex];
    if (currentVal > nextVal) {
     minValIndex = nextIndex;
    }
   }
   else {
    if (currentVal > rightVal) {
     minValIndex = rightIndex;
    }
   }
   this._selectionSortReqursionCount++;
  }

  if(startIndex === arr.length-1) {
   console.log('reqursion', arr);
   return arr;
  }

  if (minValIndex && arr[startIndex]>arr[minValIndex]) {
   this.switchValues(startIndex, minValIndex);
   this.selectionSortReqursion(++startIndex,false);
  }
  else {
   this.selectionSortReqursion(++startIndex,false);
  }
 }

 // 10 input -> 45
 // 100 input -> 4950
 // 1000 input -> 499500
 bubbleSort(isInit=true){
  if(isInit) {
   this.#_tempArr = Array.from(this.#_arr);
   this._bubbleSortCount = 0;
  }
  let arr = this.#_tempArr;
  let sortedCount = 0;

  while (true) {
   if (sortedCount === arr.length-1 || this._bubbleSortCount > arr.length**3) {
    this.#_tempArr = Array.from(this.#_arr);
    return arr;
   }

   for(let i = arr.length-1; i>=sortedCount; i--) {
    let currentVal = arr[i];
    let nextVal = arr[i-1];
    if (i === sortedCount) {
     sortedCount++;
     break;
    }
    if(!this.checkForZeroOrdiffType(nextVal)) {
     continue;
    }
    if(nextVal>currentVal) {
     this.switchValues(i-1, i);
    }
    this._bubbleSortCount++;
   }
  }
 }

 // Non stable
 coctailSort(isInit=true) {
  if(isInit) {
   this.#_tempArr = Array.from(this.#_arr);
   this._coctailSortCount = 0;
  }
  let arr = this.#_tempArr;
  let sortedCountMin = 0;
  let sortedCountMax = arr.length-1;
  let stop = false;

  while (true) {
   if ((sortedCountMin === arr.length-1 || sortedCountMax === 0) || sortedCountMin === sortedCountMax || this._coctailSortCoun > arr.length**3 || stop) {
    this.#_tempArr = Array.from(this.#_arr);
    return arr;
   }

   let stopMin = true;
   let stopMax = true;

   for(let i=sortedCountMin; i<sortedCountMax; i++) {
    let currentVal = arr[i];
    let nextVal = arr[i+1];

    if (i === sortedCountMax) {
      sortedCountMax--;
      break;
    }

    if(!this.checkForZeroOrdiffType(nextVal)) {
     continue;
    }
    if(currentVal>nextVal) {
     stopMin = false;
     this.switchValues(i, i+1);
    }
    this._coctailSortCount++;
   }
   
   for(let i=sortedCountMax-1; i>=sortedCountMin; i--) {
    let currentVal = arr[i];
    let nextVal = arr[i-1];

    if (i === sortedCountMin) {
      sortedCountMin++;
      break;
    }
    if(!this.checkForZeroOrdiffType(nextVal)) {
     continue;
    }
    if(nextVal>currentVal) {
     stopMax = true;
     this.switchValues(i, i-1);
    }
    this._coctailSortCount++;
   }

   stop = stopMin && stopMax;
  }
 }
}

let sort = new Sort(nums);
// let selectionSortedReqursion = sort.selectionSortReqursion();
let selectionSortedLoops = sort.selectionSortLoops();
let bubbleSorted = sort.bubbleSort();
let coctailSorted = sort.coctailSort();

console.log('sort', sort);
// console.log('selectionSortedReqursion', selectionSortedReqursion); // Reqursion doesn't return
console.log('selectionSortedLoops', selectionSortedLoops);
console.log(isSorted(selectionSortedLoops));
console.log('bubbleSorted', bubbleSorted);
console.log(isSorted(bubbleSorted));
console.log('coctailSorted', coctailSorted);
console.log(isSorted(coctailSorted));

var end = 'end';

