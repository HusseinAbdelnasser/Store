import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  IconButton,
  Stack,
  Typography,
  useTheme,
  Badge
} from "@mui/material";
import React, { useState } from "react";
import { useGetproductsByNameQuery } from "../../Redux/productsApi";
import { addToCart, decreaseQuantity, increaseQuantity } from "../../Redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";
import {styled} from "@mui/material/styles";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    
  },
}));

const Main = () => {
  const theme = useTheme();

  const { data, error, isLoading } = useGetproductsByNameQuery();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProducts, selectedProductsID } = useSelector(
    // @ts-ignore
    (state) => state.cart
  );

  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    });

    return myProduct.quantity;
  };

  if (isLoading) {  
    <Box sx={{ py: 11, textAlign: "center" }}>
      <CircularProgress />
    </Box>;
  }

  if (error) {
    <Container
      sx={{
        py: 11,
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        {
          //   @ts-ignore
          error.error
        }
      </Typography>
      ;<Typography variant="h6">Please try again later</Typography>
    </Container>;
  }

  if (data) {
    return (
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Box>
            <Typography variant="h6"> Products</Typography>
            <Typography fontWeight={300} variant="body1">
              All our new arrivals in a exclusive brand selection
            </Typography>
          </Box>


        </Stack>

        <Stack
          direction={"row"}
          sx={{ flexWrap: "wrap", justifyContent: "center", mt: 2 }}
        >
          {data.map((item) => {
            return (
              <Card
                className="card"
                key={item.id}
                sx={{
                  maxWidth: 277,
                  mb: 6,
                  mx: 2,
                }}
              >
                <CardMedia
                  className="image"
                  component="img"
                  height="277"
                  image={item.imageLink[0]}
                  alt="Paella dish"
                  onClick={() => {
                    navigate(`/ProductDetails/${item.id}`)
                  }}
                />
                <CardContent>
                  <CardActions
                    sx={{ justifyContent: "space-between" }}
                    disableSpacing
                  >
                    <Typography variant="h5" color="text.primary" sx={{ mb: 1 }}>
                      {item.productName}
                    </Typography>
                    <Button variant="contained"
                      color="secondary" sx={{ mb: 1 }}>
                      {item.category}
                    </Button>
                  </CardActions>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{ justifyContent: "space-between" }}
                  disableSpacing
                >
                  {selectedProductsID.includes(item.id) ? (
                    <div
                      dir="rtl"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <IconButton
                        color="primary"
                        sx={{ ml: "10px" }}
                        onClick={() => {
                          dispatch(increaseQuantity(item));
                        }}
                      >
                        <Add fontSize="small" />
                      </IconButton>

                      <StyledBadge
                        badgeContent={productQuantity(item)}
                        color="primary"
                      />

                      <IconButton
                        color="primary"
                        sx={{ mr: "10px" }}
                        onClick={() => {
                          dispatch(decreaseQuantity(item));
                        }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                    </div>
                  ) : (
                    <Button
                      sx={{ textTransform: "capitalize", p: 1, lineHeight: 1.1 }}
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        dispatch(addToCart(item));
                      }}
                    >
                      Add to cart
                    </Button>
                  )}

                  <Typography
                    mr={1}
                    variant="body1"
                    color={theme.palette.error.light}
                  >
                    ${item.price}
                  </Typography>
                </CardActions>
              </Card>
            );
          })}
        </Stack>
      </Container>
    );
  }
};

export default Main;
