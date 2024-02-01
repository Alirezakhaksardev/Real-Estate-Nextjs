import Sidebar from "@/modules/Sidebar";
import Card from "@/modules/Card";
import styles from "@/templates/BuyResidentialsPage.module.css";

function BuyResidentialsPage({ data }) {

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>
        {data.length ? null : (
          <p className={styles.text}>هیچ آگهی ثبت نشده است</p>
        )}
        {data.map((profile) => (
          <Card key={profile._id} data={profile} />
        ))}
      </div>
    </div>
  );
}

export default BuyResidentialsPage;
