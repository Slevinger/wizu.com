import { useState, useEffect } from "react";
import * as Contacts from "expo-contacts";

export default () => {
  const [contacts, setContacts] = useState([]);
  // const [permmission,setPermission] = useState('');
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      // setPermission(status)
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers]
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
    })();
  }, []);
  return contacts;
};
