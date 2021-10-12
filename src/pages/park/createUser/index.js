import React, { useState } from "react";
import Verify from "@components/Verify";
import Optional from "@components/Optional";

const CreateUser = () => {
const [change, setChange] = useState(true);
    return(
        // <Optional />
        change ? <Verify change={setChange} /> : <Optional />
    )
}

export default CreateUser;