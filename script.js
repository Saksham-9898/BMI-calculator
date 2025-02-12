function calculateBMI(event) {
    event.preventDefault(); 

    let height = document.getElementById("height").value;
    let weight = document.getElementById("weight").value;
    let result = document.getElementById("result");

    if (height === "" || weight === "" || height <= 0 || weight <= 0) {
        result.innerHTML = "Please enter valid height and weight!";
        result.style.color = "red";
        result.classList.remove("show-result", "pulse-effect");
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
    result.classList.add("show-result");
}