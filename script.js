// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');

// Get references to all sliders and value displays
const drillingSlider = document.getElementById('drilling-slider');
const constructionSlider = document.getElementById('construction-slider');
const transportSlider = document.getElementById('transport-slider');
const filtersSlider = document.getElementById('filters-slider');
const educationSlider = document.getElementById('education-slider');

const drillingValue = document.getElementById('drilling-value');
const constructionValue = document.getElementById('construction-value');
const transportValue = document.getElementById('transport-value');
const filtersValue = document.getElementById('filters-value');
const educationValue = document.getElementById('education-value');

const pointsValue = document.getElementById('points-value');

// Get the submit button
const submitBtn = document.getElementById('submit-btn');

// Get overlay and result message elements
const resultOverlay = document.getElementById('result-overlay');
const resultMessage = document.getElementById('result-message');
const replayBtn = document.getElementById('replay-btn');
const nextBtn = document.getElementById('next-btn');

// The total points the player can distribute
const MAX_POINTS = 100;

// This function updates the points available and slider values
function updatePoints(changedSlider) {
    // Get the current values of all sliders
    let drilling = parseInt(drillingSlider.value);
    let construction = parseInt(constructionSlider.value);
    let transport = parseInt(transportSlider.value);
    let filters = parseInt(filtersSlider.value);
    let education = parseInt(educationSlider.value);

    // Calculate the total points used
    let totalUsed = drilling + construction + transport + filters + education;

    // If the total is more than allowed, adjust the changed slider
    if (totalUsed > MAX_POINTS) {
        // Find how much over the limit we are
        let over = totalUsed - MAX_POINTS;
        // Reduce the changed slider by the extra amount
        changedSlider.value = parseInt(changedSlider.value) - over;
        // Update the value after adjustment
        drilling = parseInt(drillingSlider.value);
        construction = parseInt(constructionSlider.value);
        transport = parseInt(transportSlider.value);
        filters = parseInt(filtersSlider.value);
        education = parseInt(educationSlider.value);
        totalUsed = drilling + construction + transport + filters + education;
    }

    // Update the value displays next to each slider
    drillingValue.textContent = drilling;
    constructionValue.textContent = construction;
    transportValue.textContent = transport;
    filtersValue.textContent = filters;
    educationValue.textContent = education;

    // Update the points available display
    pointsValue.textContent = MAX_POINTS - totalUsed;

    // Enable the submit button only if all points are used
    if ((MAX_POINTS - totalUsed) === 0) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Add event listeners to each slider
// When a slider is moved, call updatePoints and pass the slider

drillingSlider.addEventListener('input', function() {
    updatePoints(drillingSlider);
});
constructionSlider.addEventListener('input', function() {
    updatePoints(constructionSlider);
});
transportSlider.addEventListener('input', function() {
    updatePoints(transportSlider);
});
filtersSlider.addEventListener('input', function() {
    updatePoints(filtersSlider);
});
educationSlider.addEventListener('input', function() {
    updatePoints(educationSlider);
});

// Initialize the display when the page loads
updatePoints(drillingSlider);

// Array of scenario descriptions, one for each level
const scenarios = [
    "Desert village with salty, drying wells and shrinking underground water",
    "Appalachian town where old pipes contaminate tap water with lead",
    "Mountain village relying on fog nets, but droughts leave them with nothing",
    "Monsoon village facing floods in one season, dry wells the next",
    "Lakeside village using polluted water shared with animals",
    "Northern village where glacier-fed springs are flooding or drying unpredictably",
    "Jungle village with streams poisoned by nearby gold mining",
    "Steppe village depending on a failing, sand-filled irrigation canal",
    "Island village where hurricanes ruin stored rainwater supplies",
    "Arctic hamlet losing traditional water sources due to melting permafrost"
];

let currentLevel = 0; // Start at level 0 (Level 1 for user)

// Get the scenario and level indicator divs
const scenarioDiv = document.getElementById("scenario");
const levelIndicator = document.getElementById("level-indicator");

// Function to update the scenario and level indicator
function updateScenario() {
    // Show the level number (add 1 because array is 0-based)
    levelIndicator.textContent = `Level ${currentLevel + 1}`;
    // Show the scenario for the current level, always with "Scenario:" in front
    scenarioDiv.textContent = `Scenario: ${scenarios[currentLevel]}`;
}

// Show the scenario and level when the website loads
updateScenario();

// Function to pick a random scenario and show it on the page
function showRandomScenario() {
    // Pick a random index from the scenarios array
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    // Get the scenario text
    const scenarioText = scenarios[randomIndex];
    // Find the scenario div and set its text, always with "Scenario:" in front
    const scenarioDiv = document.getElementById('scenario');
    scenarioDiv.innerHTML = `<strong>Scenario:</strong> ${scenarioText}`;
}

// Show a random scenario when the page loads
showRandomScenario();

// List of hints to help players when they lose
const hints = [
    "Hint: Try spreading your points more evenly across all projects.",
    "Hint: Some villages may need more points in Drilling or Filters.",
    "Hint: Education can be important for long-term clean water.",
    "Hint: Transport is needed if the water source is far away.",
    "Hint: Think about what the village's main problem might be."
];

// Function to show simple fireworks when the player wins
function showFireworks() {
    // Get the container for fireworks
    const container = document.getElementById('fireworks-container');
    // Colors for the fireworks
    const colors = ['#FFC907', '#2E9DF7', '#4FCB53', '#FF902A', '#F5402C', '#8BD1CB'];
    // Get the window size
    const width = window.innerWidth;
    const height = window.innerHeight;
    // Create 12 fireworks
    for (let i = 0; i < 12; i++) {
        // Create a div for each firework
        const firework = document.createElement('div');
        firework.className = 'firework';
        // Random size and color
        const size = Math.random() * 24 + 16;
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        // Random start position near the center
        const startX = width / 2 + (Math.random() - 0.5) * 80;
        const startY = height / 2 + (Math.random() - 0.5) * 80;
        firework.style.left = `${startX}px`;
        firework.style.top = `${startY}px`;
        // Animate to a random direction
        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 180 + 80;
        const endX = startX + Math.cos(angle) * distance;
        const endY = startY + Math.sin(angle) * distance;
        // Animate with transition
        firework.style.transition = 'transform 1s ease-out, opacity 1s';
        // Add to the container
        container.appendChild(firework);
        // Use setTimeout to trigger the animation
        setTimeout(() => {
            firework.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
            firework.style.opacity = '0';
        }, 50);
        // Remove the firework after animation
        setTimeout(() => {
            firework.remove();
        }, 1200);
    }
}

// Function to show simple water droplets falling from the top
function showWaterDroplets() {
    // Get the container for fireworks (reuse for droplets)
    const container = document.getElementById('fireworks-container');
    // Number of droplets
    const dropletCount = 18;
    for (let i = 0; i < dropletCount; i++) {
        // Create a div for each droplet
        const droplet = document.createElement('div');
        droplet.className = 'water-droplet';
        // Random horizontal position
        const left = Math.random() * 95; // percent
        droplet.style.left = `${left}vw`;
        droplet.style.top = `-40px`;
        // Random delay and duration
        const delay = Math.random() * 0.7;
        const duration = 1.1 + Math.random() * 0.7;
        droplet.style.animation = `fall-droplet ${duration}s ${delay}s linear forwards`;
        // Add to the container
        container.appendChild(droplet);
        // Remove after animation
        setTimeout(() => {
            droplet.remove();
        }, (delay + duration) * 1000 + 100);
    }
}

// When the player clicks Submit Plan
submitBtn.addEventListener('click', function() {
    // For now, randomly decide if the plan is correct or not
    // (You can add your own logic here later)
    const isCorrect = Math.random() < 0.5;
    if (isCorrect) {
        resultMessage.textContent = "Great job! You distributed the water correctly!";
        showFireworks(); // Show fireworks if correct
        showWaterDroplets(); // Show water droplets if correct
        // Remove any previous hint
        if (document.getElementById('hint-message')) {
            document.getElementById('hint-message').remove();
        }
    } else {
        resultMessage.textContent = "Oops! The water wasn't distributed correctly. Try again!";
        // Pick a random hint
        const hintText = hints[Math.floor(Math.random() * hints.length)];
        // Check if a hint already exists and remove it
        if (document.getElementById('hint-message')) {
            document.getElementById('hint-message').remove();
        }
        // Create a new hint element
        const hintElem = document.createElement('div');
        hintElem.id = 'hint-message';
        hintElem.textContent = hintText;
        hintElem.style.marginTop = '12px';
        hintElem.style.color = '#F5402C';
        hintElem.style.fontSize = '1.1em';
        hintElem.style.fontWeight = 'bold';
        // Add the hint below the result message
        resultMessage.parentNode.insertBefore(hintElem, resultMessage.nextSibling);
    }
    // Show the overlay
    resultOverlay.style.display = 'flex';
});

// When the player clicks Replay Level
replayBtn.addEventListener('click', function() {
    // Reset all sliders to 0
    drillingSlider.value = 0;
    constructionSlider.value = 0;
    transportSlider.value = 0;
    filtersSlider.value = 0;
    educationSlider.value = 0;
    // Update the display
    updatePoints(drillingSlider);
    // Hide the overlay
    resultOverlay.style.display = 'none';
    // Keep the same scenario and level
    updateScenario();
});

// When the player clicks Go to Next Level
nextBtn.addEventListener('click', function() {
    // Move to the next level if there is one
    if (currentLevel < scenarios.length - 1) {
        currentLevel++;
        updateScenario();
        // Hide the overlay and reset any other game state as needed
        resultOverlay.style.display = "none";
        // Reset sliders for new level
        drillingSlider.value = 0;
        constructionSlider.value = 0;
        transportSlider.value = 0;
        filtersSlider.value = 0;
        educationSlider.value = 0;
        updatePoints(drillingSlider);
    } else {
        // If no more levels, show only the congratulations overlay
        document.getElementById('congrats-overlay').style.display = "flex";
        resultOverlay.style.display = "none";
    }
});

// Wait until the DOM is fully loaded before running menu logic
document.addEventListener('DOMContentLoaded', function() {
    // Hide the game UI at first (for the start menu)
    document.querySelector('h1:not(#menu-title)').style.display = 'none';
    document.querySelector('.instructions').style.display = 'none';
    document.getElementById('level-indicator').style.display = 'none';
    document.getElementById('scenario').style.display = 'none';
    document.getElementById('points-available').style.display = 'none';
    document.getElementById('sliders-section').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';

    // Make sure the tutorial overlay is hidden at the start
    document.getElementById('tutorial-overlay').style.display = 'none';

    // Function to show the game UI
    function showGameUI() {
        document.querySelector('h1:not(#menu-title)').style.display = '';
        document.querySelector('.instructions').style.display = '';
        document.getElementById('level-indicator').style.display = '';
        document.getElementById('scenario').style.display = '';
        document.getElementById('points-available').style.display = '';
        document.getElementById('sliders-section').style.display = '';
        document.getElementById('submit-btn').style.display = '';
    }

    // Hide both menu and menu h1 when starting or tutorial
    function hideMenu() {
        document.getElementById('start-menu').style.display = 'none';
        document.getElementById('menu-title').style.display = 'none';
    }

    // Start button: hide menu, show game
    document.getElementById('start-btn').addEventListener('click', function() {
        hideMenu();
        showGameUI();
    });

    // Tutorial steps with target selectors and position info
    const tutorialSteps = [
        {
            text: "Welcome to the Charity Water Game!<br><br>You'll learn how to help a village get clean water.",
            target: null
        },
        {
            text: "At the top, you'll see instructions for each round.",
            target: '.instructions'
        },
        {
            text: "Below, you'll see a yellow box. This is the <b>scenario</b> describing the village's water problem for this level.",
            target: '#scenario'
        },
        {
            text: "You have <b>100 points</b> to distribute using the sliders.",
            target: '#points-available'
        },
        {
            text: "<b>Drilling</b>: Finding and accessing water underground.",
            target: '#drilling-slider'
        },
        {
            text: "<b>Construction</b>: Building related infrastructure (wells, tanks, pipes, latrines).",
            target: '#construction-slider'
        },
        {
            text: "<b>Transport</b>: Moving water or materials across terrain.",
            target: '#transport-slider'
        },
        {
            text: "<b>Filters</b>: Making water safe to drink.",
            target: '#filters-slider'
        },
        {
            text: "<b>Education</b>: Teaching hygiene, maintenance, and conservation.",
            target: '#education-slider'
        },
        {
            text: "Try to use all your points wisely! When you're ready, click Start to play.",
            target: '#submit-btn'
        }
    ];
    let tutorialIndex = 0;

    // Helper function to position the tutorial box near a target element
    function positionTutorialBox(targetSelector) {
        const tutorialBox = document.getElementById('tutorial-box');
        // Reset to default
        tutorialBox.style.position = '';
        tutorialBox.style.left = '';
        tutorialBox.style.top = '';
        tutorialBox.style.transform = '';
        tutorialBox.style.margin = '80px auto 0 auto';
        tutorialBox.style.maxWidth = '480px';
        tutorialBox.style.width = '';
        tutorialBox.style.background = '#fff';

        // Remove highlight from all previously highlighted elements
        document.querySelectorAll('.tutorial-highlight').forEach(function(el) {
            el.classList.remove('tutorial-highlight');
        });

        // Remove highlight from all slider labels
        document.querySelectorAll('.slider-container label').forEach(function(label) {
            label.classList.remove('tutorial-highlight');
        });

        if (!targetSelector) {
            // Centered for the first step
            tutorialBox.style.position = '';
            tutorialBox.style.margin = '80px auto 0 auto';
            tutorialBox.style.left = '';
            tutorialBox.style.top = '';
            tutorialBox.style.transform = '';
            return;
        }

        // Try to find the target element
        const target = document.querySelector(targetSelector);
        if (target) {
            // Highlight the target element
            target.classList.add('tutorial-highlight');

            // If the target is a slider, also highlight its label
            if (
                targetSelector === '#drilling-slider' ||
                targetSelector === '#construction-slider' ||
                targetSelector === '#transport-slider' ||
                targetSelector === '#filters-slider' ||
                targetSelector === '#education-slider'
            ) {
                // Find the label for this slider in the same container
                const container = target.closest('.slider-container');
                if (container) {
                    const label = container.querySelector('label');
                    if (label) {
                        label.classList.add('tutorial-highlight');
                    }
                }
            }

            // Get the position of the target
            const rect = target.getBoundingClientRect();
            tutorialBox.style.position = 'fixed';
            tutorialBox.style.background = '#fffbe7';
            tutorialBox.style.maxWidth = '340px';
            tutorialBox.style.width = 'auto';
            tutorialBox.style.margin = '0';

            // Place the tutorial box near the target (to the right or below)
            let boxLeft = rect.right + 24;
            let boxTop = rect.top;

            // If not enough space on the right, place below
            if (boxLeft + 340 > window.innerWidth) {
                boxLeft = rect.left;
                boxTop = rect.bottom + 18;
            }
            // If not enough space below, place above
            if (boxTop + 180 > window.innerHeight) {
                boxTop = rect.top - 160;
            }

            tutorialBox.style.left = boxLeft + 'px';
            tutorialBox.style.top = boxTop + 'px';
            tutorialBox.style.transform = 'translateX(0)';
        }
    }

    // Add a simple highlight style for tutorial
    const style = document.createElement('style');
    style.innerHTML = `
        .tutorial-highlight {
            box-shadow: 0 0 0 4px #2E9DF7AA, 0 0 16px 8px #FFC90766 !important;
            z-index: 700 !important;
            position: relative !important;
            border-radius: 10px !important;
            transition: box-shadow 0.2s;
        }
    `;
    document.head.appendChild(style);

    // Show the game UI when tutorial starts, and overlay the tutorial
    document.getElementById('tutorial-btn').addEventListener('click', function() {
        hideMenu();
        // Show the game UI so the tutorial overlays it
        document.querySelector('h1:not(#menu-title)').style.display = '';
        document.querySelector('.instructions').style.display = '';
        document.getElementById('level-indicator').style.display = '';
        document.getElementById('scenario').style.display = '';
        document.getElementById('points-available').style.display = '';
        document.getElementById('sliders-section').style.display = '';
        document.getElementById('submit-btn').style.display = '';
        document.getElementById('tutorial-overlay').style.display = 'flex';
        tutorialIndex = 0;
        document.getElementById('tutorial-box').innerHTML = tutorialSteps[tutorialIndex].text;
        positionTutorialBox(tutorialSteps[tutorialIndex].target);
    });

    document.getElementById('tutorial-overlay').addEventListener('click', function() {
        // Remove highlight from all elements
        document.querySelectorAll('.tutorial-highlight').forEach(function(el) {
            el.classList.remove('tutorial-highlight');
        });

        tutorialIndex++;
        if (tutorialIndex < tutorialSteps.length) {
            document.getElementById('tutorial-box').innerHTML = tutorialSteps[tutorialIndex].text;
            positionTutorialBox(tutorialSteps[tutorialIndex].target);
        } else {
            document.getElementById('tutorial-overlay').style.display = 'none';
            // Remove any highlight
            document.querySelectorAll('.tutorial-highlight').forEach(function(el) {
                el.classList.remove('tutorial-highlight');
            });
            // Show the start menu again after tutorial finishes
            document.getElementById('start-menu').style.display = 'flex';
            document.getElementById('menu-title').style.display = '';
            // Hide the game UI again
            document.querySelector('h1:not(#menu-title)').style.display = 'none';
            document.querySelector('.instructions').style.display = 'none';
            document.getElementById('level-indicator').style.display = 'none';
            document.getElementById('scenario').style.display = 'none';
            document.getElementById('points-available').style.display = 'none';
            document.getElementById('sliders-section').style.display = 'none';
            document.getElementById('submit-btn').style.display = 'none';
        }
    });

    const submitBtn = document.getElementById('submit-btn');
    const submitNote = document.getElementById('submit-note');

    submitBtn.addEventListener('mouseenter', function() {
        // Only show the note if the button is disabled
        if (submitBtn.disabled) {
            submitNote.style.display = 'block';
        }
    });

    submitBtn.addEventListener('mouseleave', function() {
        submitNote.style.display = 'none';
    });

    const congratsOverlay = document.getElementById('congrats-overlay');
    const resetBtn = document.getElementById('reset-btn');
    const menuBtn = document.getElementById('menu-btn');

    // Reset button: restart the game from level 1
    resetBtn.addEventListener('click', function() {
        congratsOverlay.style.display = 'none';
        currentLevel = 0;
        updateScenario();
        // Reset sliders
        drillingSlider.value = 0;
        constructionSlider.value = 0;
        transportSlider.value = 0;
        filtersSlider.value = 0;
        educationSlider.value = 0;
        updatePoints(drillingSlider);
    });

    // Menu button: show the start menu and hide the game UI
    menuBtn.addEventListener('click', function() {
        congratsOverlay.style.display = 'none';
        document.getElementById('start-menu').style.display = 'flex';
        document.getElementById('menu-title').style.display = '';
        // Hide the game UI
        document.querySelector('h1:not(#menu-title)').style.display = 'none';
        document.querySelector('.instructions').style.display = 'none';
        document.getElementById('level-indicator').style.display = 'none';
        document.getElementById('scenario').style.display = 'none';
        document.getElementById('points-available').style.display = 'none';
        document.getElementById('sliders-section').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'none';
    });

    // Hide the result overlay if the player finished all levels
    const resultOverlay = document.getElementById('result-overlay');
    if (congratsOverlay && resultOverlay) {
        congratsOverlay.addEventListener('show', function() {
            resultOverlay.style.display = 'none';
        });
    }
});

// Show tutorial overlay or section when the page loads
document.getElementById('tutorial-overlay').style.display = 'flex';

// Close tutorial button
document.getElementById('close-tutorial').addEventListener('click', function() {
    document.getElementById('tutorial-overlay').style.display = 'none';
});
