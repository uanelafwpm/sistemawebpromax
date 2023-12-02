import { connect } from "mongoose";

export const connectToDB = async () => {
  // await connect("mongodb://localhost:27017/sistema-web-pro-max");
  await connect(
    "mongodb+srv://uanela:como1234@cluster0.56ovy7w.mongodb.net/sistema-web-pro-max"
  );
};
