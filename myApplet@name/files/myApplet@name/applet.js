// TODO: replace name
const { myApplet } = require('./my-applet');

function main(metadata, orientation, panel_height, instance_id) {
    return myApplet.main(metadata, orientation, panel_height, instance_id);
}