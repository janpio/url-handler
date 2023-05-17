import SSession from "./serverSession";
import CSession from "./clientSession";

export default async function Info() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <SSession />
            <CSession />
        </div>
    );
}
