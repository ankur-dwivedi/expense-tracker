// import React from "react";
// import { Box, Typography, Button, Stack } from "@mui/material";
// import { Link } from "react-router-dom";
// import AppTheme from "./helper/AppTheme";
// import { useDispatch } from "react-redux";
// import { logout } from "../redux/auth/authSlice";

// const Header: React.FC = () => {
//   const dispatch = useDispatch();

//   return (
//     <AppTheme>
//       <Box
//         sx={{
//           width: "100%",
//           py: 2,
//           px: 5,
//           display: "flex",
//           flexDirection: { xs: "column", sm: "row" },
//           alignItems: { xs: "flex-start", sm: "center" },
//           justifyContent: "space-between",
//           gap: 2,
//           borderBottom: "1px solid #e0e0e0",
//           backgroundColor: "background.paper",
//           position: "sticky",
//           top: 0,
//           zIndex: 1100,
//           mt: 0, // removes any unexpected top margin
//         }}
//       >
//         {/* Heading */}
//         <Typography
//           variant="h5"
//           component={Link}
//           to="/dashboard"
//           sx={{
//             fontWeight: 600,
//             fontSize: "clamp(1.5rem, 4vw, 2rem)",
//             color: "text.primary",
//             flexShrink: 0,
//             textDecoration:"none"
//           }}
//         >
//           Expense Tracker
//         </Typography>

//         {/* Navigation Buttons */}
//         <Stack
//           direction="row"
//           spacing={1.5}
//           flexWrap="wrap"
//           justifyContent={{ xs: "flex-start", sm: "flex-end" }}
//         >
//           <Button
//             variant="contained"
//             color="primary"
//             component={Link}
//             to="/add-expense"
//           >
//             Add Expense
//           </Button>
//           <Button
//             variant="outlined"
//             color="primary"
//             component={Link}
//             to="/expenses"
//           >
//             View Expenses
//           </Button>
//           <Button
//             variant="text"
//             color="secondary"
//             onClick={() => dispatch(logout())}
//           >
//             Sign out
//           </Button>
//         </Stack>
//       </Box>
//     </AppTheme>
//   );
// };

// export default Header;

import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import AppTheme from "./helper/AppTheme";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { RootState } from "../redux/store";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAdmin = user?.role === "admin";

  return (
    <AppTheme>
      <Box
        sx={{
          width: "100%",
          py: 2,
          px: 5,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 2,
          borderBottom: "1px solid #e0e0e0",
          backgroundColor: "background.paper",
          position: "sticky",
          top: 0,
          zIndex: 1100,
          mt: 0,
        }}
      >
        {/* Heading */}
        <Typography
          variant="h5"
          component={Link}
          to="/dashboard"
          sx={{
            fontWeight: 600,
            fontSize: "clamp(1.5rem, 4vw, 2rem)",
            color: "text.primary",
            flexShrink: 0,
            textDecoration: "none",
          }}
        >
          Expense Tracker
        </Typography>

        {/* Navigation Buttons */}
        <Stack
          direction="row"
          spacing={1.5}
          flexWrap="wrap"
          justifyContent={{ xs: "flex-start", sm: "flex-end" }}
        >
          {/* Only show to non-admin users */}
          {!isAdmin && (
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/add-expense"
            >
              Add Expense
            </Button>
          )}
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/expenses"
          >
            View Expenses
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => dispatch(logout())}
          >
            Sign out
          </Button>
        </Stack>
      </Box>
    </AppTheme>
  );
};

export default Header;
