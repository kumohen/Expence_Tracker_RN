import * as React from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  FlatList,
  ScrollView,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { TextInput } from "react-native-paper";
// import RNPickerSelect from "react-native-picker-select";

const Item = ({ item, deleteItem }) => (
  <>
    <TouchableOpacity onPress={() => deleteItem(item.id)} key={item.name}>
      <View style={styles.ele}>
        <Text style={styles.ele_text}>
          {item.name} : {item.age}
        </Text>
      </View>
    </TouchableOpacity>
  </>
);

const ExpenceItem = ({ item, deleteItem }) => (
  <>
    <TouchableOpacity onPress={() => deleteItem(item.id)} key={item.name}>
      <View style={styles.ele}>
        <Text style={styles.ele_text}>
          {item.name} : {item.age}
        </Text>
      </View>
    </TouchableOpacity>
  </>
);

function HomeScreen({ navigation }) {
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [choose, setChoose] = React.useState("");
  const [person, setPerson] = React.useState([]);

  const [income, setIcome] = React.useState([]);
  const [expence, setExpence] = React.useState([]);

  const handleInput = () => {
    const id = Math.floor(Math.random() * 1000);
    const newItem = { name, age, id };

    if (choose === "income" || choose === "") {
      const newIncome = [...income, newItem];
      setIcome(newIncome);
      setName("");
      setAge("");
    } else {
      const newExpence = [...expence, newItem];
      setExpence(newExpence);
      setName("");
      setAge("");
    }
  };

  const deleteItem = (id) => {
    const newIcome = income.filter((item) => item.id !== id);
    setIcome(newIcome);
  };

  const deleteExpence = (id) => {
    const newIcome = expence.filter((item) => item.id !== id);
    setExpence(newIcome);
  };
  const totalIncome = income.reduce((acc, curVal) => {
    return acc + curVal.age * 1;
  }, 0);
  const totalExpence = expence.reduce((acc, curVal) => {
    return acc + curVal.age * 1;
  }, 0);

  const SaveMoney = totalIncome - totalExpence;

  const handleInEx = (item) => {
    if (item === "income") {
      setChoose("income");
    } else {
      setChoose("expence");
    }
  };

  const renderItem = ({ item }) => <Item item={item} deleteItem={deleteItem} />;
  const renderExpence = ({ item }) => (
    <ExpenceItem item={item} deleteItem={deleteExpence} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.header_title}>Expence Tracker</Text>
      </View>
      {/* Our logo, instructions, and picker button are hidden here to keep the example brief */}
      <View style={styles.btn_exin}>
        <View style={styles.btn_ex}>
          <Button title="Income" onPress={() => handleInEx("income")} />
        </View>
        <View style={styles.btn_ex}>
          <Button
            title="Expence"
            color="#ff5c5c"
            onPress={() => handleInEx("expence")}
          />
        </View>
      </View>

      <View style={styles.main_com}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          label="Value"
          value={age}
          keyboardType="numeric"
          onChangeText={(text) => setAge(text)}
        />

        <Button title="Add" color="" onPress={handleInput} />
      </View>

      <ScrollView>
        <View style={styles.income_view}>
          <Text style={styles.in_title}>Income List</Text>
          <FlatList
            data={income}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.income_view}>
          <Text style={styles.in_title}>Expence List</Text>
          <FlatList
            data={expence}
            renderItem={renderExpence}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ScrollView>
      <Text style={styles.result}>Save Money: {SaveMoney}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  /* Other styles hidden to keep the example brief... */
  container: {
    flex: 1,
  },
  header: {
    height: 80,
    backgroundColor: "blueviolet",
    marginBottom: 10,
  },
  header_title: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    paddingTop: 30,
  },
  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
  ele: {
    height: 40,
    color: "#fff",
    backgroundColor: "#20C92F",
    marginBottom: 4,
    marginHorizontal: 15,
  },
  ele_text: {
    color: "black",
    fontSize: 20,
    textAlign: "center",
  },
  btn_exin: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  income_view: {
    backgroundColor: "lightcoral",
    margin: 10,
  },
  btn_ex: {
    marginLeft: 10,
    marginBottom: 5,
    width: 80,
  },
  main_com: {
    margin: 5,
  },
  in_title: {
    height: 45,
    backgroundColor: "orchid",
    color: "white",
    fontSize: 20,
    textAlign: "center",
    paddingTop: 6,
    marginBottom: 10,
  },
  result: {
    height: 30,
    backgroundColor: "midnightblue",
    textAlign: "center",
    color: "white",
    marginHorizontal: 15,
    marginTop: 3,
    paddingTop: 3,
  },
});

export default HomeScreen;
