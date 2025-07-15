import * as React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Card as MuiCard,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import AppTheme from "./helper/AppTheme";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { createExpenseThunk } from "../redux/expense/expenseThunks";
import { Expense } from "../redux/expense/expenseTypes";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Select, MenuItem } from "@mui/material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  maxWidth: "500px",
}));

export default function AddExpenseForm() {
  const [amount, setAmount] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState<Dayjs | null>(null);

  const [showSuccess, setShowSuccess] = React.useState(false);
  const expenseState = useSelector((state: RootState) => state.expenses);

  const [errors, setErrors] = React.useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });
  const dispatch = useDispatch<AppDispatch>();

  const validate = () => {
    const newErrors = {
      amount: "",
      category: "",
      description: "",
      date: "",
    };
    let valid = true;

    if (!amount || isNaN(Number(amount))) {
      newErrors.amount = "Amount must be a valid number";
      valid = false;
    }
    if (!category) {
      newErrors.category = "Category is required";
      valid = false;
    }
    if (!description) {
      newErrors.description = "Description is required";
      valid = false;
    }
    if (!date) {
      newErrors.date = "Date is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data: Expense = {
      amount: Number(amount),
      category,
      description,
      date: date?.toISOString() as string,
    };
    try {
      await dispatch(createExpenseThunk(data)).unwrap();

      // On success
      setAmount("");
      setCategory("");
      setDescription("");
      setDate(null);
      setShowSuccess(true);
      setErrors({ amount: "", category: "", description: "", date: "" });
    } catch (error: any) {
      setErrors((prev) => ({
        ...prev,
        date: typeof error === "string" ? error : "Something went wrong.",
      }));
    }
  };

  return (
    <AppTheme>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Header />
        <Box
          sx={{
            minHeight: "90vh",
            backgroundImage:
              "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 2,
          }}
        >
          <Card>
            <Typography variant="h5">Add Expense</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <FormControl>
                <FormLabel>Amount</FormLabel>
                <TextField
                  type="number"
                  name="amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  error={!!errors.amount}
                  helperText={errors.amount}
                  required
                />
              </FormControl>
              {/* <FormControl>
                <FormLabel>Category</FormLabel>
                <TextField
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  error={!!errors.category}
                  helperText={errors.category}
                  required
                />
              </FormControl> */}
              <FormControl required error={!!errors.category}>
                <FormLabel>Category</FormLabel>
                <Select
                  value={category}
                  name="category"
                  onChange={(e) => setCategory(e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>
                    Select Category
                  </MenuItem>
                  <MenuItem value="Food">Food</MenuItem>
                  <MenuItem value="Travel">Travel</MenuItem>
                  <MenuItem value="Bills">Bills</MenuItem>
                  <MenuItem value="Shopping">Shopping</MenuItem>
                </Select>
                {errors.category && (
                  <Typography variant="caption" color="error">
                    {errors.category}
                  </Typography>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <TextField
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={!!errors.description}
                  helperText={errors.description}
                  required
                />
              </FormControl>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <DatePicker
                  value={date}
                  onChange={(newValue) => setDate(newValue)}
                  slotProps={{
                    textField: {
                      required: true,
                      error: !!errors.date,
                      helperText: errors.date,
                    },
                  }}
                />
              </FormControl>
              <Button variant="contained" type="submit">
                Add Expense
              </Button>
            </Box>
          </Card>
        </Box>
        <Snackbar
          open={showSuccess}
          autoHideDuration={3000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" onClose={() => setShowSuccess(false)}>
            Expense added successfully!
          </Alert>
        </Snackbar>
      </LocalizationProvider>
    </AppTheme>
  );
}
