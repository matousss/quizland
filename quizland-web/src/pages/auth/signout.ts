import {GetServerSideProps} from "next";
import {getCookies} from "cookies-next";

export const getServerSideProps: GetServerSideProps = async ({query, req, res}) => {
    console.log(getCookies({req: req}))

    return {
        redirect: {
            permanent: false,
            destination: "/"
        }
    }
}

export default () => {}