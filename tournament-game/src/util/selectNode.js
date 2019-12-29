const selectNode = (array, setArray) => (target, sibling, parent) => {
    // Champion base case
    if (target === 0 && array[1].primed && array[2].primed) {
        setArray(array.map((elem, i) => {
            if ( i === target) {
                return {...elem, selected: true};
            }
        }));
    }
    // If target and sibling are not primed then selection cancelled
    else if (!array[target].primed || !array[sibling].primed) {
        return;
    }
    setArray(array.map(
        (elem, i) => {
            if (i !== target) {
                if (i === sibling) {
                    return {...elem, loser: !elem.loser, selected: false};
                }
                else if (i === parent) {
                    return {...elem, primed: true}
                }
                else {
                    return elem;
                }
            }
            else {
                return {...elem, selected: !elem.selected, loser: false}
            };
        }
    ));
};

export default selectNode;