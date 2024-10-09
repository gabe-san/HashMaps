import LinkedList from './linkedlist';

export default class HashMap {
  constructor(initial = 16) {
    this.capacity = initial;
    this.bs = new Array(this.capacity);
    this.loadFactor = 0.75;
    this.totalKeys = 0;
  }

  // keys of type string only for this project
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;

    }
    return hashCode;
  }

  resize() {
    const growthFactor = this.capacity * this.loadFactor;
    const existingKeyValuePairs = this.entries();
    if (growthFactor < this.totalKeys) {
      console.log('Exceeded load factor');
      const newCapacity = this.capacity * 2;
      const newBs = new Array(newCapacity)
      this.capacity = newCapacity
      this.bs = newBs;
      this.totalKeys = 0;
      existingKeyValuePairs.forEach(([key, value]) => this.set(key, value))
    }
  }

  set(key, value) {
    const index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }
    if (!this.bs[index]) {
      this.bs[index] = new LinkedList();
      this.bs[index].prepend(key, value)
      this.totalKeys++
      this.resize();

    } else if (!(this.bs[index].contains(key))) {
      console.log(`Separate-chaining key-value pair ${this.bs[index]}`)
      this.bs[index].append(key, value);
      console.log(`New list: ${this.bs[index]}`)
      this.totalKeys++
      this.resize();
    }
    else if ((this.bs[index].contains(key))) {
      console.log(`*Overwriting* Old list: ${this.bs[index]}`)
      const indexNode = this.bs[index].find(key);
      this.bs[index].overwriteData(indexNode, value)
      console.log(`New list: ${this.bs[index]}`)
    }
    return this.bs[index]
  }

  get(key) {
    const index = this.hash(key);
    if (index < 0 || index >= this.capacity) {
      throw new Error('Trying to access index out of bound');
    }
    if (!this.bs[index]) {
      return null;
    }
    if (this.bs[index].contains(key)) {
      const indexNode = this.bs[index].find(key);
      const value = this.bs[index].getValue(indexNode)
      return value;
    }
    return this.bs[index]
  }

  has(key) {
    const index = this.hash(key);
    if (!this.bs[index]) {
      return false;
    }
    const containsKey = this.bs[index].contains(key)
    return containsKey
  }

  remove(key) {
    const index = this.hash(key);
    if (!this.bs[index]) {
      return false
    }
    if (this.bs[index].contains(key)) {
      const indexNode = this.bs[index].find(key);
      this.bs[index].removeAt(indexNode);
      this.totalKeys--;
    }
    return this.bs[index];
  }

  length() {
    return this.totalKeys;
  }

  clear() {
    this.capacity = 16;
    this.bs = new Array(this.capacity);
    return this.bs;
  }

  keys() {
    const array = [];
    this.bs.forEach(bucket => {
      array.push(bucket.getAllKeys())
    })
    // array.flat(Infinity) also works
    const newArray = array.reduce((acc, cur) => acc.concat(cur), []);
    return newArray;
  }

  values() {
    const array = [];
    this.bs.forEach(bucket => {
      array.push(bucket.getAllValues())
    })
    // array.flat(Infinity) also works
    const newArray = array.reduce((acc, cur) => acc.concat(cur), []);
    return newArray;
  }

  entries() {
    const array = [];
    this.bs.forEach(bucket => {
      array.push(bucket.getAllEntries())
    })
    // array.flat(Infinity) also works
    const newArray = array.reduce((acc, cur) => acc.concat(cur), []);
    return newArray;
  }
}