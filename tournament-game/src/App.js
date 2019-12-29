import React from 'react';  
import {Bracket, Node, Round} from './components';
import {Switch, Route, Link} from 'react-router-dom';


  class App extends React.Component {
    constructor() {
      super();
      this.state = {
        generateBracket: function(size) {

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
              bracket.push({content: content, index: i, parent: parent.index});
      
          };
      
          return bracket;
      
        },
      
        renderFromArray: function(arr) {
      
          console.log(arr);
          console.log(JSON.stringify(arr))
      
          const tree = [];
      
          // tree.push(<Round row={[<Node content={'champion'}/>]}/>);

          // Traverse every row in the bracket array
          // Including the branch rows
          // log2(arr.length + 1) - 1 = rows
          for (let i = 0; i <= (Math.log2(arr.length + 1) - 1) * 2; i++) {
      
            // Traverse every node in the bracket row
            // Nodes per row is 2 ^ row (1, 2, 4, 8 etc)
            let row = [];
            if (i % 2 === 0) {
              let trueIndex = (i !== 0) ? i/2 : i;
              // console.log(i, trueIndex);
              for (let j = 0; j < Math.pow(2, trueIndex); j++) {
                
                let payload=(trueIndex <= 1) ? arr[trueIndex+j] : arr[Math.pow(2, trueIndex) - 1 + j];
        
                row.push(<Node payload={payload}/>)
              
              };
            }
            else {
              let trueIndex = (i !== 1) ? Math.floor(i/2) : i - 1;
              console.log(i, trueIndex);
              for (let j = 0; j < Math.pow(2, trueIndex); j++) {
                row.push(<div className='col text-center h-100'><img className='w-50 h-100' src={'./branch.svg'}></img></div>)
              }
            }
      
            tree.push(<Round round={i} row={row}/>)
      
          }
      
          return tree;
      
        },
      }
    }

  render() {
    return (
    <div className='container'>
      <div className='row'>
        <h3 className='btn-group-lg' role='group' aria-label='Basic example'>Choose Bracket Size (# of rounds):
          <Link className='btn btn-primary ml-1 mr-1' to="/1"><h4>1</h4></Link>
          <Link className='btn btn-primary ml-1 mr-1' to="/2"><h4>2</h4></Link>
          <Link className='btn btn-primary ml-1 mr-1' to="/3"><h4>3</h4></Link>
          <Link className='btn btn-primary ml-1 mr-1' to="/4"><h4>4</h4></Link>
          <Link className='btn btn-primary ml-1 mr-1' to="/5"><h4>5</h4></Link>
        </h3>
      </div>
      <Switch>
        <Route path='/:number' render={(props) => {
          return (
            <div className='row' id='tournament-container'>
              <Bracket {...props} bracket={this.state.renderFromArray(this.state.generateBracket(parseInt(props.match.params.number)))}/>
            </div>
          )
        }}/>
      </Switch>
    </div>
    );
  }
}
export default App;
