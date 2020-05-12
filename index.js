// 'use strict';

function randomDataSet(dataSetSize, minValue, maxValue) {
 return new Array(dataSetSize).fill(0).map(function(n) {
   return parseInt(Math.random() * (maxValue - minValue) + minValue);
 });
}

const nums = randomDataSet(20, -1000, 1000);

class Sort {
 #_arr = [];
 #_tempArr = [];
 constructor(arr) {
  this.#_arr = arr;
  this.#_tempArr = Array.from(arr);
  this._selectionSortReqursionCount = 0;
  this._selectionSortLoopsCount = 0;
  this._bubbleSortCount = 0;
 }

 switchValues(i1,i2) {
  let tempVal = this.#_tempArr[i1];
  this.#_tempArr[i1] = this.#_tempArr[i2];
  this.#_tempArr[i2] = tempVal;
 }

 checkForZeroOrdiffType(val) {
  return typeof val === typeof this.#_arr[0];
 }

 // 10 input -> _selectionSortLoopsCount: 45
 // 20 input -> _selectionSortLoopsCount: 190
 // 100 input -> _selectionSortLoopsCount: 4950
 // 1000 input -> _selectionSortLoopsCount: 499500
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
    this._selectionSortLoopsCount++;
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
   }

   if (minObj.i) {
    this.switchValues(i, minObj.i);
   }
  }
 }
 
 // 10 input -> _selectionSortReqursionCount: 55
 // 20 input -> _selectionSortReqursionCount: 210
 // don't work on 10000 inputs / Badly bad
 selectionSortReqursion(startIndex=0, isInit=true) { // in this case reurn doesn't work, looks like some async issue
  if(isInit) {
   this.#_tempArr = Array.from(this.#_arr);
   this._selectionSortReqursionCount = 0;
  }
  
  let minValIndex;
  let arr = this.#_tempArr;

  for(let i = startIndex; i<arr.length; i++) {
   this._selectionSortReqursionCount++;
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

 // 10 input -> _selectionSortReqursionCount: 54
 // 20 input -> _selectionSortReqursionCount: 209
 // 100 input -> _selectionSortReqursionCount: 5049
 // 1000 input -> _selectionSortReqursionCount: 500499
 bubbleSort(isInit=true){
  if(isInit) {
   this.#_tempArr = Array.from(this.#_arr);
   this._bubbleSortCount = 0;
  }
  let arr = this.#_tempArr;
  let sortedCount = 0;

  while (true) {
   if (sortedCount === arr.length-1 || sortedCount > arr.length**3) {
    this.#_tempArr = Array.from(this.#_arr);
    return arr;
   }

   for(let i = arr.length-1; i>=0; i--) {
    this._bubbleSortCount++;
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
   }
  }
 }
}

let sort = new Sort(nums);
console.log(sort);

// let selectionSortedReqursion = sort.selectionSortReqursion();
let selectionSortedLoops = sort.selectionSortLoops();
let bubbleSorted = sort.bubbleSort();

console.log('sort', sort);
// console.log('selectionSortedReqursion', selectionSortedReqursion); // Reqursion doesn't return
console.log('selectionSortedLoops', selectionSortedLoops);
console.log('bubbleSorted', bubbleSorted);

var end = 'end';

