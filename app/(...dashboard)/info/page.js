import SSession from "./serverSession";
import CSession from "./clientSession";

export default async function Info() {
    return (
        <>
            <SSession />
            <CSession />
        </>
    );
}
