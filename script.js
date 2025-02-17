function calculateBMI(event) {
    event.preventDefault(); 

    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let result = document.getElementById("result");
    let message = document.getElementById("message");

    if (height === "" || weight === "" || height <= 0 || weight <= 0) {
        message.textContent = "Please enter valid height and weight!";
        message.style.color = "red";
        result.innerHTML = "";  // Clear any previous results
        return;
    }

    let heightInMeters = height / 100;
    let bmi = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    let category = "";
    let color = "";

    if (bmi < 18.5) {
        category = "Underweight";
        color = "#ffc107"; 
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = "Normal Weight";
        color = "#28a745"; 
    } else if (bmi >= 25 && bmi < 29.9) {
        category = "Overweight";
        color = "#ff9800";
    } else {
        category = "Obese";
        color = "#dc3545";
    }

    result.innerHTML = `Your BMI: <strong class="pulse-effect">${bmi}</strong> <br> Category: <strong>${category}</strong>`;
    result.style.color = color;
    message.textContent = ""; // Clear any error message
    result.classList.add("show-result");
}

function resetFields() {
    document.getElementById("height").value = "";  // Reset height input
    document.getElementById("weight").value = "";  // Reset weight input
    document.getElementById("result").innerHTML = "";  // Clear BMI result
    document.getElementById("message").textContent = "";  // Clear error message
}