import React, { useEffect, useState } from "react";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";
import { collection, getDocs } from "firebase/firestore";
import { Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import MaterialsCard from "../ui/cards/MaterialsCard";
import { db, storage } from "../utils/firebase";
import { SHeader } from "../ui/style/uiStyles";
import { SessionCardContainer } from "../containers/style";
import { useAuth } from "../../hook/useAuth";
import { heading } from "../utils/consts";

function Materials() {
  const [subjects, setSubjects] = useState([]);

  const { user } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const handleAddDoc = (path) => {
    navigate(`${location.pathname}/add`, {
      state: {
        from: location,
        docPackage: `groups/${user.group}/${path}`,
      },
    });
  };

  const getFirebaseData = async () => {
    const subjectsCollectionRef = collection(
      db,
      "groups/" + user.group + "/subjects"
    );
    const data = await getDocs(subjectsCollectionRef);

    setSubjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  const setUpDocs = (subject) => {
    const data = [];
    const docListRef = ref(
      storage,
      "groups/" + user.group + "/" + subject.packageDocs
    );
    listAll(docListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          getMetadata(item).then((metadata) => {
            data.push({
              name: metadata.name,
              url: url,
            });
          });
        });
      });
    });
    return data;
  };

  useEffect(() => {
    getFirebaseData();

    console.log("mounted");
  }, []);

  return (
    <>
      <div style={{ display: `block`, width: `100%` }}>
        <SHeader>
          <Typography variant="h3">Материалы курса</Typography>
          <Typography variant="h5">
            {heading()}, {user.name}! Ознакомьтесь с материалами по предметам
            ниже.
          </Typography>
        </SHeader>
        <SessionCardContainer style={{ marginTop: `15px` }}>
          {subjects.map((subject) => (
            <div key={subject.id} style={{ height: `auto` }}>
              <MaterialsCard subject={subject} items={setUpDocs(subject)} />
              <Button
                variant="outlined"
                onClick={() => {
                  handleAddDoc(subject.packageDocs);
                }}
                sx={{
                  marginLeft: `5px`,
                  marginTop: `5px`,
                }}
              >
                Добавить документ
              </Button>
            </div>
          ))}
        </SessionCardContainer>
      </div>
    </>
  );
}

export default Materials;
