$(document).ready(function () {
    // whenever we hover over a menu item that has a submenu
    $(".entry-date__btn").on("change", function () {
      var $entries = $(this).siblings(".entries");

      var $menuItem = $(this).closest("li.entry-date"),
      menuItemPos = $menuItem.position();

      // grab the menu item's position relative to its positioned parent
      if ($(this).is(":checked")) {
        if ($(window).width() <= 1200) {
          // For mobile, show entries at the center and top
          $entries.css({
            display: "block",
            top: menuItemPos.top + Math.round($menuItem.outerHeight() * 1.01),
            left: "50%",
            transform: "translateX(-50%)",
          });
        } else {
          // For desktop, show entries relative to the menu item
          $entries.css({
            display: "block",
            top: menuItemPos.top,
            left:
              menuItemPos.left + Math.round($menuItem.outerWidth() * 1.01),
          });
        }

        $('.entry-date__btn').not($(this)).siblings('.entries').hide();
        $('.entry-date__btn').not($(this)).prop('checked', false);
      } else {
        // Uncheck, hide entries
        $entries.hide();  
      }
    });

    $(".entry-date__btn").on("change", function () {
      if ($(this).is(":checked")) {
        var entriesList = $(this).closest(".logbox__list").find(".entries");

        // Find the most recent .entries element
        var maxZIndex = 0;
        entriesList.each(function () {
          var zIndex = parseInt($(this).css("z-index"), 10);
          if (zIndex > maxZIndex) {
            maxZIndex = zIndex;
          }
        });

        // Increase the z-index of the most recent .entries element
        var currentEntries = $(this).siblings(".entries");
        currentEntries.css("z-index", maxZIndex + 1);
      } else {
        $(this).siblings(".entries").css("z-index", "auto");
      }
    });
  });