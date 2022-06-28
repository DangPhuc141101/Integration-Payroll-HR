const labels = amountByDepartment.map(e => e['department']);
console.log(amountByDepartment)
  const data = {
    labels: labels,
    datasets: [{
      label: 'Amount by Department',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: amountByDepartment.map(e => e['amount']),
    }]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
  console.log(earningByShareholder)
  const labelsEarning = earningByShareholder.map(e => e['shareholder']);
  const dataEarning = {
    labels: labelsEarning,
    datasets: [{
      label: 'Earning by shareholder',
      backgroundColor: 'rgb(140, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: earningByShareholder.map(e => e['earning']),
    }]
  };

  const configEarning = {
    type: 'pie',
    data: dataEarning,
    options: {}
  };

  const myChartEarning = new Chart(
    document.getElementById('myChart2'),
    configEarning
  );


  const labelVacation = vacationDayByShareholder.map(e => e['shareholder']);
  const dataVacation = {
    labels: labelVacation,
    datasets: [{
      label: 'Vacation by shareholder',
      backgroundColor: 'rgb(140, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: vacationDayByShareholder.map(e => e['vacation']),
    }]
  };

  const configVacation = {
    type: 'pie',
    data: dataVacation,
    options: {}
  };

  const myChartVacation = new Chart(
    document.getElementById('myChart3'),
    configVacation
  );