<template>
  <SlideContainer :slides="displayedWindow" />
</template>

<script>
import SlideContainer from "../slides/slideContainer";
import dayjs from "dayjs";
export default {
  name: "Beers",
  components: { SlideContainer },
  data() {
    return {
      storeData: {
        id: "abcdef-abcdef-abcdef-abcdef",
        users: {
          "arnaud.braconnier@gmail.com": {
            owner: false,
            id: "ccccc-ccccc-ccccc-ccccc"
          },
          "mathieu.mure@gmail.com": {
            owner: true,
            id: "bbbbb-bbbbb-bbbb-bbbb"
          }
        },
        payment: {
          "2019-01": {
            acceptedBy: [
              "mathieu.mure@gmail.com",
              "arnaud.braconnier@gmail.com"
            ]
          },
          "2019-02": {
            acceptedBy: ["mathieu.mure@gmail.com"]
          },
          "2019-03": {
            acceptedBy: ["arnaud.braconnier@gmail.com"]
          }
        }
      },
      currentMonth: dayjs().startOf("month")
    };
  },
  computed: {
    users() {
      return this.storeData.users;
    },
    nbUsers() {
      return Object.keys(this.users).length;
    },
    start() {
      return this.currentMonth.subtract(12, "month");
    },
    end() {
      return this.currentMonth.add(12, "month");
    },
    areaLength() {
      return this.end.diff(this.start, "month");
    },
    displayedWindow() {
      return Array.from(Array(this.areaLength)).map((_, i) => {
        const month = this.start.add(i, "month").format("YYYY-MM");
        const paymentInfo = this.computePaymentInfo(month);
        return {
          id: month,
          month,
          paymentInfo
        };
      });
    }
  },
  methods: {
    computePaymentInfo(month) {
      const paymentDataForMonth = this.storeData.payment[month] || {
        acceptedBy: []
      };
      return Object.entries(this.users).map(([userId]) => ({
        id: userId,
        accepted: paymentDataForMonth.acceptedBy.includes(userId)
      }));
    }
  }
};
</script>

<style scoped></style>
