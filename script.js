// Get the buttons from the HTML
const undoBtn = document.getElementById('undo-btn');
const redoBtn = document.getElementById('redo-btn');
const resetBtn = document.getElementById('reset-btn');

// Arrays to keep track of our circles
let circlesOnScreen = [];
let undoneCircles = [];

// --- Main Functions ---

// 1. Function to create a new circle
document.body.addEventListener('click', (event) => {
    // Ignore clicks on the buttons
    if (event.target.tagName === 'BUTTON') {
        return;
    }

    // Create a new div element for the circle
    const circle = document.createElement('div');
    circle.className = 'circle';

    // Position the circle centered on the click
    circle.style.left = `${event.clientX - 25}px`;
    circle.style.top = `${event.clientY - 25}px`;

    // Give it a random color
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
    circle.style.backgroundColor = randomColor;

    // Add the circle to the page and our list
    document.body.appendChild(circle);
    circlesOnScreen.push(circle);

    [cite_start]// Clear the redo history, as a new action has been taken [cite: 23]
    undoneCircles = [];
});

// 2. Function for the "Undo" button
undoBtn.addEventListener('click', () => {
    // Make sure there's a circle to remove
    if (circlesOnScreen.length > 0) {
        // Get the last circle that was added
        const lastCircle = circlesOnScreen.pop();

        // Remove it from the screen
        lastCircle.remove();

        // Add it to our "undone" list in case we want to redo it
        undoneCircles.push(lastCircle);
    }
});

// 3. Function for the "Redo" button
redoBtn.addEventListener('click', () => {
    // Make sure there's a circle in our "undone" list
    if (undoneCircles.length > 0) {
        // Get the last circle that was undone
        const circleToRedo = undoneCircles.pop();

        // Add it back to the screen and our main list
        document.body.appendChild(circleToRedo);
        circlesOnScreen.push(circleToRedo);
    }
});

// 4. Function for the "Reset" button
resetBtn.addEventListener('click', () => {
    // Remove every circle from the screen
    circlesOnScreen.forEach(circle => circle.remove());

    [cite_start]// Clear both lists to reset the history [cite: 17]
    circlesOnScreen = [];
    undoneCircles = [];
});
