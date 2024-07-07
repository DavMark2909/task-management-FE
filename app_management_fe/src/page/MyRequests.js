import { defer } from "react-router-dom";

function MyRequests(){

}

export default MyRequests;

async function requestLoader(){

}

export function loader(){
    return defer({
        requests: requestLoader(),
      });
}