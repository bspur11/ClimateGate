async function getData() {
  const response = await fetch('ZonAnn.Ts+dSST.csv');
  const data = await response.text();


  const rows = data.split('\n').slice(1);
  rows.forEach(elt => {
    const columns = elt.split(',');
    const year = columns[0];
    const globTemp = columns[1];
    console.log(year, globTemp);
   
  })
}

getData();