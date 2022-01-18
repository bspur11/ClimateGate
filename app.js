chartIt();

async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById('chart').getContext('2d');

  const chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.xs,
      datasets: [{
          label: 'Total Ink Usage in g.',
          data: data.ys,
          backgroundColor: 'rgb(79, 108, 204)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },

        {
          label: 'Magenta',
          data: data.ms,
          backgroundColor: 'magenta',
          borderColor: 'black',
          borderWidth: 1
        },

       { 
        label: 'Cyan', 
        data: data.cs,
        backgroundColor: 'cyan',
        borderColor: 'black',
        borderWidth: 1

        },
        {
          label: 'Yellow',
          data: data.yl,
          backgroundColor: 'darkorange',
          borderWidth: 'black',
          borderWidth: 1
        },
        {
          label: 'Black',
        data: data.bl,
        backgroundColor: 'black',
        borderWidth: 'black',
        borderWidth: 1
      
      }

        
      ]

    },
    options: {
      scales: {
        y: {
          beginAtZero: true,

          ticks: {
            // Include a C° sign in the ticks
            callback: function (value, index, ticks) {
              return value + 'mg';
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
  const ms = [];
  const cs = [];
  const yl = [];
  const bl = [];
  console.log(xs, ys, ms, cs, yl, bl);


  const response = await fetch('test.csv');
  const data = await response.text();


  const rows = data.split('\n').splice(0);
  rows.forEach(elt => {
    const columns = elt.split(',');
    const jobNum = columns[0];
    const inkUse = columns[30];
    const magInk = columns[32];
    const cyanInk = columns[33];
    const yellInk = columns[34];
    const blkInk =columns[35];
    // console.log(cyanInk);
    // console.log(inkUse);
    xs.push(parseFloat(jobNum));
    // const inkUse = columns[31];
    // ys.push(parseFloat(inkUse) + 14);
    ys.push(parseFloat(inkUse));
    ms.push(parseFloat(magInk));
    cs.push(parseFloat(cyanInk));
    yl.push(parseFloat(yellInk));
    bl.push(parseFloat(blkInk));


  });
  return {
    xs,
    ys,
    ms,
    cs,
    yl,
    bl
  };

}


;