/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useRef } from 'react';
import RenderHtml from 'react-native-render-html';
import type { Node } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TextInput,
  Text,
  useWindowDimensions
} from 'react-native';

import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';

const UselessTextInput = () => {
  const [text, onChangeText] = React.useState("");

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
        onEndEditing={function () {
          window.Evennia.msg('text', [text])
          onChangeText('')
        }}
      />
    </SafeAreaView>
  );
};

const App: () => Node = () => {
  const { width } = useWindowDimensions();
  const mainScrollView = useRef()

  const [serverMessages, setServerMessages] = React.useState([]);
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  // Handle incoming messages from server and append to serverMessages array
  useEffect((e) => {
    const serverMessagesList = [];
    Evennia.emitter.on('text', (msg) => {
      serverMessagesList.push(msg[0]);
      setServerMessages([...serverMessagesList])
      // console.log(mainScrollView)
      // console.log('*****', mainScrollView?.current?.scrollToEnd({ animated: true }))
      // mainScrollView?.current?.scrollToEnd({ animated: true });
    })
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        ref={mainScrollView}
        onContentSizeChange={() => mainScrollView.current.scrollToEnd()}
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}

      >

        <View style={{ flex: 1, flexDirection: 'column', width: '100%' }}>
          <RenderHtml contentWidth={width} source={{html: serverMessages.join('<br/><br/>')}} style={{ width: '100%', height: 600, backgroundColor: 'blue', marginTop: 20 }} />
        </View>
      </ScrollView>
      <UselessTextInput />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0
  },
});

export default App;
