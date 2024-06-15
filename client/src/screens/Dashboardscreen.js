import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, CartesianGrid, Legend, Label} from 'recharts';

const Dashboard = () => {
  const [earningsData2, setEarningsData2] = useState([]);
  const [earningsData, setEarningsData] = useState([]);
  const [earningsPackageNames, setEarningsPackageNames] = useState([]);
  const [data, setData] = useState([]);
  const [packageNames, setPackageNames] = useState([]);
  const [totalRooms, setTotalRooms] = useState(0);
  const [totalDelux, settotaldelux] = useState(0);
  const [totalNonDelux, settotalnondelux] = useState(0);
  const [totalEarnings, settotalearnings] = useState(0);
  const [totalbookings, settotalbookings] = useState(0);
  const [totalTicketEarnings, settotalticketearnings] = useState(0);
  const [totalBookingEarnings, settotalbookingearnings] = useState(0);

  const [monthlyEarnings, setMonthlyEarnings] = useState([]);
  const [monthlyBookingEarnings, setMonthlyBookingEarnings] = useState([]);
  const [monthlyTicketEarnings, setMonthlyTicketEarnings] = useState([]);

  const [monthlyBookings, setMonthlyBookings] = useState([]);
  const [roomwiseBookings, setRoomwiseBookings] = useState([]);
  const [ticketPurchases, setTicketPurchases] = useState([]);

  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#d88484', '#8d84d8'];
  const processEarningsData = (data) => {
    return data.map(entry => ({
      packageName: entry.packageName,
      totalEarnings: entry.totalEarnings
    }));
  };
  const processEarningsDataForChart = (data) => {
    const result = [];
    const packageNames = new Set();

    data.forEach((entry) => {
      const { month, year } = entry._id;
      const date = `${year}-${month.toString().padStart(2, '0')}`;
      const dataEntry = { date };

      entry.packages.forEach((pkg) => {
        dataEntry[pkg.packageName] = pkg.totalEarnings;
        packageNames.add(pkg.packageName);
      });

      result.push(dataEntry);
    });

    return { result, packageNames: Array.from(packageNames) };
  };
  const processDataForChart = (data) => {
    const result = [];
    const packageNames = new Set();

    data.forEach((entry) => {
      const { month, year } = entry._id;
      const date = `${year}-${month.toString().padStart(2, '0')}`;
      const dataEntry = { date };

      entry.packages.forEach((pkg) => {
        dataEntry[pkg.packageName] = pkg.totalSold;
        packageNames.add(pkg.packageName);
      });

      result.push(dataEntry);
    });

    return { result, packageNames: Array.from(packageNames) };
  };
  const countTotalBookings = (data) => {
    var val = 0;
    data.forEach(item => {
      val += item.totalBookings;
    });
    return val;
  }
  const mergeAndSumData = (data1, data2) => {
    const mergedData = {};
    var val = 0, val2 = 0;

    data1.forEach(item => {
      if (!mergedData[item._id]) {
        mergedData[item._id] = { _id: item._id, totalAmount: 0 };
      }
      mergedData[item._id].totalAmount += item.totalAmount;
      val += item.totalAmount;
    });
    settotalbookingearnings(val);

    data2.forEach(item => {
      if (!mergedData[item._id]) {
        mergedData[item._id] = { _id: item._id, totalAmount: 0 };
      }
      mergedData[item._id].totalAmount += item.totalAmount;
      val2 += item.totalAmount;
    });
    settotalticketearnings(val2);
    settotalearnings(val + val2);

    return Object.values(mergedData);
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const roomsResponse = await axios.get(`/api/rooms/total`);
        setTotalRooms(roomsResponse.data.totalRooms);
        settotaldelux((await axios.get(`/api/rooms/totalDelux`)).data.totalRooms);
        settotalnondelux((await axios.get(`/api/rooms/totalNonDelux`)).data.totalRooms);

        const earningsResponse = await axios.get(`/api/booking/earningsMonthly`);
        setMonthlyBookingEarnings(earningsResponse.data);

        const earningsTicketResponse = await axios.get(`/api/ticketbook/earningsMonthly`);
        setMonthlyTicketEarnings(earningsTicketResponse.data);

        const mergedData = mergeAndSumData(earningsResponse.data, earningsTicketResponse.data);
        setMonthlyEarnings(mergedData);

        const bookingsResponse = await axios.get(`/api/booking/bookingsMonthly`);
        setMonthlyBookings(bookingsResponse.data);
        settotalbookings(countTotalBookings(bookingsResponse.data));

        const roomwiseResponse = await axios.get(`/api/booking/bookingsRoomwise`);
        setRoomwiseBookings(roomwiseResponse.data);

        const ticketsResponse = await axios.get(`/api/ticketbook/monthly`);
        setTicketPurchases(ticketsResponse.data);

        const response = await axios.get(`/api/ticketbook/packageSalesMonthly`);
        const { result: salesResult, packageNames: salesPackageNames } = processDataForChart(response.data);
        setData(salesResult);
        setPackageNames(salesPackageNames);

        const { result: earningsResult, packageNames: earningsPackageNames } = processEarningsDataForChart(response.data);
        setEarningsData(earningsResult);
        setEarningsPackageNames(earningsPackageNames);

        const response2 = await axios.get(`/api/ticketbook/packageEarnings`);
        const processedData = processEarningsData(response2.data);
        setEarningsData2(processedData);
        console.log(`i am here ${earningsData2}`);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);



  return (
    <div>
      <div className='container mt-5'>
        <div className='row justify-content-center bs'>
          <h2>Dashboard</h2>
        </div>
      </div>



      <div className='container mt-5'>
        <div className="row justify-content-center bs">
          <h2>Rooms</h2>
          <div className='col-md-5'>
            <PieChart width={400} height={400}>
              <Pie data={[{ _id: "Delux", 'totalRooms': totalDelux }, { _id: "Non-Delux", 'totalRooms': totalNonDelux }]} dataKey="totalRooms" nameKey="_id" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {
                  [{ _id: "Delux", 'totalRooms': totalDelux }, { _id: "Non-Delux", 'totalRooms': totalNonDelux }].map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className='col-md-3 mt-5'>
            <p className='bs'><b>Total Rooms : {totalRooms}</b></p>
            <p className='bs'><b>Total Delux Rooms : {totalDelux}</b></p>
            <p className='bs'><b>Total Non-Delux Rooms : {totalNonDelux}</b></p>
          </div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row justify-content-center bs'>
          <h2>Bookings</h2>
          <div className="col-md-7 chart-container bs">
            <h2>Monthly Bookings</h2>
            <BarChart width={600} height={300} data={monthlyBookings}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="_id">
                <Label value="Month" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Total Bookings" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="totalBookings" fill="#82ca9d" />
            </BarChart>
          </div>
          <div className="chart-container col-md-5 bs">
            <h2>Room-wise Bookings</h2>
            <PieChart width={400} height={400}>
              <Pie data={roomwiseBookings} dataKey="totalBookings" nameKey="_id" cx="50%" cy="50%" outerRadius={100} fill="#8884d8">
                {
                  roomwiseBookings.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
          <div className='bs'><h2>Total Bookings : {totalbookings}</h2></div>
        </div>
      </div>
      <div className='container mt-5'>
        <div className='row justify-content-center bs'>
          <div className='col-md-4'>
            <h2>Monthly Ticket Purchases</h2>
            <BarChart width={400} height={300} data={ticketPurchases}>
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="_id">
                <Label value="Month" offset={-5} position="insideBottom" />
              </XAxis>
              <YAxis>
                <Label value="Total Tickets" angle={-90} position="insideLeft" />
              </YAxis>
              <Tooltip />
              <Legend />
              <Bar dataKey="totalTickets" fill="#ffc658" />
            </BarChart>
          </div>
          <div className='col-md-5'>
            <h2>Per Month Per Package Sales</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                {packageNames.map((name) => (
                  <Bar key={name} dataKey={name} stackId="a" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
      <div className='container mt-5'>
        <div className='row justify-content-center bs'>
          <div className="row justify-content-center bs">
            <h2>Earnings</h2>
            <div className='col-md-5'>
              <h2>Monthly Ticket Earnings</h2>
              <ResponsiveContainer width="100%" height={300}>

                <LineChart
                  data={monthlyTicketEarnings}
                  margin={{ top: 30, right: 30, left: 60, bottom: 20 }}  // Increased left margin
                >

                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="_id">
                    <Label value="Month" offset={-5} position="insideBottom" />
                  </XAxis>
                  <YAxis>
                    <Label value="Amount (BDT)" angle={-90} position="insideLeft" offset={-10} /> {/* Adjusted offset */}
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ strokeWidth: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>
            <div className='col-md-5'>
              <h2>Monthly Booking Earnings</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={monthlyBookingEarnings}
                  margin={{ top: 30, right: 30, left: 60, bottom: 20 }}  // Increased left margin
                >
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="_id">
                    <Label value="Month" offset={-5} position="insideBottom" />
                  </XAxis>
                  <YAxis>
                    <Label value="Amount (BDT)" angle={-90} position="insideLeft" offset={-10} /> {/* Adjusted offset */}
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ strokeWidth: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>
          </div>
          <div className='row justify-content-center bs'>
            <div>
              <h2>Per Month Per Package Earnings</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={earningsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {earningsPackageNames.map((name) => (
                    <Bar key={name} dataKey={name} stackId="a" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} />
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>

          </div>
          <div className='row justify-content-center bs'>
            <div>
              <h2>Per Package All Time Earnings</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={earningsData2} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="packageName" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="totalEarnings" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="row justify-content-center bs">
            <div className='col-md-7'>
              <h2>Monthly Total Earnings</h2>
              <ResponsiveContainer width="100%" height={300}>

                <LineChart
                  data={monthlyEarnings}
                  margin={{ top: 30, right: 30, left: 60, bottom: 20 }}  // Increased left margin
                >

                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="_id">
                    <Label value="Month" offset={-5} position="insideBottom" />
                  </XAxis>
                  <YAxis>
                    <Label value="Amount (BDT)" angle={-90} position="insideLeft" offset={-10} /> {/* Adjusted offset */}
                  </YAxis>
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="totalAmount"
                    stroke="#8884d8"
                    strokeWidth={2}
                    dot={{ strokeWidth: 4 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>

            </div>

            <div className='col-md-4 mt-5'>
              <p className='bs'><b>Total Earnings : {totalEarnings} BDT</b></p>
              <p className='bs'><b>Total Booking Earnings : {totalBookingEarnings} BDT</b></p>
              <p className='bs'><b>Total Ticket Earnings : {totalTicketEarnings} BDT</b></p>
            </div>
          </div>
        </div>
      </div>



    </div>

  );
}

export default Dashboard;
