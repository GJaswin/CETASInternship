// Navbar
$("a[href='#student-count']").on("click", () => {
  $(".chart").removeClass("selection-border");
  $("#student-count").parent(".chart").addClass("selection-border");
  $(".menu-button").trigger("click");

});

$("a[href='#avg-scores']").on("click", () => {
  $(".chart").removeClass("selection-border");
  $("#avg-scores").addClass("selection-border");
  $(".menu-button").trigger("click");
});

$("a[href='#avg-by-year']").on("click", () => {
  $(".chart").removeClass("selection-border");
  $("#avg-by-year").parent(".chart").addClass("selection-border");
  $(".menu-button").trigger("click");
});

$("a[href='#perf']").on("click", () => {
  $(".chart").removeClass("selection-border");
  $("#perf").addClass("selection-border");
  $(".menu-button").trigger("click");
});

$(".menu-button").on("click", () => {
  $("#sidebar").toggle();
  $("main").toggleClass("main-offset");
  $(".navbar").toggleClass("main-offset");
})

// Student Count Chart
let studentCountCanvas = document.getElementById("student-count");

const studentCount = [
  { dept: "CSE", count: 60 },
  { dept: "EEE", count: 53 },
  { dept: "ECE", count: 68 },
  { dept: "MECH", count: 106 },
  { dept: "CIVIL", count: 99 },
]

const studentCountChart = new Chart(studentCountCanvas, {
  type: 'doughnut',
  data: {
    labels: studentCount.map(students => students.dept),
    datasets: [{
      label: 'Student Count',
      data: studentCount.map(students => students.count),
    }]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Student Count per Department'
      }
    },
  }
}
)


// Average Scores Chart
let avgScoresChart = document.getElementById("avg-scores");

let options = {
  chart: {
    type: 'bar',
    height: 300,
  },
  plotOptions: {
    bar: {
      distributed: true
    }
  },
  series: [{
    name: 'Average Score',
    data: [85, 78, 82, 74, 80]
  }],
  xaxis: {
    categories: studentCount.map(student => student.dept)
  },
  title: {
    text: 'Average Scores of Students by Department'
  }
};
let avgScores = new ApexCharts(avgScoresChart, options);
avgScores.render();

// Performance Chart
let avgByYearChart = document.getElementById("avg-by-year");

var avgByYear = new Chart(avgByYearChart, {
  type: 'line',
  data: {
    labels: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
    datasets: [
      {
        label: 'CSE',
        data: [95, 82, 85, 88],
      },
      {
        label: 'EEE',
        data: [90, 85, 79, 81],
      },
      {
        label: 'ECE',
        data: [96, 88, 80, 83],
      },
      {
        label: 'MECH',
        data: [87, 82, 76, 79],
      },
      {
        label: 'CIVIL',
        data: [91, 84, 77, 80],
      }
    ]
  },
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Average Scores of Students by Year of Study'
      }
    },
  }
});

// Performance Chart
let perfChart = document.getElementById("perf");

options = {
  chart: {
    type: 'radar',
    height: 400
  },
  fill: {
    opacity: 0.3,
  },
  series: [
    {
      name: "Average Marks",
      data: [100, 90, 80, 70, 60]
    }
  ],
  dataLabels: {
    enabled: true,
    background: {
      enabled: true,
      borderRadius: 2,
    }
  },
  labels: ["Language", "Programming", "Labs", "Projects", "Assignments"],
  yaxis: {
    show: false
  },
  title: {
    text: "Student Performance"
  }

};

let perf = new ApexCharts(perfChart, options);
perf.render();


// Data Table
$.getJSON("./students.json", (data) => {
  console.log(data);

  new DataTable('#student-details', {
    scrollX: true,
    data: data,
    columns: [
      { data: 'name' },
      { data: 'dept' },
      { data: 'year' },
      { data: 'cgpa' },
      { data: 'percentage' },
      {
        data: 'project',
        render: (progress) => {
          return `
          <p class="mb-0">${progress}</p> 
         <div class="progress rounded-5" role="progressbar" aria-label="project" aria-valuenow="${progress}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar bg-success rounded-5" style="width: ${progress}%"></div>
          </div>`;
        }


      },
      {
        data: 'attendance',
        render: (attendance) => {
          return `
          <p class="mb-0">${attendance}</p> 
         <div class="progress rounded-5" role="progressbar" aria-label="project" aria-valuenow="${attendance}" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar rounded-5" style="width: ${attendance}%"></div>
          </div>`;
        }

      }
    ],
    layout: {
      topEnd: {
        buttons: [
          {
            extend: 'copy',
            className: 'export-buttons' 
          },
          {
            extend: 'csv',
            className: 'export-buttons' 
          },
          {
            extend: 'excel',
            className: 'export-buttons' 
          },
          {
            extend: 'pdf',
            className: 'export-buttons' 
          },
          {
            extend: 'print',
            className: 'export-buttons' 
          }
        ],
        search: true
      }
    },

  });

});


