import Node from './node';

export default class LinkedList {
  constructor(head = null) {
    this.head = head;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  prepend(key, value) {
    const newNode = new Node(key, value);
    const current = this.head
    newNode.next = current;
    this.head = newNode
    this.length++
  }

  // current.next in while loop skips check on the LAST element in the list
  append(key, value) {
    const nodeItem = new Node(key, value);
    if (this.head === null) {
      this.head = nodeItem;
    } else {
      let current = this.head;
      while (current.next !== null) {
        current = current.next
      }
      current.next = nodeItem;
    }
    this.length++
  }

  head() {
    if (this.head === null) {
      return console.log('No node in list')
    }
    return this.head;
  }

  tail() {
    if (this.head === null) {
      return console.log('Only reference to head pointer available')
    }
    let current = this.head;
    while (current.next) {
      current = current.next
    }
    return current
  }

  at(index) {
    let count = 0;
    let current = this.head;
    while (current) {
      if (count === index) {
        return current
      }
      count++
      current = current.next
    }
    return null
  }

  pop() {
    let current = this.head;
    if (this.head === null || this.length <= 0) {
      return console.log('No node to pop: only head pointer')
    }
    if (this.length === 1) {
      this.head = null;
      current = null;
      this.length--
      return current
    }
    while (current.next.next) {
      current = current.next
    }
    this.length--;
    current.next = null;
    return current
  }

  // change argument whether you want to check if list contains key or value 
  contains(key) {
    let current = this.head;
    while (current) {
      if (current.key === key) {
        return true
      }
      current = current.next
    }
    return false
  }

  find(key) {
    let count = 0;
    let current = this.head;
    while (current) {
      if (current.key === key) {
        return count
      }
      count++
      current = current.next
    }
    return null
  }

  toString() {
    let stringResult = '';
    let current = this.head;
    while (current) {
      stringResult += `( ${current.key}: ${current.value} )${(current.next) ? ' -> ' : ' -> null'}`;
      current = current.next
    }
    return stringResult
  }

  // change second argument to newKey/newValue/etc.
  overwriteData(index, newValue) {
    let count = 0;
    let current = this.head;
    while (current) {
      if (index === count) {
        current.value = newValue;
        return
      }
      count++;
      current = current.next
    }
  }

  getValue(index) {
    let count = 0;
    let current = this.head;
    while (current) {
      if (index === count) {
        return current.value;

      }
      count++;
      current = current.next
    }
    return false;
  }

  insertAt(key, value, index) {
    const newNode = new Node(key, value)
    let count = 0
    let current = this.head;
    let prev = null;
    if (index === 0 && this.length === 0) {
      this.length++;
      this.head = newNode;
      return this.head;
    }
    if (index === 0 && this.length > 0) {
      this.length++;
      this.head = newNode;
      newNode.next = current;
      return newNode.next
    }
    while (current) {
      if (count === index) {
        newNode.next = current;
        prev.next = newNode;
        this.length++
      }
      count++
      prev = current;
      current = current.next
    }
    return current
  }

  removeAt(index) {
    let count = 0;
    let current = this.head;
    let prev = '';
    if (index > this.length || this.length === 0) {
      return null
    }
    if (index === 0) {
      this.length--;
      this.head = current.next;
      return this.head;
    }
    while (current) {
      if (count === index) {
        prev.next = current.next
        current.next = null;
        this.length--;
      }
      count++
      prev = current;
      current = current.next;
    }
    return current
  }

  getAllKeys() {
    let current = this.head;
    const array = [];
    while (current) {
      array.push(current.key)
      current = current.next;
    }
    return array;
  }

  getAllValues() {
    let current = this.head;
    const array = [];
    while (current) {
      array.push(current.value)
      current = current.next;
    }
    return array;
  }

  getAllEntries() {
    let current = this.head;
    const array = [];
    while (current) {
      array.push([current.key, current.value])
      current = current.next;
    }
    return array;
  }
}