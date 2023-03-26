import {GetServerSideProps} from "next";
import {deleteCookie} from "cookies-next";

export const getServerSideProps: GetServerSideProps = async ({query, req, res}) => {
    deleteCookie("token", {res: res, req: req})
    deleteCookie("user", {res: res, req: req})

    return {
        redirect: {
            permanent: false,
            destination: "/"
        }
    }
}

export default () => {}