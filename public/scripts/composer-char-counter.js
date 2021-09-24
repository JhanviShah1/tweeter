$(document).ready(function () {
  // const $article = $("article footer .timeStamp");
  // const timeAgo = timeago.format(new Date());
  // $article.text(timeAgo);

  $("#tweet-text").on("input", function () {
    const input = $(this).val();
    const remaining = 140 - input.length;
    $(".counter").val(remaining);
    if (remaining < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "black");
    }
  });
});
