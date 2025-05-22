function polarToCartesian(cx, cy, r, angle) {
    let rad = (angle-90) * Math.PI / 180.0;
    return {
        x: cx + (r * Math.cos(rad)),
        y: cy + (r * Math.sin(rad))
    };
}

function animateBMIMeterArc(targetPercent, color, bmi) {
    const meterArc = document.getElementById("bmi-arc");
    const meterValue = document.getElementById("bmi-meter-value");
    const minBMI = 10, maxBMI = 40;
    const startAngle = 135, endAngle = 405; // 270deg
    const r = 60, cx = 70, cy = 70;
    let currentPercent = 0;
    let currentBMI = minBMI;
    let steps = 30;
    let step = 0;
    let animation = setInterval(() => {
        step++;
        currentPercent = targetPercent * (step / steps);
        let angle = startAngle + currentPercent * (endAngle - startAngle);
        let start = polarToCartesian(cx, cy, r, startAngle);
        let end = polarToCartesian(cx, cy, r, angle);
        let arcSweep = angle - startAngle <= 180 ? 0 : 1;
        let d = [
            "M", start.x, start.y,
            "A", r, r, 0, arcSweep, 1, end.x, end.y
        ].join(" ");
        meterArc.setAttribute("d", d);
        meterArc.setAttribute("stroke", color);
        // Animate the number as well
        let shownBMI = (minBMI + (bmi - minBMI) * (step / steps)).toFixed(2);
        meterValue.textContent = shownBMI;
        if (step >= steps) {
            meterValue.textContent = bmi;
            clearInterval(animation);
        }
    }, 12);
}

// Final UI/UX refinements
function calculateBMI(event) {
    event.preventDefault();
    let height = parseFloat(document.getElementById("height").value);
    let weight = parseFloat(document.getElementById("weight").value);
    let result = document.getElementById("result");
    let message = document.getElementById("message");
    result.classList.remove("show-result");

    // BMI Meter elements
    const meterArc = document.getElementById("bmi-arc");
    const meterValue = document.getElementById("bmi-meter-value");

    if (meterArc) {
        meterArc.setAttribute("d", "");
        meterArc.setAttribute("stroke", "#00C9A7");
    }
    if (meterValue) meterValue.textContent = "";

    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
        message.textContent = "Please enter valid height and weight!";
        message.style.color = "#ff3b3b";
        message.style.fontSize = "2.1rem";
        message.style.fontWeight = "900";
        message.style.letterSpacing = "1px";
        result.innerHTML = "";
        if (meterArc) meterArc.setAttribute("d", "");
        if (meterValue) meterValue.textContent = "";
        // Scroll to message for accessibility
        message.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    let heightInMeters = height / 100;
    let bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    let category = "";
    let color = "";
    let tip = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "#ffc107";
        tip = "You are under the normal weight range. Consider a balanced diet and consult a healthcare provider.";
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal";
        color = "#00C9A7";
        tip = "Great job! Maintain your healthy lifestyle with regular activity and a balanced diet.";
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
        color = "#FFD700";
        tip = "You are above the normal weight range. Consider regular exercise and mindful eating.";
    } else {
        category = "Obese";
        color = "#dc3545";
        tip = "You are in the obese range. It's important to consult a healthcare provider for guidance.";
    }

    result.innerHTML = `
        <div style="font-size:1.3em;font-weight:600;">Your BMI: <strong style="color:${color};font-size:1.5em;">${bmi}</strong></div>
        <div style="margin-top:4px;">Category: <strong style="color:${color};">${category}</strong></div>
        <div style="margin-top:10px;font-size:1.05em;line-height:1.5;">${tip}</div>
    `;
    result.style.color = color;
    message.textContent = "";
    setTimeout(() => result.classList.add("show-result"), 100);
    result.setAttribute('tabindex', '0');
    result.focus();
    // Scroll to result for smooth UX
    result.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // --- BMI Meter Drawing with Animation ---
    if (meterArc && meterValue) {
        const minBMI = 10, maxBMI = 40;
        let safeBMI = Math.max(minBMI, Math.min(maxBMI, bmi));
        let percent = (safeBMI - minBMI) / (maxBMI - minBMI);
        animateBMIMeterArc(percent, color, bmi);
    }
}

function resetFields() {
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("result").innerHTML = "";
    document.getElementById("message").textContent = "";
    document.getElementById("result").classList.remove("show-result");
    document.getElementById('height').focus();
    // Reset BMI meter
    const meterArc = document.getElementById("bmi-arc");
    const meterValue = document.getElementById("bmi-meter-value");
    if (meterArc) meterArc.setAttribute("d", "");
    if (meterValue) meterValue.textContent = "";
}

// Accessibility: focus first input on load
window.onload = () => {
    document.getElementById('height').focus();
};