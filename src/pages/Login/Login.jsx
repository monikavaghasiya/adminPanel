import React, {useState} from "react";
import {
    Button,
    TextField,
    Grid,
    Paper,
    Typography,
    Link,
} from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress'
import "./login.css";
import axiosInstance from "../../axios";

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState();
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.target);
        console.log(data.get('email'), data.get('password'))

        /*AuthService.login(data).then(
            (response) => {
                console.log('success', response);
                setLoading(false);
                setMessage('');
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                console.log("resMessage = ",resMessage);
                setMessage(resMessage);
                setLoading(false);
            }
        )*/
        axiosInstance.post('/login', data)
        .then(response => {
            const responseData = response.data;
            const accessToken = responseData.access_token;
            setToken(accessToken);
            console.log(responseData);
            setLoading(false);
        })
        .catch(function (error) {
            const resMessage =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            console.log("resMessage = ",resMessage);
            setMessage(resMessage);
            setLoading(false);
        });
    };

    return (
        <div className="loginContainer">
            <Grid container className="login-form" direction="column" justifyContent="flex-start" alignItems="center">
                <Paper variant="elevation" elevation={3} className="login-background">
                    <Grid container direction="column" spacing={2}>
                    <Grid item >
                        <Typography component="h1" variant="h5" align="center">
                            Sign in
                        </Typography>
                    </Grid>
                    {message && (
                        <Grid item>
                            <Alert onClose={() => {setMessage('')}} severity="error">{message}</Alert>
                        </Grid>
                    )}
                    </Grid>
                    <Grid item>
                        <form onSubmit={handleSubmit}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        type="email"
                                        placeholder="Email"
                                        fullWidth
                                        name="email"
                                        variant="outlined"
                                        value={username}
                                        onChange={(event) => setUsername(event.target.value)}
                                        required
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        type="password"
                                        placeholder="Password"
                                        fullWidth
                                        name="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                        disabled={loading}
                                        className="button-block">
                                        {loading && (<CircularProgress color="inherit" size="0.875rem" className="mr-10"/>) } Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Grid>
                    <Grid item className="mt-15">
                        <Link href="#" variant="body2">
                            Forgot Password?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            Register a new membership
                        </Link>
                    </Grid>
                </Paper>
            </Grid>
        </div>
    );
}
export default Login;