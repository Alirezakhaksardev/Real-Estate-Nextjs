import Profile from "@/models/Profile";
import BuyResidentialsPage from "@/templates/BuyResidentialPage";
import connectDB from "@/utils/connectDB";
import React from "react";

async function page({ searchParams }) {
  // const res = await fetch("http://localhost:3000/api/profile", {
  //   cache: "no-store",
  // });
  // const data = await res.json();
  await connectDB();
  const profiles = await Profile.find({ published: true });

  if(!profiles) return <h3>مشکلی پیش آمده است</h3>;

  let finalData = profiles;
  if (searchParams.category) {
    finalData = finalData.filter((i) => i.category === searchParams.category);
  }

  return <BuyResidentialsPage data={finalData} />;
}

export default page;
