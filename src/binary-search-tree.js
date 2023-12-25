const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */

class BinarySearchTree {
  constructor() {
    this.rootNode = null; // Changed here
  }

  add(data) {
    const newNode = new Node(data);
    this.rootNode
      ? this.insert(this.rootNode, newNode)
      : (this.rootNode = newNode); // Changed here
  }

  insert(node, newNode) {
    if (newNode.data < node.data) {
      node.left ? this.insert(node.left, newNode) : (node.left = newNode);
    } else {
      node.right ? this.insert(node.right, newNode) : (node.right = newNode);
    }
  }

  has(data) {
    return this.find(data) !== null;
  }

  find(data) {
    let currentNode = this.rootNode; // Changed here
    while (currentNode && data !== currentNode.data) {
      currentNode =
        data < currentNode.data ? currentNode.left : currentNode.right;
    }
    return currentNode;
  }

  remove(data) {
    this.rootNode = this.removeNode(this.rootNode, data); // Changed here
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
      let successor = this.findMinNode(node.right);
      node.data = successor.data;
      node.right = this.removeNode(node.right, successor.data);
      return node;
    }
  }

  findMinNode(node) {
    return node.left ? this.findMinNode(node.left) : node;
  }

  min() {
    return this.rootNode ? this.findMinNode(this.rootNode).data : null; // Changed here
  }

  max() {
    if (!this.rootNode) return null; // Changed here
    let node = this.rootNode; // Changed here
    while (node.right) node = node.right;
    return node.data;
  }

  root() {
    return this.rootNode;
  }
}

module.exports = {
  BinarySearchTree,
};
