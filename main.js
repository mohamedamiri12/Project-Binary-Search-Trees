import { Tree } from "./binaryTree.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67,3500,670])

tree.prettyPrint(tree.root)
console.log(tree.isBalanced())