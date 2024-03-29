import { useState, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "@mui/lab/LoadingButton";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { IconLockOpen } from "@tabler/icons";
import { catchError } from "@utils/catchError";
import useAuth from "hooks/useAuth";
import usePageTitle from "hooks/usePageTitle";
import { Controller, useForm } from "react-hook-form";
import { Link as RouteLink } from "react-router-dom";

const schema = z.object({
  userName: z
    .string()
    .trim()
    .min(5, "Username minimum 5 characters")
    .max(20, "Username maximum 20 characters"),
  password: z
    .string()
    .trim()
    .min(6, "Password should be minimum of 6 characters")
    .max(40, "Must be 40 or fewer characters long"),
});

const defaultValues = {
  userName: "",
  password: "",
};

export default function SignIn() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.height = '100vh';
    document.body.style.background = 'linear-gradient(45deg, #64B5F6 30%, #F06292 100%)';
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.height = '';
      document.body.style.background = '';
    };
  }, []);

  usePageTitle("Login");
  const [toggleShowPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Toggle show password
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  // On submit
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await login(data.userName, data.password);
    } catch (error) {
      setError(catchError(error));
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '70vh', 
      background: 'linear-gradient(45deg, #64B5F6 30%, #F06292 90%)' 
    }}>
      <Paper sx={{ p: 4, width: '100%', maxWidth: '500px', backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(10px)' }}> 
        <Box
           sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2, 
          }}
        >
          <Avatar sx={{ bgcolor: "secondary.main", width: 56, height: 56 }}> 
            <IconLockOpen />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ fontWeight: 'medium' }}> 
            Login
          </Typography>
    
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="userName"
              render={({ field }) => (
                <TextField
                  autoFocus
                  fullWidth
                  margin="normal"
                  {...field}
                  placeholder="Username" // Changed to use placeholder
                  error={!!errors.userName}
                  helperText={errors?.userName?.message}
                  sx={{
                    '& .MuiInputBase-input': {
                      color: 'white', 
                      backgroundColor: 'transparent'},  
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                        borderRadius: 20 
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', 
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white', 
                      },
                      backgroundColor: 'transparent',
                    },
                     
                  }}
                />
              )}
            />
    
            <Controller
              control={control}
              name="password"
              render={({ field }) => (
                <TextField
                  fullWidth
                  autoComplete="current-password"
                  margin="normal"
                  {...field}
                  placeholder="Password" // Changed to use placeholder
                  type={toggleShowPassword ? "text" : "password"}
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={(e) => e.preventDefault()}
                          sx={{ '.MuiSvgIcon-root': { color: 'action.active' } }} 
                        >
                          {!toggleShowPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    classes: { notchedOutline: 'customOutline' }
                  }}
                  sx={{
                    input: { color: 'white' }, // Adjust text color
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: 'white',
                        borderRadius: 20 
                      },
                      '&:hover fieldset': {
                        borderColor: 'white', // White border color on hover
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: 'white', // White border color when focused
                      },
                      backgroundColor: 'transparent',
                    },
                     
                  }}
                />
              )}
            />
    
            {error && (
              <FormHelperText error sx={{ fontSize: "0.875rem", mt: 1 }}>
                {error}
              </FormHelperText>
            )}
    
            <Box sx={{ mt: 3, mb: 2 }}>
              {loading ? (
                <LoadingButton loading fullWidth variant="contained" sx={{ py: 1.5 }}>
                  Login
                </LoadingButton>
              ) : (
                <Button fullWidth type="submit" variant="contained" sx={{ py: 1.5, backgroundColor: 'white', color:'black' , borderRadius:20 , borderColor:'white' , borderWidth:2,'&:hover': { backgroundColor: 'transparent'} }}>
                  Login
                </Button>
              )}
            </Box>
          </form>
          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link component={RouteLink} to="/signup" underline="none" sx={{ color: 'secondary.main' }}>
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
