// wichtige Imports
const electron = require('electron');
const remote = electron.remote;
const $ = require('jquery');

/*  ________________________________________________________________________________
    |                                                                               |
    |                                   okBtn                             |
    |_______________________________________________________________________________|
*/

$('#okBtn').on('click', () => {
    remote.getCurrentWindow().close();
})