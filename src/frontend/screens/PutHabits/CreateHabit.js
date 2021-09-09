import React from 'react'
import PutHabits from "./PutHabits";

function CreateHabitScreen(props) {
    return (
        <PutHabits navigation={props.navigation} isCreate={true} header={"Create Habit"} days={[false,false,false,false,false,false,false]} alarms={[]} title={''} description={''} reason={''} buttonText={'Create'}  />
    )
}

export default CreateHabitScreen;
