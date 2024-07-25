import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { increaseQuantity, decreaseQuantity, deleteProduct } from "../Redux/cartSlice";
import { Add, Remove, Delete } from "@mui/icons-material";
import {
    Box,
    Button,
    Paper,
    styled,
    IconButton,
    Badge,
    Typography,
    Divider,
    Stack,
} from "@mui/material";
import Header1 from '../components/header/Header1';
import Header2 from '../components/header/Header2';


const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {

    },
}));


const Cart = () => {

    let subtotal = 0
    const dispatch = useDispatch();
    // @ts-ignore
    const { selectedProducts } = useSelector((state) => state.cart);
    return (
        <>
            <Header1 />
            <Header2 />
            <Box>
                {selectedProducts.map((item) => {
                    subtotal += Number(item.price) * Number(item.quantity);
                    return (
                        <Paper key={item.id} dir="rtl" className="item-container">
                            <div className="img-title-parent">
                                <img src={item.imageLink[0]} alt="" />
                                <p className="product-name">{item.productName}</p>
                            </div>

                            <div style={{ display: "flex", alignItems: "center" }}>
                                <IconButton
                                    sx={{ color: "#1976d2", ml: "10px" }}
                                    onClick={() => {
                                        dispatch(increaseQuantity(item))
                                    }}
                                >
                                    <Add />
                                </IconButton>

                                <StyledBadge badgeContent={item.quantity} color="primary" />

                                <IconButton
                                    sx={{ color: "#1976d2", mr: "10px" }}
                                    onClick={() => {
                                        dispatch(decreaseQuantity(item))
                                    }}
                                >
                                    <Remove />
                                </IconButton>
                            </div>

                            <div className="price">${Number(item.price) * Number(item.quantity)}</div>

                            <Button
                                sx={{ display: { xs: "none", md: "inline-flex" } }}
                                variant="text"
                                color="error"
                                onClick={() => {
                                    dispatch(deleteProduct(item))
                                }}
                            >
                                delete
                            </Button>

                            <IconButton
                                sx={{
                                    color: "#ef5350",
                                    display: { xs: "inline-flex", md: "none" },
                                }}
                                onClick={() => {
                                    dispatch(deleteProduct(item))
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Paper>
                    );
                })}

                <Paper sx={{ width: "200px", mx: "auto", mt: "60px" }}>
                    <Typography align="center" p={2} variant="h6">
                        Cart Summary
                    </Typography>

                    <Divider />

                    <Stack
                        sx={{ justifyContent: "space-between", p: 1.2 }}
                        direction={"row"}
                    >
                        <Typography variant="body1">Subtotal</Typography>
                        <Typography variant="body1">${subtotal}</Typography>
                    </Stack>

                    <Divider />

                    <Button fullWidth color="primary" variant="contained">
                        CHECKOUT
                    </Button>
                </Paper>
            </Box>
        </>
    )
}

export default Cart