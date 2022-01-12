"use strict";

const client = require('scp2');
const ftp = {
  host: 'ftp.my-aurora.com',
  username: 'ftp',
  password: '865jZ9wT34vr09Zj804',
  port: 2222
};
const remotePath = 'care_showcase/dev-app';
const connectString = `${ftp.username}:${ftp.password}@${ftp.host}:${ftp.port}:${remotePath}`;
const appPath = __dirname +'/../www';

console.log('starting to upload files from: ' + appPath)
console.log('..............');

client.scp(appPath, connectString, function (err) {
  if (err) {
    console.error('error uploading files');
    throw err
  }
});

console.log('please wait until the upload has finished');
