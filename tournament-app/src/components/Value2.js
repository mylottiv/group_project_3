import React from 'react';

function Value2(props) {
    const {img} = props;
    console.log(props)


    return (

<>
<div>
    Choose a Type
    Single Elimination
    Double Elimination
    Round Robin
    Swiss
    Free For All
    Two Stage (group stage + final stage)
</div>

<div>
    Add Participants
    Enter individually or in bulk
    Invite by email
    Host a sign-up page
    Require participants to check in
</div>

<div>
    Report Scores
    Advance match winners
    Delegate reporting permissions
    Email notifications as matches become available
</div>
</>

)
}

export default Value2;