chartIt();

async function chartIt() {
  const data =await getData();
  const ctx = document.getElementById('chart').getContext('2d');

  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.xs,
      datasets: [{
        label: 'Combined Land-Surface Air and Sea-Surface Water Temperature in C°',
        data: data.ys,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false,

          ticks: {
            // Include a dollar sign in the ticks
            callback: function(value, index, ticks) {
                return  value + 'C°';
            }
          }
        }
      }
    }
  });
}

async function getData() {

  const xs = [];
  const ys = [];

  const response = await fetch('ZonAnn.Ts+dSST.csv');
  const data = await response.text();


  const rows = data.split('\n').slice(1);
  rows.forEach(elt => {
    const columns = elt.split(',');
    const year = columns[0];
    xs.push(year);
    const globTemp = columns[1];
    ys.push(parseFloat(globTemp) + 14);
    console.log(year, globTemp);
  });
  return {xs, ys };
}

;