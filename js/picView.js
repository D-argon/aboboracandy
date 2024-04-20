$(document).ready(function () {
  var logDateBtn = $(".entry__btn");
  var logDate = $(".entry");

  logDateBtn.prop("checked", false);

  logDateBtn.on("change", function () {
    var entry = $(this).siblings("ul").children(".entry");

    if ($(this).is(":checked")) {
      entry.css({
        display: "block",
      });
    } else {
      // Uncheck, hide entries
      entry.hide();
    }
  });
});
