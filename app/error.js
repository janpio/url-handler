"use client";
export default function Error() {
    return <main>error</main>;
}

const pattern = /^(https?:\/\/)?([\w.-]+)\.([a-zA-Z]{2,6})(\/[\w.-]*)*\/?$/;
const googleDrivePattern = /drive\.google\.com\/file\/d\/(.+?)\/.*$/;
const dropboxPattern = /www\.dropbox\.com\/(.+?)\/(.+?)$/;
const megaPattern = /mega\.nz\/(#!|file\/|)[!a-zA-Z0-9_-]{8,}$/;
const onedrivePattern = /1drv\.ms\/(u\/s\/|s\/)[!a-zA-Z0-9_-]{15,}$/;
const boxPattern = /app\.box\.com\/s\/[a-zA-Z0-9_-]+$/;
const icloudPattern = /www\.icloud\.com\/.*$/;
const wetransferPattern = /wetransfer\.com\/downloads\/[a-zA-Z0-9]{10}$/;