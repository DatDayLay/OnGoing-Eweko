jQuery(function ($) {
  $("#course-filter-horizontal .tab-content input").on("change", function () {
    var course_type_selected = "";
    var venue_selected = "";
    var month_selected = "";
    var year_selected = "";
    $(
      '#course-filter-horizontal input[name="course-type-filter"]:checked'
    ).serialize();
    $(
      '#course-filter-horizontal input[name="course-venue-filter"]:checked'
    ).serialize();
    $(
      '#course-filter-horizontal input[name="course-month-filter"]:checked'
    ).serialize();
    $(
      '#course-filter-horizontal input[name="course-year-filter"]:checked'
    ).serialize();
    $(
      '#course-filter-horizontal input[name="course-type-filter"]:checked'
    ).each(function () {
      var course_type_name = $(this).val();
      course_type_selected += course_type_name + ",";
    });
    $(
      '#course-filter-horizontal input[name="course-venue-filter"]:checked'
    ).each(function () {
      var course_venue_name = $(this).val();
      venue_selected += course_venue_name + ",";
    });
    $(
      '#course-filter-horizontal input[name="course-month-filter"]:checked'
    ).each(function () {
      var course_month_name = $(this).val();
      month_selected += course_month_name + ",";
    });
    $(
      '#course-filter-horizontal input[name="course-year-filter"]:checked'
    ).each(function () {
      var course_year_name = $(this).val();
      year_selected += course_year_name + ",";
    });
    var term_id = "436";
    var current_id = "9950";
    var ajaxurl =
      "https://www.promisetrainingglobal.com/wp-admin/admin-ajax.php";
    var course_type_selected_arr = new Array(course_type_selected);
    var course_venue_selected_arr = new Array(venue_selected);
    var course_month_selected_arr = new Array(month_selected);
    var course_year_selected_arr = new Array(year_selected);
    var course_type_count = $("#course-filter-horizontal .tab-content").find(
      'input[name="course-type-filter"]:checked'
    ).length;
    var venue_count = $("#course-filter-horizontal .tab-content").find(
      'input[name="course-venue-filter"]:checked'
    ).length;
    var month_count = $("#course-filter-horizontal .tab-content").find(
      'input[name="course-month-filter"]:checked'
    ).length;
    var year_count = $("#course-filter-horizontal .tab-content").find(
      'input[name="course-year-filter"]:checked'
    ).length;

    $(".course-type-selected-count").attr("data-count", course_type_count);
    $(".course-type-selected-count span.count").text(course_type_count);
    $(".venue-selected-count").attr("data-count", venue_count);
    $(".venue-selected-count span.count").text(venue_count);
    $(".month-selected-count").attr("data-count", month_count);
    $(".month-selected-count span.count").text(month_count);
    $(".year-selected-count").attr("data-count", year_count);
    $(".year-selected-count span.count").text(year_count);

    $("#course-filter-horizontal .tabs li div[data-count]").each(function () {
      var count = $(this).attr("data-count");

      if (count > 0) {
        $(this).css("display", "inline-block");
      } else {
        $(this).css("display", "none");
      }
    });
    $.ajax({
      type: "POST",
      url: ajaxurl,
      data: {
        action: "my_action",
        course_type_selected_arr: course_type_selected_arr,
        course_venue_selected_arr: course_venue_selected_arr,
        course_month_selected_arr: course_month_selected_arr,
        course_year_selected_arr: course_year_selected_arr,
        term_id: term_id,
        current_id: current_id,
      },

      success: function (result) {
        $(".table-responsive.filter-disabled").html(result);
        if ($(".tablesorter").length > 0) {
          $(".course-list-table").tablesorter();
        }
        $("span.text-sessions").text("Days");
        //var course_rows = $(".table-responsive.filter-disabled tbody tr").length;
        //$("#course-filter-horizontal input.course-rows").val(course_rows);
      },
    });
  });
  $("#course-filter-horizontal .close").on("click", function () {
    $("#course-filter-horizontal input:radio").removeAttr("checked");
    $(
      "#course-filter-horizontal .tabs-filter-inner-wrapper.checked"
    ).removeClass("checked");
  });
  $("#course-filter-horizontal .tab-content .reset").on("click", function () {
    var parent_name = $(this).parent().attr("data-parent");
    $("#course-filter-horizontal input[name=" + parent_name + "]").prop(
      "checked",
      false
    );
    $("#course-filter-horizontal li input[class=" + parent_name + "]").prop(
      "checked",
      false
    );
    $(this).parents("li").find('input[type="radio"]').removeAttr("checked");
    $(this)
      .parents("li")
      .find(".tabs-filter-inner-wrapper.checked")
      .removeClass("checked");
    $("#course-filter-horizontal .tab-content input").trigger("change");
  });
  $("#course-filter-horizontal .tabs li .tabs-filter-inner-wrapper .reset").on(
    "click",
    function () {
      var parent_name = $(this).parent().attr("data-parent");
      $("#course-filter-horizontal input[name=" + parent_name + "]").prop(
        "checked",
        false
      );
      $(this).parents("li").find('input[type="radio"]').removeAttr("checked");
      $(this)
        .parents("li")
        .find(".tabs-filter-inner-wrapper.checked")
        .removeClass("checked");
      $("#course-filter-horizontal #tab-content1 input.reset-wrapper").trigger(
        "change"
      );
    }
  );
});
