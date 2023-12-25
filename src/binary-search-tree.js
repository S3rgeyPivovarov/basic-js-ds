const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  add(data) {
    const node = new Node(data);
    this.root ? this.insert(this.root, node) : (this.root = node);
  }

  insert(node, newNode) {
    newNode.data < node.data
      ? node.left
        ? this.insert(node.left, newNode)
        : (node.left = newNode)
      : node.right
      ? this.insert(node.right, newNode)
      : (node.right = newNode);
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let current = this.root;
    while (current && data !== current.data) {
      current = data < current.data ? current.left : current.right;
    }
    return current;
  }

  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, key) {
    if (!node) return null;
    if (key < node.data) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.data) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (!node.left && !node.right) return null;
      if (!node.left) return node.right;
      if (!node.right) return node.left;
      let aux = this.findMinNode(node.right);
      node.data = aux.data;
      node.right = this.removeNode(node.right, aux.data);
      return node;
    }
  }

  findMinNode(node) {
    return node.left ? this.findMinNode(node.left) : node;
  }

  min() {
    return this.root ? this.findMinNode(this.root).data : null;
  }

  max() {
    if (!this.root) return null;
    let node = this.root;
    while (node.right) node = node.right;
    return node.data;
  }
}

module.exports = {
  BinarySearchTree,
};
