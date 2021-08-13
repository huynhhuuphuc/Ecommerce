import { firestore } from "../../firebase/utils";

export const handleAddProduct = (product) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products") // want search
      .doc() // create document
      .set(product)
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleFetchProducts = ({
  filterType,
  startAfterDoc,
  persistProducts = [],
}) => {
  return new Promise((resolve, reject) => {
    const pageSize = 6; //kich thuoc trang la 6 items

    let ref = firestore
      .collection("products")
      .orderBy("createdDate")
      .limit(pageSize);

    if (filterType) ref = ref.where("productCategory", "==", filterType);
    if (startAfterDoc) ref = ref.startAfter(startAfterDoc); // item thu 6 la diem bat dau cua app cho 6 item tiep theo

    ref
      .get()
      .then((snapshot) => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              documentID: doc.id,
            };
          }),
        ];
        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount < 1,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const handleDeleteProduct = (documentID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection("products")
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
};
