    document.addEventListener("DOMContentLoaded", function () {
        // Array of bullet points
        var points = [
            "Fill the grid so that each row, each column, and each of the nine 3×3 subgrids contain all of the numbers from 1 to 9.",
            "Use the 'Check' button to verify your progress. You can only use 'Check' 3 times.",
            "The score is calculated based on the number of correct cells filled.",
            "The game has a time limit of 10 minutes. If the time runs out, the puzzle will be automatically submitted.",
            "Your goal is to complete the puzzle as quickly as possible with the highest score."
        ];

        // Get the ul element
        var ul = document.getElementById("bulletPoints");

        // Display each point without the typing effect
        for (var i = 0; i < points.length; i++) {
            var li = document.createElement("li");
            li.textContent = points[i];
            ul.appendChild(li);
        }

        // Show the neon button
        var neon = document.getElementById("neonButton");
        neon.style.display = "inline-block";

        // Read chosen difficulty from localStorage (set by choose page)
        var chosen = localStorage.getItem('chosenDifficulty') || 'medium';

        // Optionally display chosen difficulty to the user
        var disp = document.getElementById('chosenDiffDisplay');
        if (disp) {
            disp.style.display = 'block';
            disp.textContent = 'Selected difficulty: ' + (chosen === 'hard' ? 'Hard' : 'Medium');
            disp.style.color = '#fff';
        }

        // When user clicks START, navigate to the appropriate sudoku page
        neon.addEventListener('click', function (e) {
            e.preventDefault();
            if (chosen === 'hard') {
                window.location.href = '/pages/sudoku/sudoku2.html';
            } else {
                window.location.href = '/pages/sudoku/sudoku.html';
            }
        });
    });