const electron = require('electron');
const {dialog} = require('electron').remote;
const BrowserWindow = electron.remote.BrowserWindow;
const $ = require('jquery');
const remote = electron.remote;

$('#normal').on('click' , () => {

})

$('#main2').on('click' , () => {
    $('#contentContainer').load('../html/main2.html');
})