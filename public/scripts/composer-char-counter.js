
$(document).ready(function() {
$("#btn").on('click',function(){
  //console.log(this);
});//button 
const $article = $('article footer .timeStamp')
const timeAgo = timeago.format(new Date());
$article.text(timeAgo);

$("#tweet-text").on('input',function(){
  const input = $(this).val()
  const remaining = 140-input.length;
  $(".counter").val(remaining);
  if (remaining<0) {
  $(".counter").css("color","red");
//alert("The text is too long")
}

})
});

