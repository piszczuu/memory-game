let sequence = [];
let user = [];
let colors = ["red", "green", "blue", "yellow"];
let ready = false;
let clickCount = 0;
let round = 0;
let modal, modalStats; // Deklaracje zmiennych modalnych

$(document).ready(function () {
  // Inicjalizacja elementów modalnych
  modal = $("#modal");
  modalStats = $("#modalStats");

  // Start gry
  $("#startBtn").click(function () {
    $("#startBtn").addClass("activeBtn");
    sequence = [];
    user = [];
    resetStats();
    next();
    $("#overlay").fadeIn();
    $("#gameContainer").css("z-index", 1001);
  });

  // Kliknięcie w kolor
  $(".color").click(function () {
    if (!ready) return;
    let color = $(this).attr("id");
    user.push(color);
    blink(color);
    clickCount++;
    updateClickCount();

    let index = user.length - 1;
    if (user[index] !== sequence[index]) {
      resetGame();
      return;
    }

    if (user.length === sequence.length) {
      user = [];
      round++;
      updateRound();
      let wait = 700 * Math.pow(0.8, round);
      setTimeout(next, wait);
    }
  });

  // Zamknięcie overlaya
  $("#overlay").click(function () {
    closeOverlay();
  });

  // Obsługa przycisku zamykania modala
  $("#modalCloseBtn").click(function () {
    hideModal();
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
  $("#" + color)
    .fadeOut(100)
    .fadeIn(100);
}

function updateClickCount() {
  $("#clickCount").text("Liczba kliknięć: " + clickCount);
}

function updateRound() {
  $("#roundCount").text("Tura: " + round);
}

function resetStats() {
  clickCount = 0;
  round = 0;
  updateClickCount();
  updateRound();
}

let bestSequence = 0;  // Dodaj na początku, obok innych zmiennych

// W funkcji resetGame() zaktualizuj najlepszy wynik:
function resetGame() {
  if (sequence.length > bestSequence) {
    bestSequence = sequence.length;
  }
  sequence = [];
  user = [];
  showModal();
  resetStats();
  closeOverlay();
}

// W showModal() wyświetl bestSequence zamiast sequence.length - 1:
function showModal() {
  $('body').addClass('modal-active');
  modalStats.html(`
    <p>Runda: ${round}</p>
    <p>Kliknięcia: ${clickCount}</p>
    <p>Najlepsza sekwencja: ${bestSequence}</p>  <!-- Tutaj zmiana -->
  `);
  modal.fadeIn(0).addClass("active");
}
function hideModal() {
  $("body").removeClass("modal-active");
  modal.removeClass("active");
  setTimeout(() => modal.fadeOut(0), 500);
}

function closeOverlay() {
  $("#startBtn").removeClass("activeBtn");
  $("#overlay").fadeOut();
  $("#gameContainer").css("z-index", "auto");
}
