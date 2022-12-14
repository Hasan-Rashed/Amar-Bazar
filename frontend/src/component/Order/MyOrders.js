import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import "./myOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../layout/MetaData";
import LaunchIcon from "@material-ui/icons/Launch";



const MyOrders = () => {
/* A hook that allows you to dispatch actions to the Redux store. */
    const dispatch = useDispatch();

/* A hook that allows you to dispatch actions to the Redux store. */
  const alert = useAlert();

/* Destructuring the state.myOrders object. */
  const { loading, error, orders } = useSelector((state) => state.myOrders);
/* Destructuring the state.user object. */
  const { user } = useSelector((state) => state.user);
    

  /* Defining the columns of the table. */
  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon />
          </Link>
        );
      },
    },
  ];


    const rows = [];


    /* Checking if the orders array is not empty, then it is looping through the
    orders array and pushing the data into the rows array. */
    orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });

    

  /* A hook that allows you to perform side effects in function components. */
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);
  
  return (
    <>
        <MetaData title={`${user.name} - Order`} />

        {
            loading ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className="myOrdersTable"
                    autoHeight
                />

                <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>
            )
        }
    </>
  )
}

export default MyOrders;