import { DashboardCard } from "./DashboardCard";
import getProducts from "../state/get_product";
import { Box, Typography } from "@mui/material";

import { useEffect, useState, useMemo } from "react";
import { themeSettings } from "../theme";
import { BoxHeader } from "./BoxHeader";

import { DataGrid } from "@mui/x-data-grid";
import getTransaction from "../state/get_transaction";
import { PieChart, Pie, Cell } from "recharts";
import FlexBetween from "./flexbetween";

// Create a dark theme

// Define columns
const productColumns = [
  {
    field: "id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "Expense",
    headerName: "Expense ($)",
    flex: 0.5,
  },
  {
    field: "Price",
    headerName: "Price ($)",
    flex: 0.5,
  },
];
const TranactionColumns = [
  {
    field: "id",
    headerName: "id",
    flex: 1,
  },
  {
    field: "Buyer",
    headerName: "Buyer",
    flex: 0.5,
  },
  {
    field: "Amount",
    headerName: "Amount ($)",
    flex: 0.5,
  },
  {
    field: "Count",
    headerName: "Count",
    flex: 0.5,
  },
];

export const Row3 = ({ kpis1 }: any) => {
  const [loading1, setloading1] = useState(true);
  const [loading2, setloading2] = useState(false);
  const pieChartData = useMemo(() => {
    console.log("hi");
    if (kpis1) {
      const totalExpenses = 71000;

      return Object.entries(kpis1).map(([key, value]) => {
        setloading1(false);
        return [
          {
            name: key,
            value: parseFloat(value.replace("$", "")),
          },
          {
            name: `${key} of Total`,
            value: totalExpenses - parseFloat(value.replace("$", "")),
          },
        ];
      });
    }
  }, [kpis1]);

  const pieColors = [
    themeSettings.palette.primary[800],
    themeSettings.palette.primary[500],
  ];

  const [data, setData] = useState<
    { name: string; revenue: number; expenses: number; profit: number }[]
  >([]);
  const [data1, setData1] = useState<
    { name: string; revenue: number; expenses: number; profit: number }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getProducts();
      const response1 = await getTransaction();

      const Data = response.map((product: any) => ({
        id: product.id,
        Price: parseFloat(product.Price.replace("$", "")),
        Expense: parseFloat(product.Expense.replace("$", "")),
      }));

      const Data1 = response1.map((transaction: any) => ({
        id: transaction.id,
        Amount: parseFloat(transaction.Amount.replace("$", "")),
        Buyer: transaction.Buyer,
        Count: transaction.Products.length,
      }));
      setData(Data);
      setData1(Data1);
      setloading2(false);
    };

    fetchData();
  }, []);
  //for expenses_by_category

  // Use the pieChartData state where necessary

  return (
    <>
      <DashboardCard gridArea="g">
        {loading2 ? (
          <div className="flex justify-center items-center h-full">
            <button
              type="button"
              className="pointer-events-none inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              disabled
            >
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
              <span>Loading...</span>
            </button>
          </div>
        ) : (
          <>
            <BoxHeader
              title="List of Products"
              subtitle=""
              extra={`${data?.length} products`}
            />
            <Box
              mt="0.5rem"
              p="0 0.5rem"
              height="75%"
              sx={{
                "& .MuiDataGrid-root": {
                  color: themeSettings.palette.grey[300],
                  border: "none",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: `1px solid ${themeSettings.palette.grey[300]} !important`,
                },
                "& .MuiDataGrid-columnHeaders": {
                  borderBottom: `1px solid ${themeSettings.palette.grey[300]} !important`,
                },
                "& .MuiDataGrid-columnSeparator": {
                  visibility: "hidden",
                },
              }}
            >
              <DataGrid
                columnHeaderHeight={25}
                rowHeight={35}
                hideFooter={true}
                rows={data || []}
                columns={productColumns}
              />
            </Box>
          </>
        )}
      </DashboardCard>
      <DashboardCard gridArea="h">
        <BoxHeader
          title="Recent Orders"
          subtitle=""
          extra={`${data?.length} Transactions`}
        />
        <Box
          mt="0.5rem"
          p="0 0.5rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: themeSettings.palette.grey[300],
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${themeSettings.palette.grey[300]} !important`,
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${themeSettings.palette.grey[300]} !important`,
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden",
            },
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={data1 || []}
            columns={TranactionColumns}
          />
        </Box>
      </DashboardCard>
      <DashboardCard gridArea="i">
        {loading1 ? (
          <div className="flex justify-center items-center h-full">
            <button
              type="button"
              className="pointer-events-none inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 disabled:opacity-70 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
              disabled
            >
              <div
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              ></div>
              <span>Loading...</span>
            </button>
          </div>
        ) : (
          <>
            <BoxHeader title="Expense Breakdown By Category" extra="+4%" />
            <FlexBetween mt="0.5rem" gap="0.5rem" p="0 1rem" textAlign="center">
              {pieChartData?.map((data, i) => (
                <Box key={`${data[0].name}-${i}`}>
                  <PieChart width={110} height={75}>
                    <Pie
                      stroke="none"
                      data={data}
                      innerRadius={18}
                      outerRadius={35}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={pieColors[index]} />
                      ))}
                    </Pie>
                  </PieChart>
                  <Typography variant="h5">{data[0].name}</Typography>
                </Box>
              ))}
            </FlexBetween>
          </>
        )}
      </DashboardCard>
      <DashboardCard gridArea="j">
        <BoxHeader title="Overall Summary and Explanation Data" extra="+15%" />
        <Box
          height="15px"
          margin="1.25rem 1rem 0.4rem 1rem"
          bgcolor={themeSettings.palette.primary[800]}
          borderRadius="1rem"
        >
          <Box
            height="15px"
            bgcolor={themeSettings.palette.primary[600]}
            borderRadius="1rem"
            width="40%"
          ></Box>
        </Box>
        <Typography margin="0 1rem" variant="h6">
          Orci aliquam enim vel diam. Venenatis euismod id donec mus lorem etiam
          ullamcorper odio sed. Ipsum non sed gravida etiam urna egestas
          molestie volutpat et. Malesuada quis pretium aliquet lacinia ornare
          sed. In volutpat nullam at est id cum pulvinar nunc.
        </Typography>
      </DashboardCard>
    </>
  );
};
