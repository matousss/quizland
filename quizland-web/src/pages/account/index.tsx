import { NextPage } from "next/types";
import {getCookies} from "cookies-next"
import {NextIncomingMessage} from "next/dist/server/request-meta";
import {GetServerSideProps} from "next";

const Dashboard: NextPage = (props) => {
    console.log(getCookies())
    return <div>

        ahoj
    </div>
}

export default Dashboard