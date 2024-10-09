class Node {
    constructor(data){
        this.data = data
        this.leftChildren = null
        this.rightChildren = null
    }
}

class Tree {
    constructor(array){
        this.array = array
        this.root = this.buildTree(array)
    }
    
    buildTree(array) {
        if(array.length == 0) return null;
        let sortedArray = Array.from(new Set(array))
        sortedArray.sort((a, b) => a - b)
        const mid = Math.floor( sortedArray.length  / 2 )
        
        const root = new Node(sortedArray[mid])
        
        root.leftChildren = this.buildTree(sortedArray.slice(0,mid))
        root.rightChildren = this.buildTree(sortedArray.slice(mid+1,sortedArray.length))
        return root
    }
    
    prettyPrint = (node, prefix = "", isLeft = true) => {
        if (node === null) {
          return;
        }
        if(node){
            if (node.rightChildren !== null) {
                this.prettyPrint(node.rightChildren, `${prefix}${isLeft ? "│   " : "    "}`, false);
              }
              console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
              if (node.leftChildren !== null) {
                this.prettyPrint(node.leftChildren, `${prefix}${isLeft ? "    " : "│   "}`, true);
              }
        }

    };
    
    
    insert(value) {
        this.root = this.insertRecursive(this.root,value)
    }

    insertRecursive(root,value){
        if(root.data == value){
            return root
        } else if (value < root.data) {
            this.insertRecursive(root.leftChildren,value)
        } else {
            this.insertRecursive(root.rightChildren,value)
        }
    }
    
    deleteItem(value){
        this.root = this.deleteRecursive(this.root,value)
    }

    deleteRecursive(root,value){
        
        if(root.data == value){
            // if it is a leaf
            if(root.leftChildren == null && root.rightChildren == null) return null
            // if it has one child
            if(root.leftChildren != null && root.rightChildren == null) return root.leftChildren
            else if(root.leftChildren == null && root.rightChildren != null) return root.rightChildren
            // if it has both children 
            if(root.leftChildren != null && root.rightChildren != null) {
                let successor = this.inOrderSuccessor(root.rightChildren)
                root.data = successor.data
                // we remove the successor
                root.rightChildren = this.deleteRecursive(root,successor.data)
            }
        } else if (value < root.data) {
            root.leftChildren = this.deleteRecursive(root.leftChildren,value)
        } else {
            root.rightChildren = this.deleteRecursive(root.rightChildren,value)
        }
        return root
    }
    
    // find the in order successor
    inOrderSuccessor(node) {
        while(!node.left === null)
            node = node.left
        return node
    }

    find(value){
        if(this.root.data == value) return this.root
        else if(this.root.data < value){
            this.find(this.root.rightChildren)
        } 
        else if(this.root.data > value){
            this.find(this.root.leftChildren)
        }
    }
    
    levelOrder(callback){
        if (!callback) {
            throw new Error("Callback function is required.");
        }
        
        const queue = [this.root];
        
        while (queue.length > 0) {
            const node = queue.shift();
            if (node) {
                callback(node.data); // idk yet what callback are we calling it should be console.log maybe
                if (node.leftChildren) {
                    queue.push(node.leftChildren);
                }
                if (node.leftChildren) {
                    queue.push(node.rightChildren);
                }
            }
        }
        return ;
    }

    inOrder(callback){
        this.inOrderRecursive(this.root,callback)
    }
    inOrderRecursive(node,callback){
        if (!callback) {
            throw new Error("Callback function is required.");
        }
        if(node.leftChildren) this.inOrderRecursive(node.leftChildren,callback)
        callback(node.data)
        if(node.rightChildren) this.inOrderRecursive(node.rightChildren,callback)
    }

    preOrder(callback){
        this.preOrderRecursive(this.root,callback)
    }
    preOrderRecursive(node,callback){
        if (!callback) {
            throw new Error("Callback function is required.");
        }
        callback(node.data)
        if(node.leftChildren) this.preOrderRecursive(node.leftChildren,callback)
        if(node.rightChildren) this.preOrderRecursive(node.rightChildren,callback)
    }

    postOrder(callback){
        this.postOrderRecursive(this.root,callback)
    }
    postOrderRecursive(node,callback){
        if (!callback) {
            throw new Error("Callback function is required.");
        }
        if(node.leftChildren) this.postOrderRecursive(node.leftChildren,callback)
        if(node.rightChildren) this.postOrderRecursive(node.rightChildren,callback)
        callback(node.data)
    }
    height(node){
        if(node == null) return 0
        if(this.height(node.leftChildren) > this.height(node.rightChildren) || this.height(node.rightChildren) == null) return 1+this.height(node.leftChildren)
        else return 1+this.height(node.rightChildren)
    }

    depth(node) {
        if (node == null) return null; 
        return this.findDepth(this.root, node, 0);
    }
    
    findDepth(current, target, depth) {
        if (current == null) return null;
        if (current == target) return depth; 
    
        let leftDepth = this.findDepth(current.left, target, depth + 1);
        if (leftDepth != -1) return leftDepth; 
    
        let rightDepth = this.findDepth(current.right, target, depth + 1);
        return rightDepth; 
    }

    isBalanced(){
        return this.checkBalance(this.root)
    }

    checkBalance(root){
        if (root === null) return true; // Base case: if the node is null, it's balanced

    let lbalance = false, rbalance = false;
    let lheight = 0, rheight = 0;

    if (root.leftChildren !== null) {
        lheight = this.height(root.leftChildren);
        lbalance = this.checkBalance(root.leftChildren);
    } else {
        lbalance = true; // If there is no left child, it's balanced
    }

    if (root.rightChildren !== null) {
        rheight = this.height(root.rightChildren);
        rbalance = this.checkBalance(root.rightChildren);
    } else {
        rbalance = true; // If there is no right child, it's balanced
    }

    let difference = Math.abs(lheight - rheight) <= 1;
    return difference && lbalance && rbalance; // Return the final result
    }

    rebalance(){
        let sortedArray = []
        this.inOrder((value) => sortedArray.push(value));
        this.root = this.buildTree(sortedArray);
    }
    

}

export {Tree}