import React from 'react'
import PutHabits from "./PutHabits";

function ModifyHabitScreen(props) {
    return (
        <PutHabits navigation={props.navigation} isCreate={false} header={"Create Habit"} days={[false,false,false,false,false,false,false]} alarms={[]} title={''} description={''} reason={''} buttonText={'Create'}  />
    )
}

export default ModifyHabitScreen;
