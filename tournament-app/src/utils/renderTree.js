import React from 'react';
import {Node, Round} from '../components';


function renderTree(arr, selectNode) {

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
  
          row.push(<Node payload={payload} key={'node-' + payload.index} selectNode={selectNode}/>)
        
        };
      }
      else {
        let trueIndex = (i !== 1) ? Math.floor(i/2) : i - 1;
        console.log(i, trueIndex);
        for (let j = 0; j < Math.pow(2, trueIndex); j++) {
          row.push(<div className='col text-center h-100'><img className='w-50 h-100' src={'./branch.svg'}></img></div>)
        }
      }
  
      // If count is not even then this row is a row of branches
      let branch = i % 2 !== 0;
  
      let rowId = '';
  
      // Initial row at round=0
      if (i === 0) {
  
          rowId = 'round-' + i;
  
      }
      else {
  
          // Round ID depends upon whether or not a branch row
          if (branch) {
              rowId = 'branch-' + Math.floor(i/2);
          }
          else {
              rowId ='round-' + i/2;
          };
  
      };
  
      tree.push(<Round id={rowId} row={row} key={rowId}/>)
  
    }
  
    return tree;
  
  }
export default renderTree;