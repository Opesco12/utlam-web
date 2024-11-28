import { useEffect, useState } from "react";
import ContentBox from "../components/ContentBox";
import HeaderText from "../components/HeaderText";
import MonthYearSelector from "../components/MonthYearSelector";
import StyledText from "../components/StyledText";
import Pagination from "../components/Pagination";
import LargeLoadingSpinner from "../components/LargeLoadingSpinner";
import { Colors } from "../constants/Colors";

import { amountFormatter } from "../helperFunctions/amountFormatter";
import { getTransactions } from "../api";
import { useNavigate } from "react-router-dom";

const Transactions = () => {
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [startdate, setStartdate] = useState(null);
  const [enddate, setEnddate] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const currentDate = new Date();
    handleMonthYearChange(
      currentDate.getMonth() + 1,
      currentDate.getFullYear()
    );
  }, []);

  const fetchTransactionsForDateRange = async (start, end) => {
    setLoading(true);
    try {
      const allTransactions = await getTransactions(start, end);
      setTotalPages(Math.ceil(allTransactions.length / itemsPerPage));

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedTransactions = allTransactions?.slice(
        startIndex,
        endIndex
      );

      setTransactions(paginatedTransactions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchTransactionsForDateRange(startdate, enddate);
  };

  const handleMonthYearChange = (month, year) => {
    const start = new Date(year, month - 1, 1);

    const end = new Date(year, month, 0);

    const formattedStart = start.toISOString().split("T")[0];
    const formattedEnd = end.toISOString().split("T")[0];

    setStartdate(formattedStart);
    setEnddate(formattedEnd);
    setCurrentPage(1);
    fetchTransactionsForDateRange(formattedStart, formattedEnd);
  };

  if (loading) {
    return (
      <div className="h-[100vh] flex items-center justify-center">
        <LargeLoadingSpinner color={Colors.lightPrimary} />
      </div>
    );
  }

  return (
    <div>
      <HeaderText>Transactions</HeaderText>

      <ContentBox>
        <MonthYearSelector onChange={handleMonthYearChange} />
        <div className="">
          {transactions?.map((transaction, index) => (
            <TransactionItem
              transaction={transaction}
              key={index}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </ContentBox>
    </div>
  );
};

const TransactionItem = ({ transaction }) => {
  const date = new Date(transaction?.valueDate).toDateString();
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/transaction/details", { state: transaction })}
      className="flex justify-between py-[15px] border-b"
    >
      <div className="flex flex-col w-[60%]">
        <StyledText
          variant="semibold"
          color={Colors.primary}
          className="block"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            display: "inline-block",
          }}
        >
          {`${transaction?.description} - ${transaction?.portfolio}`}
        </StyledText>
        <StyledText
          type="label"
          color={Colors.light}
        >
          {date && date}
        </StyledText>
      </div>
      <div className="flex flex-col items-end">
        <StyledText
          variant="semibold"
          color={Colors.primary}
        >
          {amountFormatter.format(transaction?.amount)}
        </StyledText>
      </div>
    </div>
  );
};

export default Transactions;
