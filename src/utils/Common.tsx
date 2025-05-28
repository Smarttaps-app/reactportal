import { message } from "antd";
export class Common {
  static formatPhoneNumber(phoneNumber: string) {
    let pNumber;

    if (phoneNumber.startsWith("+234") && phoneNumber.length == 14)
      pNumber = `0${phoneNumber.substring(4, phoneNumber.length)}`;
    else if (phoneNumber.startsWith("234") && phoneNumber.length == 13)
      pNumber = `0${phoneNumber.substring(3, phoneNumber.length)}`;
    else if (!phoneNumber.startsWith("0") && phoneNumber.length == 10)
      pNumber = `0${phoneNumber}`;
    else pNumber = phoneNumber;
    return pNumber;
  }
  static formatPhoneNumberShort(phoneNumber: string) {
    let pNumber;

    if (phoneNumber.startsWith("+234") && phoneNumber.length == 14)
      pNumber = `${phoneNumber.substring(4, phoneNumber.length)}`;
    else if (phoneNumber.startsWith("234") && phoneNumber.length == 13)
      pNumber = `${phoneNumber.substring(3, phoneNumber.length)}`;
    else if (!phoneNumber.startsWith("0") && phoneNumber.length == 11)
      pNumber = `${phoneNumber.substring(1, phoneNumber.length)}`;
    else pNumber = phoneNumber;
    return pNumber;
  }
  static sanitizePhoneNumber(phoneNumber: string) {
    if (phoneNumber.startsWith("+"))
      return phoneNumber.substring(1, phoneNumber.length);
    return phoneNumber;
  }

  static formatAsCurrency = (kobo: number) => {
    if (isNaN(kobo)) {
      return "₦0.00";
    }
    const naira = kobo / 100;
    return Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(naira);
  };
  static getFormattedDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  static nairaToKobo = (amount: string) => {
    if (amount == null) return "100";
    return amount + "00";
  };

  static convertStringToNumber = (string: string) => {
    return parseInt(string);
  };
  static validateDate = (value: string) => {
    const selected = new Date(value).getFullYear();
    console.log(selected);
    const now = new Date().getFullYear();
    return now - selected > 15 || "You must be at least 15 years old";
  };
  static getWinnerColor = (position: number) => {
    if (position == 1) return "#D6AF36";
    if (position == 2) return "#D7D7D7";
    if (position == 3) return "#824A02";
    if (position == 4) return "#4B5966";
    return "#4B5966";
  };
  static getPackage = (frequency: string) => {
    if (frequency == "1") return "Daily";
    if (frequency == "7") return "Weekly";
    if (frequency == "30") return "Monthly";
    return "Daily";
  };
  static formatDate = (date?: string) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    if (date === null || date === undefined || date === "")
      return new Intl.DateTimeFormat("en", options).format(Date.now());
    return new Intl.DateTimeFormat("en", options).format(Date.parse(date));
  };
  static getTime = (string: string) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Intl.DateTimeFormat("en", options).format(Date.parse(string));
  };
  static trophyIcon(position: number) {
    if (position === 1) return "first";
    if (position === 2) return "second";
    if (position === 3) return "third";
    if (position === 4) return "fourth";
    if (position === 5) return "fifth";
    return "fifth";
  }

  static formatError(error) {
    console.log(error);
    if (error.response) {
      if (error.response.data) {
        if (error?.response.data.statusDescription) {
          console.log(error?.response.data.statusDescription);
          return error?.response.data.statusDescription;
        }
        return error?.response.data.detail;
      }
      return error?.response;
    }
    return error.message;
  }
  static getToken() {
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser?.token;
    }
    return "";
  }
  static getRegistrationToken() {
    const user = localStorage.getItem("register");
    if (user) {
      const parsedUser = JSON.parse(user);
      return parsedUser?.token;
    }
    return "";
  }
  static handleCopyClick = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      message.success(`${text} copied to clipboard!`);
    } catch (err) {
      message.error(`Failed to copy text: ${err}`);
    }
  };

  static sumTotalByKey<T extends Record<string, any>>(
    array: T[],
    key: keyof T
  ): number {
    console.log(array);
    if (array.length < 1) return 0;
    return array.reduce((sum, item) => {
      const value = item?.[key];
      const num = typeof value === "number" ? value : Number(value);
      console.log(num);
      return sum + (isNaN(num) ? 0 : num);
    }, 0);
  }
  static counter(arr: any[], status: string) {
    return arr.reduce((acc, item) => {
      if (item?.status === status) {
        acc += 1;
      }
      return acc;
    }, 0);
  }
  static countByStatus<T extends { payment_type?: string }>(
    arr: T[],
    status: string
  ): number {
    return arr.reduce(
      (acc, item) =>
        acc +
        (item?.payment_type?.toLowerCase() === status.toLowerCase() ? 1 : 0),
      0
    );
  }
  static activeCount(arr: any[], status: boolean) {
    return arr.reduce((acc, item) => {
      if (item?.status === status) {
        acc += 1;
      }
      return acc;
    }, 0);
  }
  static countByKey<T extends Record<string, any>>(
    array: T[],
    key: keyof T,
    val: string | number
  ): number {
    console.log(array);
    if (array.length < 1) return 0;
    return array.reduce((acc, item) => {
      const value = item?.[key];
      if (value === val) {
        acc += 1;
      } else if (val === "all") {
        acc += 1;
      }
      return acc;
    }, 0);
  }
}
