import { useState } from "react";
import { Outlet } from "react-router-dom";

function MessageRoot(){

    const [msgType, setMsgType] = useState("All");

    return (
        <>
        <header>
            <nav>
                <ul>
                    <li>
                        <button>All Messages</button>
                        <button>Personal</button>
                        <button>System</button>
                    </li>
                </ul>
            </nav>
        </header>
        <Outlet context={{msgType}}/>
        </>
    );
}

export default MessageRoot;