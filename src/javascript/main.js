const electron = require('electron');
const {dialog} = require('electron').remote;
const BrowserWindow = electron.remote.BrowserWindow;
const $ = require('jquery');
const remote = electron.remote;
const {ipcRenderer} = require('electron');

// Content Aufrufe
$('#overview').on('click' , () => {
    $('#contentContainer').load('../html/overview.html');
})

$('#content1').on('click' , () => {
    $('#contentContainer').load('../html/content1.html');
})

$('#content2').on('click' , () => {
    $('#contentContainer').load('../html/content2.html');
})

$('#content3').on('click' , () => {
    $('#contentContainer').load('../html/content3.html');
})

$('#content4').on('click' , () => {
    $('#contentContainer').load('../html/content4.html');
})

ipcRenderer.on('username', (event,username) => {
    $('#name').html(username);
})

ipcRenderer.on('checkConnection', (event,getConnection) => {
    if (getConnection) {
        $('#dataConnection').css({"background":"rgb(211,238,138)","background":"radial-gradient(circle, rgba(211,238,138,1) 10%, rgba(13,179,63,1) 43%, rgba(4,24,6,1) 100%)"});
    } else {
        $('#dataConnection').css({"background":"rgb(238,138,138)","background":"radial-gradient(circle, rgba(238,138,138,1) 10%, rgba(179,13,15,1) 43%, rgba(32,4,4,1) 96%)"});
    }
})