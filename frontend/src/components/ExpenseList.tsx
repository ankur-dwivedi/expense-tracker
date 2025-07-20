import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Pagination,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AppTheme from "./helper/AppTheme";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchExpensesThunk,
  updateExpenseStatusThunk,
} from "../redux/expense/expenseThunks";
import dayjs, { Dayjs } from "dayjs";
import StatusUpdateModal from "./StatusUpdateModal";

const categories = ["All", "Food", "Travel", "Bills", "Shopping"];
const statuses = ["All", "approved", "pending", "rejected"];

const ExpenseList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { expenses, meta, loading, error } = useSelector(
    (state: RootState) => state.expenses
  );

  const user = useSelector((state: RootState) => state.auth.user);

  const [selectedExpenseId, setSelectedExpenseId] = useState<string | null>(
    null
  );
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [category, setCategory] = useState<string>("All");
  const [status, setStatus] = useState<string>("All");
  const [date, setDate] = useState<Dayjs | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchExpensesThunk({
        category: category !== "All" ? category : undefined,
        status: status !== "All" ? status : undefined,
        date: date?.toISOString(),
        page,
        limit: pageSize,
      })
    );
  }, [category, status, date, page, dispatch]);

  const handleStatusClick = (id: string, status: string) => {
    setSelectedExpenseId(id);
    setSelectedStatus(status);
    setModalOpen(true);
  };

  const handleConfirmStatusChange = (newStatus: string) => {
    if (selectedExpenseId) {
      dispatch(
        updateExpenseStatusThunk({
          expenseId: selectedExpenseId,
          status: newStatus,
        })
      );
    }
    setModalOpen(false);
  };

  return (
    <AppTheme>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Box sx={{ minHeight: "100vh", px: 2, py: 6 }}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Expense List
          </Typography>

          <Box
            display="flex"
            gap={2}
            mb={3}
            flexWrap="wrap"
            justifyContent="center"
          >
            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by category</InputLabel>
              <Select
                value={category}
                label="Filter by category"
                onChange={(e) => {
                  setCategory(e.target.value);
                  setPage(1);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#00000000",
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 200 }}>
              <InputLabel>Filter by status</InputLabel>
              <Select
                value={status}
                label="Filter by status"
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#00000000",
                }}
              >
                {statuses.map((stat) => (
                  <MenuItem key={stat} value={stat}>
                    {stat.charAt(0).toUpperCase() + stat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <DatePicker
              label="Filter by Date"
              value={date}
              onChange={(newDate) => {
                setDate(newDate);
                setPage(1);
              }}
            />
          </Box>

          <Card sx={{ p: 3, maxWidth: 1000, mx: "auto", width: "100%" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  {user?.role === "admin" && <TableCell>User</TableCell>}
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : expenses.length > 0 ? (
                  expenses.map((expense) => (
                    <TableRow key={expense._id}>
                      <TableCell>
                        {dayjs(expense.date).format("YYYY-MM-DD")}
                      </TableCell>
                      <TableCell>{expense.category}</TableCell>
                      <TableCell>{expense.description}</TableCell>
                      <TableCell>
                        <Chip
                          label={expense.status}
                          color={
                            expense.status === "approved"
                              ? "success"
                              : expense.status === "rejected"
                              ? "error"
                              : "warning"
                          }
                          size="small"
                          sx={{
                            cursor:
                              user?.role === "admin" ? "pointer" : "default",
                          }}
                          onClick={() =>
                            user?.role === "admin" &&
                            handleStatusClick(
                              expense._id ? expense._id : "",
                              expense.status ? expense.status : ""
                            )
                          }
                        />
                      </TableCell>
                      {user?.role === "admin" && (
                        <TableCell>
                          {expense.userId?.name}
                          <br />
                          <Typography variant="body2" color="text.secondary">
                            {expense.userId?.email}
                          </Typography>
                        </TableCell>
                      )}
                      <TableCell align="right">₹{expense.amount}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      No expenses found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <Box mt={3} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil((meta?.total || 0) / pageSize)}
                page={page}
                onChange={(_, val) => setPage(val)}
                color="primary"
              />
            </Box>
          </Card>
        </Box>

        <StatusUpdateModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onConfirm={handleConfirmStatusChange}
          currentStatus={selectedStatus}
        />
      </LocalizationProvider>
    </AppTheme>
  );
};

export default ExpenseList;
