import Profile from "@/models/Profile";
import DetailsPage from "@/templates/DetailsPage";
import connectDB from "@/utils/connectDB";

async function page({ params: { profileId } }) {
  await connectDB();

  const profile = await Profile.findOne({ _id: profileId });
  if (!profile) return <h3>مشکلی پیش آمده است</h3>;

  return <DetailsPage data={profile} />;
}

export default page;

export const generateMetadata = async ({ params: { profileId } }) => {
  await connectDB();
  const profile = await Profile.findOne({ _id: profileId });

  return {
    title: profile.title,
    description: profile.description,
    authors: { name: profile.realState },
    other: { category: profile.category },
  };
};
