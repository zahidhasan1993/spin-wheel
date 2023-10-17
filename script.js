const wheel = document.getElementById("wheel");
const spinBtn = document.getElementById("spin-btn");
const finalValue = document.getElementById("final-value");


// Object that stores values of minimum and maximum angle for a value
let person1 = "";
let person2 = "";
let person3 = "";
let person4 = "";
let person5 = "";
let person6 = "";

const inputElements = [
  document.getElementById("name1"),
  document.getElementById("name2"),
  document.getElementById("name3"),
  document.getElementById("name4"),
  document.getElementById("name5"),
  document.getElementById("name6"),
];

inputElements.forEach((input, index) => {
  input.addEventListener("input", function (event) {
    switch (index) {
      case 0:
        person1 = event.target.value;
        console.log(person1);
        break;
      case 1:
        person2 = event.target.value;
        break;
      case 2:
        person3 = event.target.value;
        break;
      case 3:
        person4 = event.target.value;
        break;
      case 4:
        person5 = event.target.value;
        break;
      case 5:
        person6 = event.target.value;
        break;
    }
  });
});

let rotationValues = [];

//Size of each piece
const data = [16, 16, 16, 16, 16, 16];
//background color for each piece
var pieColors = [
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
  "#8b35bc",
  "#b163da",
];
//Create chart
let myChart = new Chart(wheel, {
  //Plugin for displaying text on pie chart
  plugins: [ChartDataLabels],
  //Chart Type Pie
  type: "pie",
  data: {
    //Labels(values which are to be displayed on chart)
    labels: ["Slot1", "Slot2", "Slot3", "Slot4", "Slot5", "Slot6"],
    //Settings for dataset/pie
    datasets: [
      {
        backgroundColor: pieColors,
        data: data,
      },
    ],
  },
  options: {
    //Responsive chart
    responsive: true,
    animation: { duration: 0 },
    plugins: {
      //hide tooltip and legend
      tooltip: false,
      legend: {
        display: false,
      },
      //display labels inside pie chart
      datalabels: {
        color: "#ffffff",
        formatter: (_, context) => context.chart.data.labels[context.dataIndex],
        font: { size: 24 },
      },
    },
  },
});
//display value based on the randomAngle
const valueGenerator = (angleValue) => {
  for (let i of rotationValues) {
    //if the angleValue is between min and max then display it
    if (angleValue >= i.minDegree && angleValue <= i.maxDegree) {
      Swal.fire(`The Winnes is : ${i.value}`)

      finalValue.innerHTML = `<p>Winner is: ${i.value}</p>`;
      spinBtn.disabled = false;
      break;
    }
  }
};

//Spinner count
let count = 0;
//100 rotations for animation and last rotation for result
let resultValue = 101;
//Start spinning
spinBtn.addEventListener("click", () => {
   rotationValues = [
    { minDegree: 0, maxDegree: 30, value: person2 },
    { minDegree: 31, maxDegree: 90, value: person1 },
    { minDegree: 91, maxDegree: 150, value: person6 },
    { minDegree: 151, maxDegree: 210, value: person5 },
    { minDegree: 211, maxDegree: 270, value: person4 },
    { minDegree: 271, maxDegree: 330, value: person3 },
    { minDegree: 331, maxDegree: 360, value: person2 },
  ];
  spinBtn.disabled = true;
  console.log(rotationValues);
  //Empty final value
  finalValue.innerHTML = `<p>Good Luck!</p>`;
  //Generate random degrees to stop at
  let randomDegree = Math.floor(Math.random() * (355 - 0 + 1) + 0);
  //Interval for rotation animation
  let rotationInterval = window.setInterval(() => {
    //Set rotation for piechart
    /*
    Initially to make the piechart rotate faster we set resultValue to 101 so it rotates 101 degrees at a time and this reduces by 1 with every count. Eventually on last rotation we rotate by 1 degree at a time.
    */
    myChart.options.rotation = myChart.options.rotation + resultValue;
    //Update chart with new value;
    myChart.update();
    //If rotation>360 reset it back to 0
    if (myChart.options.rotation >= 360) {
      count += 1;
      resultValue -= 5;
      myChart.options.rotation = 0;
    } else if (count > 15 && myChart.options.rotation == randomDegree) {
      valueGenerator(randomDegree);
      clearInterval(rotationInterval);
      count = 0;
      resultValue = 101;
    }
  }, 10);
});
