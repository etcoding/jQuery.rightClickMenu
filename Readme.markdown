rightClickMenu
==============


This plugin creates a right-click (context) menu on an HTML element of a web page.
Small (just over 1kb compressed) and easy to use.. but see the demo.

Usage:
------

Say you have a div where you want your context menu to appear: 

```
<div id="myText">
     Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</div>
```

Specify an array of objects defining menu element names and an on-click action for each:

```javascript
var menu1 = [
    { name: "Make text red", action: function (element) { $(element).css("color", "red"); } },
    { name: "Make text black", action: function (element) { $(element).css("color", "black"); } },
    { name: "Make text green", action: function (element) { $(element).css("color", "green"); } },
    { name: "Reload page", action: function (element) { window.location.reload(); } },
    { name: "Open Google", action: function (element) { window.location.href = "http://www.google.com" } }
];
```

Attach it to the element (using jQuery selector):

```javascript
$("#myText").rightClickMenu(menu1);
```

Done.

To see it in action go to the demo page: http://etcoding.com/page/RightClickMenu-jQuery-plugin.aspx