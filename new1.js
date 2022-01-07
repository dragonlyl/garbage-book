function Node(data) {
    this.data = data;
    this.left = null;
    this.right = null;
};

function BinarySearchTree() {
    this.insert = function(root, data) {
        if (root === null) {
            this.root = new Node(data);
            
            return this.root;
        }
        
        if (data < root.data) {
            if (root.left) {
                this.insert(root.left, data);
            } else {
                root.left = new Node(data);
            }
        } else {
            if (root.right) {
                this.insert(root.right, data);
            } else {
                root.right = new Node(data);
            }
        }
        
        return this.root;
    };

    
    this.isPresent = function(root, val) {
        // Add your code here
	};

};


const url = 'https://www.runoob.com/wp-content/themes/runoob/option/alisearch/v330/hot_hint.php?type=hint&user_id=b0d9a905-ab68-4044-abca-9b05e249801a'
function test (ctx) {
  return new Promise(async resolve => {
      setTimeout(() => {
          resolve(2)
      },1000)
    // let res = await ctx.ajax({url})
    // resolve(res)
  })
}

console.log(test().then(res => {console.log(res ,'res')}))
function main(ctx, utils) {
  return {
  }
}
