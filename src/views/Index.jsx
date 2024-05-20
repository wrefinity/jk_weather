import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Index = () => {

  const [data, setData] = useState(null);
  useEffect(() => {

    fetch('data.js')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const [selectedParameter, setSelectedParameter] = useState("airPollution");

  const handleParameterChange = (event) => {
    setSelectedParameter(event.target.value);
  };



  console.log(data)


  const options = {
    chart: {
      id: "basic-bar",
      height: 500,
      type: 'line',
      zoom: {
        enabled: true
      },
      animations: {
        enabled: true
      }
    },
    stroke: {
      width: [5, 5, 4],
      curve: 'smooth'
    },
    title: {
      text: 'Weather Statistics',
      align: 'left'
    },
    markers: {
      size: 1,
      hover: {
        sizeOffset: 6
      }
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.9,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      },
    },
    xaxis: {
      categories: data ? data[selectedParameter]?.map(item => item.timeStamp) : []
    }
  }
  const series = [
    {
      name: selectedParameter === 'rainfall' ? 'Rainfall' :
            selectedParameter === 'temperature' ? 'Temperature' :
            selectedParameter === 'humidity' ? 'Humidity' :
            selectedParameter === 'CO2' ? 'CO2' : '',
      data: data ? data[selectedParameter]?.map(item => item.parameterValue) : []
    }
  ];
  const getLastObject = (param) => {
    return data && data[param] ? data[param][data[param].length - 1] : null;
  };

  const lastObject = getLastObject(selectedParameter);

  return (
    <main>



      <section className="vh-auto px-3" style={{ backgroundColor: '#eff2f4 ' }}>

        <div className="container py-5 h-auto">

          <div className="row d-flex justify-content-center align-items-center h-100">
            {lastObject && (
              <div className="col-md-4 col-lg-4 col-xl-4">
                <div className="card" style={{ color: '#4B515D', borderRadius: '35px' }}>
                  <div className="card-body p-4">
                    <div className="d-flex">
                      <h6 className="flex-grow-1">{selectedParameter}</h6>
                      <h6>{lastObject.timeStamp}</h6>
                    </div>
                    <div className="d-flex flex-column text-center mt-5 mb-4">
                      <h6 className="display-4 mb-0 font-weight-bold" style={{ color: '#1C2331' }}>{lastObject.parameterValue} {lastObject.unit}</h6>
                      <span className="small" style={{ color: '#868B94' }}>{lastObject.warning}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1" style={{ fontSize: '1rem' }}>
                        <div><i className="fa fa-wind" style={{ color: '#868B94' }}></i> <span className="ms-1"> SensorId: {lastObject?.sensorId}</span></div>
                        <div><i className="fa fa-tint" style={{ color: '#868B94' }}></i> <span className="ms-1"> Threshold Min: {lastObject?.dataRangeMin} </span></div>
                        <div><i className="fa fa-sun" style={{ color: '#868B94' }}></i> <span className="ms-1"> Threshold Max: {lastObject?.dataRangeMax} </span></div>
                      </div>
                      <div>
                        {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/ilu1.webp" width="100px" alt="weather" /> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>


        <div className="row py-5 d-flex justify-content-center align-items-center">
          <div className=" col-md-4">
            <Chart
              options={options}
              series={series}
              type="bar"
              width="500"
            />
          </div>

          <div className="col-md-4">
            <Chart
              options={options}
              series={series}
              type="line"
              width="500"
            />
          </div>
        </div>


        <div className="row py-5 d-flex justify-content-center align-items-center">
          <div>
            <h1>Weather Information</h1>
            <div className="col-md-4 mb-4">
              <label htmlFor="parameter">Select Parameter:</label>
              <select id="parameter" value={selectedParameter}  className="form-control" onChange={handleParameterChange}>
                <option value="airPollution">Air Pollution</option>
                <option value="co2Emissions">CO2 Emissions</option>
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="rainfall">Rainfall</option>
              </select>
            </div>

            <h4>{selectedParameter}</h4>
            {data && (
              <table className="table table-responsive table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Sensor ID</th>
                    <th>Parameter</th>
                    <th>Value</th>
                    <th>Timestamp</th>
                    <th>Warning</th>
                  </tr>
                </thead>
                <tbody>
                  {data[selectedParameter]?.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.sensorId}</td>
                      <td>{item.parameter}</td>
                      <td>{item.parameterValue} {item.unit}</td>
                      <td>{item.timeStamp}</td>
                      <td>{item.warning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* <div >
          <div className="justify-content-center align-items-center text-center pb-5">
            <h4>want to login? <Link to="/login" className="text-decoration-none">Login</Link></h4>
          </div>
        </div> */}

      </section>
    </main>

  )
}

export default Index





