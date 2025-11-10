$(document).ready(function () {
  var logDate = $(".entry__btn");

  logDate.on("change", function () {
    var entries = $(this).siblings(".entry__box");

    var menuItem = $(this).closest("li.logbox__list__entry"),
      menuItemPos = menuItem.position();

    // grab the menu item's position relative to its positioned parent
    if ($(this).is(":checked")) {
      if ($(window).width() <= 1200) {
        entries.css({
          display: "block",
          top: menuItemPos.top + Math.round(menuItem.outerHeight() * 1.01),
          left: "50%",
          transform: "translateX(-50%)",
        }); // For mobile, show entries at the center and top
      } else {
        entries.css({
          display: "block",
          top: menuItemPos.top,
          right: menuItemPos.left + Math.round(entries.outerWidth() * 0.59),
        }); // For desktop, show entries relative to the menu item

        // // enable unchecking radio
        // $(this)
        //   .siblings("label")
        //   .click(function () {
        //     var radio = $(this).siblings("input");
        //     var preVal = $(this).attr("previousValue");
        //     console.log($(this));
        //     console.log(this);
        //     console.log(radio);
        //     console.log(preVal);

        //     if (radio.prop("checked", true)) {
        //       radio.prop("checked", false);
        //     }
        //   });
      }

      $(this)
        .closest(".logbox__list__entry")
        .siblings()
        .find(".entry__box")
        .hide();

      $(this)
        .closest(".logbox__list__entry")
        .siblings()
        .find(".entry__btn")
        .prop("checked", false);
    } else entries.hide(); // Uncheck, hide entries

    if ($(this).is(":checked")) {
      var entriesList = $(this).closest(".logbox__list").find(".entry__box");

      // Find the most recent .entries element
      var maxZIndex = 0;
      entriesList.each(function () {
        var zIndex = parseInt($(this).css("z-index"), 10);
        if (zIndex > maxZIndex) maxZIndex = zIndex;
      });

      // Increase the z-index of the most recent .entries element
      var currentEntries = $(this).siblings(".entry__box");
      currentEntries.css("z-index", maxZIndex + 1);
    } else $(this).siblings(".entry__box").css("z-index", "auto");
  });
});
