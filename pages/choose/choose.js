document.addEventListener('DOMContentLoaded', function () {
    function chooseDifficulty(diff) {
        // Save the chosen difficulty and go to rules page
        localStorage.setItem('chosenDifficulty', diff);
        // Optional: also store a timestamp if needed later
        window.location.href = '/pages/rules/rules.html';
    }

    var mediumBtn = document.getElementById('mediumBtn');
    var hardBtn = document.getElementById('hardBtn');

    if (mediumBtn) mediumBtn.addEventListener('click', function () { chooseDifficulty('medium'); });
    if (hardBtn) hardBtn.addEventListener('click', function () { chooseDifficulty('hard'); });
});
