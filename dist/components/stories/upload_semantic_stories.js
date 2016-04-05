// components/stories/button.js
"use strict";
var React = require("react");
var storybook_1 = require("@kadira/storybook");
var upload_view_1 = require("../upload_view");
var uploader_ui_1 = require("../../lib/uploader_ui");
require("../../../styles/upload.css");
require("semantic-ui-css/components/site.css");
require("semantic-ui-css/components/button.css");
require("semantic-ui-css/components/icon.css");
require("semantic-ui-css/components/reset.css");
var dom = React.DOM;
function init(props) {
    var def = {
        classes: uploader_ui_1.default.semanticUI,
        i18n: uploader_ui_1.default.i18n,
        autoStart: false,
        fileTypes: null,
        multiple: false,
        submitData: null
    };
    // copy params
    if (props) {
        for (var p in props) {
            def[p] = props[p];
        }
    }
    return def;
}
storybook_1.storiesOf("Upload", module)
    .add("no autostart", function () {
    var props = init();
    return React.createElement(upload_view_1.default, React.__spread({}, props));
})
    .add("autostart", function () {
    var props = init({ autoStart: true });
    return React.createElement(upload_view_1.default, React.__spread({}, props));
});
// .add("progress", () => {
//   const props = init({ progress: "20%"});
//   return <Upload {...props} />;
// })
// .add("progress with info", () => {
//
//   const props = init({ progress: "40%", infoLabel: "My Info"});
//   return <Upload {...props} />;
// })
// .add("running", () => {
//   const props = init({ state: "running"});
//   return <Upload {...props} />;
// })
// .add("error", () => {
//   const props = init({ state: "error"});
//   return <Upload {...props} />;
// })
// .add("done", () => {
//   const props = init({ state: "done"});
//   return <Upload {...props} />;
// })
// .add("cancelled", () => {
//   const props = init({ state: "cancelled"});
//   return <Upload {...props} />;
// })
// .add("queue", () => {
//   const props = init({ state: "running", queueItems: [
//     { status: "running", info: "Item1", progress: "20%" },
//     { status: "cancelled", info: "Item2", progress: "90%" }
//   ]});
//   return <Upload {...props} />;
//});
