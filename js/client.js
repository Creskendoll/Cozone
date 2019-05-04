/*
  getLighting("2019-01-01", "2019-02-01", (response) => {
    console.log(response.data);
  }, (response) => {
    console.log(response);
  });
*/

function getLighting(start, end, _success, _error) {
  // Example Date: 2018-05-25
  const URL = "http://ee.inavitas.io/api/historian?startDate=" + start + "%2012%3A00%3A00&endDate=" + end + "%2012%3A00%3A00&type=lighting"
  $.ajax({
    url: URL,
    success: (result) => {
      _success(result);
    },
    error: (result) => {
      _error(result);
    }
  });
}

function getAC(start, end, _success, _error) {
  // Example Date: 2018-05-25
  const URL = "http://ee.inavitas.io/api/historian?startDate=" + start + "%2012%3A00%3A00&endDate=" + end + "%2012%3A00%3A00&type=hvac"
  $.ajax({
    url: URL,
    success: (result) => {
      _success(result);
    },
    error: (result) => {
      _error(result);
    }
  });
}

function getTemp(start, end, _success, _error) {
  // Example Date: 2018-05-25
  const URL = "http://ee.inavitas.io/api/historian?startDate=" + start + "%2012%3A00%3A00&endDate=" + end + "%2012%3A00%3A00&type=temperature"
  $.ajax({
    url: URL,
    success: (result) => {
      _success(result);
    },
    error: (result) => {
      _error(result);
    }
  });
}

function getSetPoint(start, end, _success, _error) {
  // Example Date: 2018-05-25
  const URL = "http://ee.inavitas.io/api/historian?startDate=" + start + "%2012%3A00%3A00&endDate=" + end + "%2012%3A00%3A00&type=setpoint"
  $.ajax({
    url: URL,
    success: (result) => {
      _success(result);
    },
    error: (result) => {
      _error(result);
    }
  });
}
