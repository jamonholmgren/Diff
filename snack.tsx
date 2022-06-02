import React, { useEffect } from "react";
import { Alert, Pressable, Text, SafeAreaView, View } from "react-native";
import { types } from "mobx-state-tree";
import { withAsyncStorage } from "mst-async-storage";

export const NiceThingsModel = types
  .model("NiceThings")
  .props({
    unicorns: true,
    dragons: true,
    cake: true,
    spiders: false,
    nickleback: false,
  })
  .actions((self) => ({
    setSpiders(value: boolean) {
      self.spiders = value;
    },
  }))
  .extend(withAsyncStorage({ key: "nice.things" }));

const App = () => {
  // create your model as usual
  const happy = NiceThingsModel.create();

  useEffect(() => {
    (async () => {
      try {
        // now load the data from async storage
        await happy.load();
      } catch (error) {
        console.log("error: ", error);
      }
    })();
  }, [happy]);

  function toggleSpiders() {
    console.log("hi");
    // and when you change something
    happy.setSpiders(true);
    // it will automatically save back to async storage!
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
      }}
    >
      <View>
        <Text>{`Unicorns: ${happy.unicorns}`}</Text>
        <Text>{`Dragons: ${happy.dragons}`}</Text>
        <Text>{`Cake: ${happy.cake}`}</Text>
        <Text
          style={{ fontWeight: "bold" }}
        >{`Spiders: ${happy.spiders}`}</Text>
        <Text>{`Nickleback: ${happy.nickleback}`}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          { backgroundColor: pressed ? "black" : "blue" },
          { padding: 10 },
        ]}
        onPress={() => toggleSpiders()}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Set Spiders to True
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default App;
