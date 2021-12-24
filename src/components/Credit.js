import React from "react";
import chillHopCredit from "../images/chillhop-credit.png";

const Credit = () => {
    return(
        <div className="credit">
            <a href="https://chillhop.ffm.to/creatorcred" title="Music provided by ChillHop" target="_blank">
                <img src={chillHopCredit} alt="ChillHop Credit"/>
            </a>
        </div>
    );
};

export default Credit;