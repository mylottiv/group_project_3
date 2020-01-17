function generateBracket(size) {

    const rounds = ['Champion', 'Finals', 'Semi-finals', 'Quarter-finals', 'Octa-finals'];
  
    const bracket = [];
  
    // Track relationship between nodes and their children with a "parent" object
    // Parent.index is the index of the parent node for the given node being added
    // Child 0 is the parent node of the entire bracket
    // Child 1 is the left child of the given parent node
    // Child 2 is the right child of the given parent node
    let parent = {index: 0,
                  child: 0};
  
    // Populates all nodes in bracket 
    // (2^(size + 1) - 1) total # of nodes in bracket
    for (let i = 0; i < (Math.pow(2, size + 1) - 1); i++) {
  
      // If the previous node was the rightmost child of a parent node
        if (parent.child === 2) {  
            console.log('every')
  
          // Reset parent tracker to the parent of current node
          parent.index = ((i - 1)/2);
          parent.child = 0;
  
        };
  
        // If node is not the parent node of the entire bracket
        // "Root" or "Champion" node
        if (i !== parent.index) {
            console.log('where')
  
          // Increment child counter. 
          // This will happen twice for any given parent node, once for each child.
          parent.child = parent.child + 1;
          
        };
  
        // Set node content depending on "row" (set of y=2^x: 1, 2, 4, 8)
        // i: 0 r: 1; i: 1,2 r: 2; i: 3,4,5,6 r: 4; i: 7, 8, 9, 10, 11, 12, 13, 14 r: 8
        // Find 12
        // At Node: 0
        // Row 0:
        // At Node: 1
        // Row 1:
        // At Node: 3
        // Row 2: 
        // At Node: 7
        // Row 3:
        // At Node: 15
        // Too Far
        // Node 12 is on row 3
        let pointer = 0;
        let row = 0;
        console.log('here');
        // console.log(i)
        for (let x = 0; x <= size; x++) {
            console.log('there')
          let y = Math.pow(2, x);
          // console.log('y', y)
          pointer = pointer + y;
          // console.log('pointer', pointer)
          if (pointer > i) {
            // console.log('Too far')
            row = x;
            break;
          };
        };
        let content = (row === size) ? 'Name' : rounds[row];
        console.log('content', content);
        bracket.push({
          content: content,
          index: i,
          parent: parent.index,
          childNodes: [2 * i + 1, 2 * i + 2],
          sibling: (i !== 0) ? ((i % 2 === 0) ? i-1 : i+1) : null,
          selected: false,
          loser: false,
          primed: (row === size) ? true : false
        });
  
    };
  
    return bracket;
  
  }

  export default generateBracket;