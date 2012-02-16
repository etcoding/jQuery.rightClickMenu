/*
* RightClickMenu jQuery plugin
*
* Copyright (c) 2011 Evgeni Tsarovski
* http://www.etcoding.com
* Licensed under the GPL license.
*
*

Generates a right-click menu.
Function takes a parameter, which is an array of objects with following properties:
name: text that will be displayed on menu
action: user-defined function, that will be executed when user clicks on the menu item. A jQuery's "$this" element will be passed as a function parameter.

Usage:
var menu = [
{ name: "make red", action: function (element) { $(element).css("color", "red"); } },
{ name: "make black", action: function (element) { $(element).css("color", "black"); } }
];
$("element").rightClickMenu(menu);

Generated menu is wrapped in div with css class 'rightClickMenu'.
*/

(function ($) {
    $.fn.rightClickMenu = function (options) {
        // function must receive options
        if (!options || options.length == 0) {
            alert("Options for rightClickMenu must be defined");
            return;
        }

        // attach hideMenu function to a click anywhere in a document, if it wasn't attached before.
        if (!$.fn.rightClickMenu.initPerformed) {
            $(document).click(function () { hideMenu(); });
            $.fn.rightClickMenu.initPerformed = true;
        }

        // stop context menu from appearing on a target element
        this.bind("contextmenu", function (e) {
            return false;
        });

        // now attach right-click to the target element
        this.bind('mousedown', function (event) {
            if (event.which != 3)   // not right click ?
                return;

            // in case other menu is already opened..
            hideMenu();

            var menuDiv = retrieveCreateMenu(options, this);
            menuDiv.css('left', event.pageX);
            menuDiv.css('top', event.pageY);

            menuDiv.show();
        });


        // Creates new menu markup, or retrieves existing one.
        function retrieveCreateMenu(options, element) {
            // upon creation, original element receives the menu Id. Retrieve the menu using this Id, if exists.
            var menuId = $(element).attr("data-rightClickMenuId");
            // if menu already created, return it
            if (menuId) {
                return $("div[data-rightClickMenuId='" + menuId + "']");
            }

            // Single page can have multiple elements with menus attached, so we need to link elements and menus.
            // Lets create new menu, giving it a data-rightClickMenuId attribute with new ID.
            if (!this.menuId)
                this.menuId = 0;
            menuId = ++this.menuId;
            $(element).attr("data-rightClickMenuId", menuId);
            var menuDiv = $("<div class='rightClickMenu' data-rightClickMenuId='" + menuId + "'></div>");
            var menuUl = $("<ul></ul>");
            menuDiv.append(menuUl);

            for (var i = 0; i < options.length; i++) {
                var li = $("<li>" + options[i].name + "</li>");

                var func = function (uf) { return function () { uf(element); } }    // change the scope
                li.click(func(options[i].action));
                menuUl.append(li);
            };

            menuDiv.hide();
            menuDiv.css('position', 'absolute');
            menuDiv.css('z-index', '1000');
            // disable browser's context menu
            menuDiv.bind("contextmenu", function (e) {
                return false;
            });
            $('body').append(menuDiv);

            return menuDiv;
        }

        // hides any open menu
        function hideMenu() {
            var menu = $('div.rightClickMenu');
            if (menu.length == 0)
                return;

            menu.hide();
        }
    };
})(jQuery);