let sequence = [];
let user = [];
let colors = ["red", "green", "blue", "yellow"];
let ready = false;

$(document).ready(function () {
  $("#startBtn").click(function () {
    sequence = [];
    user = [];
    next();
  });

  $(".color").click(function () {
    if (!ready) return;
    let color = $(this).attr("id");
    user.push(color);
    blink(color);

    let index = user.length - 1;
    if (user[index] !== sequence[index]) {
      alert("Źle!");
      sequence = [];
      user = [];
      return;
    }

    if (user.length === sequence.length) {
      user = [];
      setTimeout(next, 700);
    }
  });
});

function next() {
  ready = false;
  let rand = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(rand);

  let i = 0;
  let interval = setInterval(function () {
    blink(sequence[i]);
    i++;
    if (i >= sequence.length) {
      clearInterval(interval);
      ready = true;
    }
  }, 500);
}

function blink(color) {
  $("#" + color).fadeOut(100).fadeIn(100);
}
