const selectNodeRaw = (array, setArray) => (target, sibling, parent) => {
    // Champion base case
    if (target === 0 && array[1].primed && array[2].primed) {
        setArray(array.map((elem, i) => {
            if ( i === target) {
                return {...elem.nodeState, selected: true};
            }
        }));
    }
    // If target and sibling are not primed then selection cancelled
    else if (!array[target].primed || !array[sibling].primed) {
        return;
    }
    return setArray(array.map(
        (elem, i) => {
            if (i !== target) {
                if (i === sibling) {
                    return {...elem.nodeState, loser: !elem.loser, selected: false};
                }
                else if (i === parent) {
                    return {...elem.nodeState, primed: true}
                }
                else {
                    return elem;
                }
            }
            else {
                return {...elem.nodeState, selected: !elem.selected, loser: false}
            };
        }
    ));
};

export default selectNodeRaw;