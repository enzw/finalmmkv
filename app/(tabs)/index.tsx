import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { auth, db } from "@/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { getObject, remove } from "@/storage/asyncStorage";

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // ambil uid dari asyncStorage
        const savedUser = await getObject("user");

        if (!savedUser) {
          router.replace("/(auth)/login");
          return;
        }

        const uid = savedUser.uid;
        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          console.log("No such document!");
          router.replace("/(auth)/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        router.replace("/(auth)/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const doLogout = async () => {
    await auth.signOut();
    await remove("user");
    router.replace("/(auth)/login");
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color="#000"
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      />
    );

  return (
    <View style={{ flex: 1, padding: 24, marginTop: 60 }}>
      <Text style={{ fontSize: 28, marginBottom: 10 }}>Welcome Back 👋</Text>
      <Text style={{ fontSize: 18 }}>UID: {user?.uid}</Text>
      <Text style={{ fontSize: 18 }}>Email: {user?.email}</Text>
      <Text style={{ fontSize: 18 }}>Name: {user?.name}</Text>

      <TouchableOpacity
        onPress={doLogout}
        style={{
          marginTop: 30,
          backgroundColor: "red",
          padding: 12,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
  