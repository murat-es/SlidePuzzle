/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Dimensions
} from 'react-native';
import Level from './components/Level';
const screenWidth = Dimensions.get('window').width;




const App = () => {


  const [cells, setCells] = useState([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, null],
    [13, 14, 15, 12],
  ])

  const [move, setMove] = useState(0)
  const [over, setOver] = useState(false)

  useEffect(() => {
    checkOver() ? setOver(true) : setOver(false)

  }, [cells])

  const slide = (i, j) => {


    if (j + 1 < 4 && cells[i][j + 1] === null) {
      let copy = [...cells]
      let temp = copy[i][j]
      copy[i][j] = null
      copy[i][j + 1] = temp

      setCells(copy)
      setMove(move + 1)

    }
    if (i + 1 < 4 && cells[i + 1][j] === null) {

      let copy = [...cells]
      let temp = copy[i][j]
      copy[i][j] = null
      copy[i + 1][j] = temp

      setCells(copy)
      setMove(move + 1)

    }
    if (i - 1 > -1 && cells[i - 1][j] === null) {
      let copy = [...cells]
      let temp = copy[i][j]
      copy[i][j] = null
      copy[i - 1][j] = temp

      setCells(copy)
      setMove(move + 1)

    }
    if (j - 1 > -1 && cells[i][j - 1] === null) {
      let copy = [...cells]
      let temp = copy[i][j]
      copy[i][j] = null
      copy[i][j - 1] = temp

      setCells(copy)
      setMove(move + 1)

    }

  }
  const random = () => {
    for (let shuffle = 0; shuffle < 100; shuffle++) {

      let i1 = Math.floor(Math.random() * 4)
      let j1 = Math.floor(Math.random() * 4)

      let i2 = Math.floor(Math.random() * 4)
      let j2 = Math.floor(Math.random() * 4)

      let copy = [...cells]
      const temp = copy[i1][j1]
      copy[i1][j1] = copy[i2][j2]
      copy[i2][j2] = temp
      setCells(copy)

    }
    setMove(0)
  }
  const checkOver = () => {
    for (let i = 0; i < cells.length; i++) {
      for (let j = 0; j < cells.length; j++) {
        let no = (4 * i) + (j + 1)
        if (i === 3 && j === 3 && cells[i][j] === null) {
          return true
        }
        if (cells[i][j] !== no) {
          return false
        }

      }
    }
    return true
  }

  const checkDisabled = (i, j) => {
    if (cells[i][j] === null) {
      return true
    }
    if (j + 1 < 4 && cells[i][j + 1] === null) { return false }
    if (i + 1 < 4 && cells[i + 1][j] === null) { return false }
    if (i - 1 > -1 && cells[i - 1][j] === null) { return false }
    if (j - 1 > -1 && cells[i][j - 1] === null) { return false }

    return true
  }

  return (
    <SafeAreaView >
      <StatusBar />
      <Level />
      <View style={styles.container}>
        {cells.map((i, indexI) =>
          i.map((j, indexJ) => {


            return (
              <TouchableOpacity disabled={checkDisabled(indexI, indexJ)} key={indexJ} style={styles.numberGrid} onPress={() => slide(indexI, indexJ)}>

                <Text style={styles.textGrid}>{j}</Text>
              </TouchableOpacity>
            )
          })
        )}
      </View>
      <Text style={styles.move}>Move: {move}</Text>
      {over && <Text style={styles.move}>Tebrikler</Text>}

      <Button
        onPress={random}
        title="Randomize"
        color="#54BAB9"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#18978F",
    padding: screenWidth * 0.01
  },
  numberGrid: {
    backgroundColor: "#E9DAC1",
    borderWidth: 0,
    width: (screenWidth - screenWidth * 0.01 * 10) / 4,
    margin: screenWidth * 0.01,
    height: (screenWidth - screenWidth * 0.01 * 10) / 4,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5
  },
  textGrid: {
    color: "#54BAB9",
    fontSize: 18,
    fontWeight: "bold",
  },
  move: {
    textAlign: "center",
    fontSize: 20,
    color: "black",
    margin: 1
  }
});

export default App;
