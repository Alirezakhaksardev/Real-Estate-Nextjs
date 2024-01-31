import styles from "@/modules/RadioList.module.css";

function RadioList({ profileData, setProfileData }) {
  const { category } = profileData;
  const changehandler = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };
  return (
    <div className={styles.container}>
      <p>دسته بندی</p>
      <div className={styles.main}>
        <div>
          <lable htmlFor="villa">ویلا</lable>
          <input
            type="radio"
            name="category"
            value="villa"
            id="villa"
            checked={category === "villa"}
            onChange={changehandler}
          />
        </div>
        <div>
          <lable htmlFor="apartement">آپارتمان</lable>
          <input
            type="radio"
            name="category"
            value="apartement"
            id="apartement"
            checked={category === "apartement"}
            onChange={changehandler}
          />
        </div>
        <div>
          <lable htmlFor="store">مغازه</lable>
          <input
            type="radio"
            name="category"
            value="store"
            id="store"
            checked={category === "store"}
            onChange={changehandler}
          />
        </div>
        <div>
          <lable htmlFor="office">دفتر</lable>
          <input
            type="radio"
            name="category"
            value="office"
            id="office"
            checked={category === "office"}
            onChange={changehandler}
          />
        </div>
      </div>
    </div>
  );
}

export default RadioList;
