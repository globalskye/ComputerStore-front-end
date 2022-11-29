import {
  makeStyles,
  Container,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { userRegister } from "../services/auth.service";

interface IFormInput {
  email: string;
  username: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().required().email(),
  username: yup.string().required().min(2).max(25),
  password: yup.string().required().min(8).max(120),
});

const useStyles = makeStyles((theme) => ({
  heading: {
    textAlign: "center",
    margin: theme.spacing(1, 0, 4),
  },
  submitButton: {
    marginTop: theme.spacing(4),
  },
}));



const Register: React.FC = () => {
  
    const [message, setMessage] = useState<string>("");

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IFormInput>({
        resolver: yupResolver(schema),
      });
    
      const { heading, submitButton } = useStyles();      
      const onSubmit = (data: IFormInput) => {
        
        userRegister(data.username,data.email,data.password).then(
          (response) => {
            setMessage("user succfully registred");
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
    
            setMessage("something went wrong : "+  resMessage);
            
          }
        );
      };
    
      return (
        <Container maxWidth="xs">
          <Typography className={heading} variant="h3">
            Sign In
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              {...register("email")}
              variant="outlined"
              margin="normal"
              label="Email"
              helperText={errors.email?.message}
              error={!!errors.email?.message}
              fullWidth
              required
            />
            <TextField
              {...register("username")}
              variant="outlined"
              margin="normal"
              label="Name"
              helperText={errors.username?.message}
              error={!!errors.username?.message}
              fullWidth
            />
            <TextField
              {...register("password")}
              variant="outlined"
              margin="normal"
              label="Password"
              helperText={errors.password?.message}
              error={!!errors.password?.message}
              type="password"
              fullWidth
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={submitButton}
            >
              Sign Up
            </Button>
            {message && (
              <>
                <Typography variant="body1">
                  {message}
                </Typography>
                <Typography variant="body2"></Typography>
              </>
            )}
          </form>
        </Container>
      );
  };
  
  export default Register;