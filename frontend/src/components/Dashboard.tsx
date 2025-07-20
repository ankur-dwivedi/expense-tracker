import React, { useEffect } from "react";
import { Box, Card, Typography, CircularProgress } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import AppTheme from "./helper/AppTheme";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchAnalyticsThunk } from "../redux/expense/expenseThunks";
import { AppDispatch, RootState } from "../redux/store";

const Dashboard: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { analytics, analyticsLoading, analyticsError } = useSelector(
    (state: RootState) => state.expenses
  );

  useEffect(() => {
    dispatch(fetchAnalyticsThunk());
  }, [dispatch]);

  const chartData = Object.entries(analytics).map(([category, total]) => ({
    category,
    total,
  }));

  return (
    <AppTheme>
      <Header />
      <Box
        sx={{
          minHeight: "100vh",
          backgroundImage:
            "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          py: 4,
        }}
      >
        <Box sx={{ maxWidth: 1000, mx: "auto", px: 2 }}>
          <Card sx={{ p: 3, mt: 5 }}>
            <Typography variant="h5" gutterBottom>
              Expenses by Category
            </Typography>
            {analyticsLoading ? (
              <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
              </Box>
            ) : analyticsError ? (
              <Typography color="error" textAlign="center">
                {analyticsError}
              </Typography>
            ) : chartData.length === 0 ? (
              <Typography textAlign="center" mt={4}>
                No analytics data found.
              </Typography>
            ) : (
              <Box height={400}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="total" fill="#47536b" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Card>
        </Box>
      </Box>
    </AppTheme>
  );
};

export default Dashboard;
