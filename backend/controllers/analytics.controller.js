import Product from "../models/product.model.js";
import User from "../models/user.model.js";
import Order from "../models/order.model.js";

// Total counts and sales summary
export const getAnalyticsData = async () => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const salesData = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalSales: { $sum: 1 },
        },
      },
    ]);

    const { totalSales, totalRevenue } = salesData[0] || {
      totalSales: 0,
      totalRevenue: 0,
    };

    return {
      success: true,
      analyticsData: {
        totalUsers,
        totalProducts,
        totalSales,
        totalRevenue,
      },
    };
  } catch (error) {
    console.error("getAnalyticsData error:", error);
    return {
      success: false,
      message: "Failed to retrieve analytics data",
    };
  }
};

// Daily sales breakdown
export const getDailySalesData = async (startDate, endDate) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setUTCHours(23, 59, 59, 999); // include the full end date (in UTC)

    const dailySalesData = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: start,
            $lte: end,
          },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt",
              timezone: "UTC", // force UTC for consistency
            },
          },
          sales: { $sum: 1 },
          revenue: { $sum: "$totalAmount" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const datesArray = getDatesArray(start, end);

    const mappedData = datesArray.map((date) => {
      const dailyData = dailySalesData.find((data) => data._id === date);
      return {
        date,
        sales: dailyData ? dailyData.sales : 0,
        revenue: dailyData ? dailyData.revenue : 0,
      };
    });

    return {
      success: true,
      data: mappedData,
    };
  } catch (error) {
    console.error("getDailySalesData error:", error);
    return {
      success: false,
      message: "Failed to retrieve daily sales data",
    };
  }
};

// Generate list of all dates between start and end
const getDatesArray = (start, end) => {
  const dates = [];
  let current = new Date(start);

  while (current <= end) {
    const formatted = current.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    dates.push(formatted);
    current.setUTCDate(current.getUTCDate() + 1);
  }

  return dates;
};
