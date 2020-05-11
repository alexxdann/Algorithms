// 'use strict';

const nums = [22, 5, 1, 2, 10, 3, -2, 19, 1000, 6, 5 ,23, 11, 0, 100, 1];

class Sort {
 #_arr = [];
 #_tempArr = [];
 constructor(arr) {
  this.#_arr = arr;
  this.#_tempArr = Array.from(arr);
  this._selectionSortLoopsCount = 0;
  this._selectionSortReqursionCount = 0;
 }

 switchValues(i1,i2) {
  let tempVal = this.#_tempArr[i1];
  this.#_tempArr[i1] = this.#_tempArr[i2];
  this.#_tempArr[i2] = tempVal;
 }

 checkForZeroOrdiffType(val) {
  return typeof val === typeof this.#_arr[0];
 }

 // 20 input -> _selectionSortLoopsCount: 120
 selectionSortLoops(isInit=true) {
  if(isInit) {
   this.#_tempArr = Array.from(this.#_arr);
   this._selectionSortLoopsCount = 0
  }
  
  let arr = this.#_tempArr;

  for(let i = 0; i<arr.length; i++) {
   if(i === arr.length-1) {
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
 // 20 input -> _selectionSortReqursionCount: 136
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
   console.log(arr);
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
}

let sort = new Sort(nums);
console.log(sort);

let selectionSortedLoops = sort.selectionSortLoops();
let selectionSortedReqursion = sort.selectionSortReqursion();

console.log(sort);
console.log(selectionSortedLoops);
console.log(selectionSortedReqursion);

var end = 'end';

