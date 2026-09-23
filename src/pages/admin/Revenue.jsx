import {
  FaChartLine,
  FaCalendarAlt,
  FaWallet
} from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const areaData = [
  { month: "Jan", revenue: 8000 },
  { month: "Feb", revenue: 9500 },
  { month: "Mar", revenue: 11000 },
  { month: "Apr", revenue: 10500 },
  { month: "May", revenue: 12000 },
  { month: "Jun", revenue: 14000 }
];

const revenueType = [
  { name: "Commercial", value: 70 },
  { name: "Residential", value: 50 },
  { name: "Mixed Use", value: 30 }
];

const Revenue = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-xl font-semibold">Total Earnings</h2>

      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex items-center gap-4 p-5 bg-[#EFF6FF] rounded-xl shadow">
          <FaChartLine className="text-3xl text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Annual Revenue</p>
            <h3 className="text-xl font-bold">$120,000</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-[#F0FDF4] rounded-xl shadow">
          <FaCalendarAlt className="text-3xl text-green-600" />
          <div>
            <p className="text-sm text-gray-500">Current Month</p>
            <h3 className="text-xl font-bold">$10,500</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-[#FEFBE8] rounded-xl shadow">
          <FaWallet className="text-3xl text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Avg Monthly Revenue</p>
            <h3 className="text-xl font-bold">$9,800</h3>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Area Chart (80%) */}
        <div className="bg-white p-5 rounded-xl shadow lg:w-[80%] w-full">
          <h3 className="font-semibold mb-4">Monthly Revenue</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  fill="#93c5fd"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue By Type (20%) */}
        <div className="bg-white p-5 rounded-xl shadow lg:w-[20%] w-full">
          <h3 className="font-semibold mb-4">Revenue by Type</h3>

          <div className="space-y-4">
            {revenueType.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span>{item.value}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-blue-600 rounded"
                    style={{ width: `${item.value}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
