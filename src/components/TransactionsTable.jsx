import React, { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { format } from "date-fns";
import { defaultCategories, categoryColors } from "../data/categories";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "../components/ui/tooltip";
import { Checkbox } from "../components/ui/checkbox";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  Clock,
  MoreHorizontal,
  RefreshCw,
  Search,
  Trash,
  X,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import toast from "react-hot-toast";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};
const TransactionsTable = ({ transactions, isAdmin, setTransactions }) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "date",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [recurringFilter, setRecurringFilter] = useState("ALL");

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((transaction) =>
        transaction.description?.toLowerCase().includes(searchLower),
      );
    }

    // Apply type filter
    if (typeFilter && typeFilter !== "ALL") {
      result = result.filter((t) => t.type === typeFilter);
    }

    if (recurringFilter && recurringFilter !== "ALL") {
      result = result.filter((t) =>
        recurringFilter === "recurring" ? t.recurring : !t.recurring,
      );
    }
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  const handleSort = (field) => {
    setSortConfig((current) => ({
      field,
      direction:
        current.field === field && current.direction === "asc" ? "desc" : "asc",
    }));
  };
  const handleSelectAll = () => {
    setSelectedIds((current) =>
      current.length === filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((t) => t.id),
    );
  };

  const handleSelect = (id) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item != id)
        : [...current, id],
    );
  };

  
  const handleDelete = (id) => {
  const toastId = toast.loading("Deleting...");

  setTimeout(() => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));

    toast.success("Transaction deleted!", { id: toastId });
  }, 500);
};

  const handleBulkDelete = () => {
  if (!window.confirm("Are you sure you want to delete selected transactions?")) return;

  const toastId = toast.loading("Deleting...");

  setTimeout(() => {
    setTransactions((prev) =>
      prev.filter((t) => !selectedIds.includes(t.id))
    );

    toast.success("Deleted successfully!", { id: toastId });
    setSelectedIds([]);
  }, 500);
};

  const handleClearFilters = () => {
    setSearchTerm("");
    setTypeFilter("ALL");
    setRecurringFilter("ALL");
    setSelectedIds([]);
  };

  return (
    <div>
      {/*Filters*/}
      <div className="flex flex-col md:flex-row gap-3 md:gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            className="pl-8 bg-orange-50 dark:bg-slate-600 w-full"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-32 bg-orange-50 dark:bg-slate-700 border border-slate-800 dark:border-slate-900 shadow-lg rounded-md text-slate-900 dark:text-slate-200 focus:bg-orange-200 dark:focus:bg-slate-700">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>

            <SelectContent className="bg-orange-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-lg rounded-md">
              <SelectGroup>
                <SelectItem
                  value="ALL"
                  className="cursor-pointer text-slate-900 dark:text-slate-200 focus:bg-orange-200 dark:focus:bg-slate-700"
                >
                  All Types
                </SelectItem>

                <SelectItem
                  value="INCOME"
                  className="cursor-pointer text-slate-900 dark:text-slate-200 focus:bg-orange-200 dark:focus:bg-slate-700"
                >
                  Income
                </SelectItem>

                <SelectItem
                  value="EXPENSE"
                  className="cursor-pointer text-slate-900 dark:text-slate-200 focus:bg-orange-200 dark:focus:bg-slate-700"
                >
                  Expense
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(value) => {
              setRecurringFilter(value);
            }}
          >
            <SelectTrigger className="w-[200px] bg-orange-50 dark:bg-slate-700 border border-slate-800 dark:border-slate-900 shadow-lg rounded-md text-slate-900 dark:text-slate-200">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>

            <SelectContent className="bg-orange-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 shadow-lg rounded-md">
              <SelectGroup>
                <SelectItem
                  value="ALL"
                  className="cursor-pointer text-slate-900 dark:text-slate-200 focus:bg-orange-200 dark:focus:bg-slate-700"
                >
                  All Transactions
                </SelectItem>

                <SelectItem
                  value="recurring"
                  className="cursor-pointer text-slate-900 dark:text-slate-200 focus:bg-orange-200 dark:focus:bg-slate-700"
                >
                  Recurring Only
                </SelectItem>

                <SelectItem
                  value="non-recurring"
                  className="cursor-pointer text-slate-900 dark:text-slate-200 focus:bg-orange-200 dark:focus:bg-slate-700"
                >
                  Non-Recurring Only
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={handleBulkDelete}
              >
                <Trash className="h-4 w-4 mr-2" />
                Delete Selected ({selectedIds.length})
              </Button>
            </div>
          )}
          {(searchTerm ||
            typeFilter !== "ALL" ||
            recurringFilter !== "ALL") && (
            <Button
              variant="outline"
              size="icon"
              onClick={handleClearFilters}
              title="Clear filters"
              className="bg-orange-50 dark:bg-slate-400"
            >
              <X className="h-8 w-7  " />
            </Button>
          )}
        </div>
      </div>

      {/*Transactions*/}
      <div className="w-full overflow-x-auto rounded bg-orange-50/80 dark:bg-slate-800/80">
        <div className="max-h-[500px] overflow-y-auto scrollbar-none">
          <Table className="min-w-[700px] md:min-w-[900px] table-fixed text-sm md:text-base">
            <TableHeader className="sticky top-0 z-10 bg-orange-50 dark:bg-slate-800">
              <TableRow className="  border-slate-800 dark:border-slate-600">
                {isAdmin && (
                  <TableHead className="px-2 md:px-3 py-2 md:py-3 w-[40px] align-middle">
                    <Checkbox
                      className="w-4 h-4 cursor-pointer rounded text-black dark:text-white bg-white dark:bg-slate-800 border border-gray-800 dark:border-gray-500"
                      onCheckedChange={handleSelectAll}
                      checked={
                        selectedIds.length ===
                          filteredAndSortedTransactions.length &&
                        filteredAndSortedTransactions.length > 0
                      }
                    />
                  </TableHead>
                )}
                <TableHead
                  className=" w-[90px] cursor-pointer px-2 md:px-3 py-3 text-left "
                  onClick={() => handleSort("date")}
                >
                  <div className=" w-[120px] font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    Date{" "}
                    {sortConfig.field === "date" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>

                <TableHead className="w-[100px] md:w-[160px] px-2 md:px-3 py-3 align-middle font-bold text-slate-800 dark:text-slate-100 ">
                  Description
                </TableHead>

                <TableHead
                  className="px-2 md:px-3 py-3 align-middle w-[100px] "
                  onClick={() => handleSort("category")}
                >
                  <div className=" font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    Category
                    {sortConfig.field === "category" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="ml-1 h-4 w-4" />
                      ) : (
                        <ChevronDown className="ml-1 h-4 w-4" />
                      ))}
                  </div>
                </TableHead>

                <TableHead
                  className="px-2 md:px-3 py-3 w-[80px] text-right cursor-pointer"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center justify-end gap-1 font-bold text-slate-800 dark:text-slate-100">
                    <span>Amount</span>
                    {sortConfig.field === "amount" &&
                      (sortConfig.direction === "asc" ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      ))}
                  </div>
                </TableHead>

                <TableHead className=" px-2 md:px-3 py-3 w-[100px] align-middle  font-bold text-slate-800 dark:text-slate-100 ">
                  Recurring
                </TableHead>

                {isAdmin && <TableHead className="w-[40px]"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedTransactions.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={isAdmin ? 7 : 5}
                    className="text-center text-muted-foreground "
                  >
                    No Transactions Found
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedTransactions.map((transaction) => (
                  <TableRow
                    className="hover:bg-orange-200/40 dark:hover:bg-slate-700/60 transition-colors border-slate-800 dark:border-slate-600"
                    key={transaction.id}
                  >
                    {isAdmin && (
                      <TableCell className="w-[40px] px-2 md:px-3 py-2 md:py-3">
                        <Checkbox
                          className="w-4 h-4 cursor-pointer rounded text-black dark:text-white bg-white dark:bg-slate-800 border border-gray-800 dark:border-gray-500"
                          onCheckedChange={() => handleSelect(transaction.id)}
                          checked={selectedIds.includes(transaction.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell className=" w-[90px] text-slate-900 dark:text-slate-300">
                      {format(new Date(transaction.date), "PP")}
                    </TableCell>
                    <TableCell className=" text-slate-900 dark:text-slate-200 w-[100px] md:w-[160px]  truncate">
                      {transaction.description}
                    </TableCell>
                    <TableCell className=" w-[110px] capitalize">
                      <span
                        className={`inline-flex justify-center  items-center w-full  px-2 py-1 rounded  text-slate-900  text-sm ${
                          transaction.type === "EXPENSE"
                            ? "bg-gradient-to-r from-orange-300 to-orange-600"
                            : "bg-gradient-to-r from-green-300 to-green-600"
                        }`}
                      >
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell
                      className={` w-[80px] font-semibold tracking-tight whitespace-nowrap px-2 md:px-3 py-2 md:py-3 text-right ${
                        transaction.type === "EXPENSE"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(transaction.amount)}
                    </TableCell>
                    <TableCell className="w-[100px]">
                      {transaction.recurring ? (
                        <Tooltip>
                          <TooltipTrigger>
                            <Badge
                              variant="outline"
                              className="rounded gap-1 bg-red-200 text-slate-900 hover:bg-red-400"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              <div className="font-medium">Next Date:</div>
                              <div>
                                {format(
                                  new Date(transaction.nextRecurringDate),
                                  "PP",
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge
                          variant="outline"
                          className=" rounded bg-orange-50 dark:bg-slate-100 gap-1"
                        >
                          <Clock className="h-3 w-3" />
                          One-Time
                        </Badge>
                      )}
                    </TableCell>

                    {isAdmin && (
                      <TableCell className="w-[40px]">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="data-[state=open]:bg-slate-200 dark:data-[state=open]:bg-slate-700"
                            >
                              <MoreHorizontal className="h-4 w-4 dark:text-slate-200" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent
                            align="end"
                            className="w-32 bg-orange-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-lg rounded-md"
                          >
                            <DropdownMenuItem className="cursor-pointer text-slate-800 dark:text-slate-300">
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => handleDelete(transaction.id)}
                              className="text-red-500 focus:text-red-600 cursor-pointer"
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TransactionsTable;
