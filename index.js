/*
* Node and LinkedList structure to hold the state of
* new timers set by mySimpleTimeOut method.
*/

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(value) {
    this.head = value ? new Node(value) : null;
    this.count = 0;
  }
  insertNode(value) {
    if (!value) return;
    let last = this.head;
    if (!last) {
      this.head = new Node(value);
    }
    while (last.next !== null) {
      last = last.next;
    }
    last.next = new Node(value);
    this.count += 1;
  }

  removeFirst() {
    if (!this.head) return null;
    const removed = this.head;
    this.head = this.head.next;
    this.count -= 1;
    return (removed.next = null);
  }
}

function mergeSort(head) {
  if (!head || !head.next) {
    return head;
  }

  const middle = getMiddle(head);
  const middleRight = middle.next;
  middle.next = null;

  const left = mergeSort(head);
  const right = mergeSort(middleRight);
  return sort(left, right);
}

function sort(left, right) {
  let result;
  if (!left) return right;
  if (!right) return left;
  if (left.value.after <= right.value.after) {
    result = left;
    result.next = sort(left.next, right);
  } else {
    result = right;
    result.next = sort(left, right.next);
  }
  return result;
}

function getMiddle(node) {
  if (!node) {
    return node;
  }
  let fast = node.next;
  let slow = node;
  while (fast !== null) {
    fast = fast.next;
    if (fast !== null) {
      slow = slow.next;
      fast = fast.next;
    }
  }
  return slow;
}

/*
* My simpleTimeout method. 
* 
* @callback callback The callback that should be invoked.
* @param {number} after The time in ms for when the Timer should fire. Should be positive
* @param {string[] | number[]} args The list of arguments to be used if needed.
* 
* return void
*/

//TODO validate callback value
const mySimpleTimeout = (callback, after, args) => {
  const timeout = {
    callback,
    after,
    args,
  };

  if (after >= 0) {
    list.insertNode(timeout);
  }
};

// TODO handle time difference to match as closesly
// as possible to the real time passing. Currently on the initial
// iteration timers should be with a diff of at least 5ms.
const mockTick = () => {
  const startTime = new Date().getTime();
  while (list.count) {
    const now = new Date().getTime();
    runJob(now - startTime);
  }
};

const runJob = (ms) => {
  const headValue = list.head.value;
  if (headValue.after === ms) {
    if (headValue.args.length) {
      headValue.callback.apply(this, headValue.args);
    } else {
      headValue.callback();
    }
    list.removeFirst();
  }
};

// Initialize linked list with 2ms as first value and update the list.count.
const list = new LinkedList({
  callback: () => console.log("2"),
  after: 2,
  args: "",
});
list.count += 1;

// Assign different timeouts.
mySimpleTimeout(() => console.log("5012"), 5012, "");
mySimpleTimeout((first) => console.log(first), 4000, ["4000", "2"]);
mySimpleTimeout(() => console.log("1000"), 1000, "");
mySimpleTimeout((first, second) => console.log(`${first}: ${second}`), 8000, ['8000', 'Waited too long']);
mySimpleTimeout(() => console.log("3000"), 3000, "");
mySimpleTimeout(() => console.log("6577"), 6577, "");
mySimpleTimeout(() => console.log("100"), 100, "");
mySimpleTimeout(() => console.log("200"), 200, "");
mySimpleTimeout(() => console.log("2000"), 2000, "");
mySimpleTimeout(() => console.log("1010"), 1010, "");
mySimpleTimeout(() => console.log("5016"), 5016, "");
mySimpleTimeout(() => console.log("1011"), 1011, "");
mySimpleTimeout(() => console.log("5014"), 5014, "");

// Mock time handling of the Timeouts by sorting
// with O(n*Logn) time complexity.
mergeSort(list.head);

mockTick();
