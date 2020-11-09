const electron = require('electron');
const {dialog} = require('electron').remote;
const BrowserWindow = electron.remote.BrowserWindow;
const $ = require('jquery');
const remote = electron.remote;

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