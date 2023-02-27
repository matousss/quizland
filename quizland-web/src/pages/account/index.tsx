import { NextPage } from "next/types";
import {getCookies} from "cookies-next"

const Dashboard: NextPage = (props) => {
    console.log(getCookies())
    return <div>

        ahoj
    </div>
}

export default Dashboard