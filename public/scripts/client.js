/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(() => {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const data = [
    {
      user: {
        name: "Newton",
        avatars: "https://i.imgur.com/73hZDYK.png",
        handle: "@SirIsaac",
      },
      content: {
        text: "If I have seen further it is by standing on the shoulders of giants",
      },
      created_at: 1461116232227,
    },
    {
      user: {
        name: "Descartes",
        avatars: "https://i.imgur.com/nlhLi3I.png",
        handle: "@rd",
      },
      content: {
        text: "Je pense , donc je suis",
      },
      created_at: 1461113959088,
    },
  ];
  const createTweetElement = function (tweet) {
    let $tweet = `
  <article class = "tweet">
          <header class="subheader">
            <div class="imgtext">
              <img src="${tweet.user.avatars}">
           <p> ${tweet.user.name} </p>
            </div> 
          <div>
          ${tweet.user.handle}
          </div>
        </header>
        <div class="content">${escape(tweet.content.text)}
        </div>
          <footer class="footer">
            <div class="timeStamp">
            ${timeago.format(tweet.created_at)}
            </div>
            <div>
              <i class="fa fa-flag"></i><i class="fa fa-retweet"></i> <i class="fa fa-heart"></i>
            </div>
          </footer>
        </article>
  `;
    return $tweet;
  };

  const renderTweets = function (tweets) {
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const formattedTweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $("#tweets-container").prepend(formattedTweet);
    }
  };
  //renderTweets(data);
  const handleError = function (error) {
    if (error === "empty") {
      $(".error-message").empty();
      $(".error-message")
        .append(
          '<p><i class="fas fa-exclamation-triangle"></i>Input cannot be empty<i class="fas fa-exclamation-triangle"></i></p>'
        )
        .slideDown(1000);
    } else if (error === "maxChar") {
      $(".error-message").empty();
      $(".error-message")
        .append(
          '<p><i class="fas fa-exclamation-triangle"></i>"Too long. Pls rspct our arbitary limit of 140 chars"<i class="fas fa-exclamation-triangle"></i></p>'
        )
        .slideDown(2000);
    }
  };
  const $form = $("#createTweetForm");
  $form.on("submit", function (event) {
    event.preventDefault();
    $(".error-message").hide();
    const input = $("#tweet-text").val();
    if (input.length <= 0) {
      handleError("empty");
      return
    }
    if (input.length > 140) {
      handleError("maxChar");
      return
    }
    const serializeData = $(this).serialize();
    $.ajax({
      method: "POST",
      url: "/tweets",
      data: serializeData,
    }).then(function(data){
      loadTweets();
      $("#tweet-text").val('');
      //$("#createTweetForm").empty();
      $(".counter").val(140);

    })
  });
  const loadTweets = function () {
    $.ajax({
      method: "GET",
      url: "/tweets",
      data: JSON,
    }).then(function (data) {
      $("#tweets-container").empty();
      renderTweets(data);
    });
  };
  loadTweets();
});
